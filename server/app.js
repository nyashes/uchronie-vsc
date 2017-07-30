"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var cmdLine;
app.get("/", function (req, res) {
    res.send(cmdLine);
    cmdLine = "";
});
app.listen(80, function () {
    console.log("server started");
    var stdin = process.openStdin();
    stdin.addListener("data", function (d) {
        cmdLine += d.toString().trim() + ";";
    });
});
