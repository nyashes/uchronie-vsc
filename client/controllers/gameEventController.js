var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gameEventController = (function (_super) {
    __extends(gameEventController, _super);
    function gameEventController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    gameEventController.prototype.init = function () {
        var _this = this;
        this.element.unbind('click').bind('click', function () {
            if (_this.model.eventClass.current()) {
                _this.model.action();
                _this.model.eventClass.setKeyFrame(objectModel.currentTime, 'discared');
            }
        });
        this.element.text(this.model.text);
        objectModel.guiTick.push(function () {
            _this.element.removeClass();
            _this.element.addClass(_this.model.eventClass.current());
        });
        jQuery("body").find(".timebar").append('<div style="position:absolute; background-color:red; bottom:0px; width:20px; height:50px; left:' +
            this.model.eventClass.stateStack[0].t +
            'px" class="tooltip"><div class="tooltiptext">' + this.model.text + '</div></div>');
    };
    return gameEventController;
}(baseController));
