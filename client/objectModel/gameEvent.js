var objectModel;
(function (objectModel) {
    var gameEvent = (function () {
        function gameEvent(action, text, eventClass, at) {
            if (at == undefined)
                at = objectModel.currentTime;
            this.action = action;
            this.text = text;
            this.eventClass = new objectModel.nonDeterministicState();
            this.eventClass.setKeyFrame(at - 1, "discared");
            this.eventClass.setKeyFrame(at, eventClass);
        }
        return gameEvent;
    }());
    objectModel.gameEvent = gameEvent;
})(objectModel || (objectModel = {}));
