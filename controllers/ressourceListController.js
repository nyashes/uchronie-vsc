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
var ressourceListController = (function (_super) {
    __extends(ressourceListController, _super);
    function ressourceListController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ressourceListController.prototype.add = function (name, quantity) {
        var controller = this.element.children("#" + name).data("controller");
        var toAdd = this.element.children("#" + name).data("model");
        toAdd.quantity.setKeyFrame(objectModel.currentTime, Math.max(toAdd.quantity.current() + quantity, 0));
        controller.init();
    };
    return ressourceListController;
}(baseListController));
var ressourceController = (function (_super) {
    __extends(ressourceController, _super);
    function ressourceController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ressourceController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.element.attr("id", this.model.name);
    };
    return ressourceController;
}(baseController));
