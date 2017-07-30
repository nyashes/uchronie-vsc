import * as express from 'express';

let app = express();

let cmdLine: string;

app.get("/", function(req, res) {
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