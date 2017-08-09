import * as express from 'express';

let app = express();

let cmdLine: string = "";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
    if (cmdLine != "")
        console.log(cmdLine);
    res.send(cmdLine);
    cmdLine = "";
});

app.get("/master", function(req, res) {
    cmdLine += req.query.js + ";";
    let id = setInterval(function() {
        if (cmdLine == "") {
            res.send("done");
            clearInterval(id);
        }
    }, 300);
});



app.listen(80, function() {
    console.log("server started");
    
    let stdin = process.openStdin();
    stdin.addListener("data", function(d) { 
        cmdLine += d.toString().trim() + ";";
  });
});