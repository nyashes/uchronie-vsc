class gameEventController extends baseController<objectModel.gameEvent> {
    public init() {
        this.element.unbind('click').bind('click', () => {
            if (this.model.eventClass.current()) {
                this.model.action();
                this.model.eventClass.setKeyFrame(objectModel.currentTime, 'discared');
            }
        });
        this.element.text(this.model.text);
        objectModel.guiTick.push(() => {
            this.element.removeClass();
            this.element.addClass(this.model.eventClass.current());
        });

        jQuery("body").find(".timebar").append
        (
            '<div style="position:absolute; background-color:red; bottom:0px; width:20px; height:50px; left:' + 
            this.model.eventClass.stateStack[0].t + 
            'px" class="tooltip"><div class="tooltiptext">' + this.model.text + '</div></div>'
        );
    }
}