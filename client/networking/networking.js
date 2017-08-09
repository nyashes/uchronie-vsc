var networking = (function () {
    function networking() {
    }
    networking.startListener = function () {
        var _this = this;
        setInterval(function () {
            jQuery.getScript(_this.hostName);
        }, 1000);
    };
    networking.remote = function (fun, capture) {
        var entire = fun.toString();
        var body = "(function() {";
        body += entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
        body += "}).call(" + JSON.stringify(capture) + ");";
        return this.remoteString(body);
    };
    networking.remoteString = function (body) {
        var _this = this;
        if (this.sendLock) {
            this.enqueue(body);
            return null;
        }
        else {
            this.sendLock = true;
            return jQuery.get(this.hostName + "/master?js=" + encodeURI(body))
                .fail(function (dum, error) {
                console.error("function() {" + body + "}\n" + "failed with: " + error);
                _this.queue = body + ";" + _this.queue;
                _this.sendLock = false;
                _this.processQueue();
            })
                .done(function () {
                _this.sendLock = false;
                _this.processQueue();
            });
        }
    };
    networking.enqueue = function (body) {
        this.queue += body + ";";
    };
    networking.processQueue = function () {
        var tmp = this.queue;
        this.queue = "";
        this.remoteString(tmp + ";");
    };
    networking.hostName = "http://localhost";
    networking.sendLock = false;
    return networking;
}());
