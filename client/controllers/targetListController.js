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
var targetListController = (function (_super) {
    __extends(targetListController, _super);
    function targetListController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    targetListController.prototype.select = function (name) {
        var toSelect = this.element.children("[id='" + name + "']").data("controller");
        toSelect.select();
    };
    return targetListController;
}(baseListController));
var targetController = (function (_super) {
    __extends(targetController, _super);
    function targetController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    targetController.prototype.init = function () {
        var _this = this;
        this.element.attr("id", this.model.name);
        this.element.find(".avatar").css("background-image", "url('" + this.model.avatarUrl + "')");
        this.element.find(".name").text(this.model.name);
        this.element.find(".infos").data("model", this.model.infos);
        this.element.unbind('click').bind('click', function () { return _this.click(_this); });
    };
    targetController.prototype.updateVisual = function () {
        var patient = this.model;
        for (var i = 0; i <= 4; ++i)
            this.element.toggleClass("gravity-" + i, Math.floor(patient.gravity.current()) == i);
    };
    targetController.prototype.click = function (instance) {
        instance.element.siblings(".selected").removeClass("selected");
        if (instance.element.hasClass("selected"))
            instance.element.removeClass("selected");
        else
            instance.element.addClass("selected");
    };
    targetController.prototype.select = function () {
        this.element.siblings(".selected").removeClass("selected");
        this.element.addClass("selected");
    };
    targetController.prototype.hover = function (instance) {
    };
    return targetController;
}(baseController));
