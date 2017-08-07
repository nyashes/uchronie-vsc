var mainController = (function () {
    function mainController() {
    }
    //general helpers
    mainController.ressources = function () { return mainController.submodules["ressourceListController"]["sideBarLeft"]; };
    mainController.actors = function () { return mainController.submodules["targetListController"]["targetList"]; };
    mainController.events = function () { return mainController.submodules["baseListController"]["console"]; };
    mainController.timeline = function () { return mainController.submodules["timelineController"]["timelineBlock"]; };
    mainController.actions = function () { return mainController.submodules["baseListController"]["actionList"]; };
    //targeting helper
    mainController.currentTarget = function () {
        return mainController.actors().element.children(".selected").data("controller");
    };
    mainController.currentPlayer = function () {
        return mainController.actors().element.children(".player").data("controller");
    };
    mainController.submodules = {};
    return mainController;
}());
