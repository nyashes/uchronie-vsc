class networking {
    public static hostName: string = "http://localhost";
    private static sendLock: boolean = false;
    private static queue: string;

    public static startListener() {
        setInterval(() => {
            jQuery.getScript(this.hostName);
        }, 1000);
    }

    public static remote(fun: () => any, capture?: any) {
        let entire = fun.toString(); 
        let body = "(function() {";
        body += entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
        body += "}).call(" + JSON.stringify(capture) + ");";
        return this.remoteString(body);   
    }

    public static remoteString(body: string) {
        if (this.sendLock) {
            this.enqueue(body);
            return null;
        }
        else {
            this.sendLock = true;

            return jQuery.get(this.hostName + "/master?js=" + encodeURI(body))
            .fail(function(dum, error) {
                console.error("function() {" + body + "}\n" +"failed with: " + error.toString());

                this.queue = body + ";" + this.queue;
                this.sendLock = false;
                this.processQueue();
            })
            .done(function() {
                this.sendLock = false;
                this.processQueue();
            });
        }
    }

    private static enqueue(body: string) {
        this.queue += body + ";";
    }

    private static processQueue() {
        let tmp = this.queue;
        this.queue = "";
        this.remoteString(tmp + ";");
    }
}