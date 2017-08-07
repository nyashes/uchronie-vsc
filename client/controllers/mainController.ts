class mainController {
    static submodules: { [key: string]: { [key: string]: any } } = {};

    //general helpers
    public static ressources(): ressourceListController { return mainController.submodules["ressourceListController"]["sideBarLeft"]; }
    public static actors(): targetListController { return mainController.submodules["targetListController"]["targetList"]; }
    public static events(): baseListController<objectModel.gameEvent> { return mainController.submodules["baseListController"]["console"]; }
    public static timeline(): timelineController { return mainController.submodules["timelineController"]["timelineBlock"]; }
    public static actions(): baseListController<objectModel.actionCat> { return mainController.submodules["baseListController"]["actionList"]; }

    //targeting helper
    public static currentTarget(): baseController<objectModel.animatedActor> {
        return mainController.actors().element.children(".selected").data("controller");
    }

    public static currentPlayer(): baseController<objectModel.animatedActor> {
        return mainController.actors().element.children(".player").data("controller");
    }

    constructor() {

    }
}