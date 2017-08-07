

this({
    preload: function () { return importScenario('scenario/test.json.js'); },
    //postload: function () { alert("post"); },

    /*action list*/
    actionList: [
        {
            name: "commit",
            actionList: [
                {
                    name: "livraison augmentin",
                    signature: [],
                    delegate: function () {
                        mainController.events().push(events.augmentin());
                        networking.remote(function() {
                            console.log(mainController.events());
                            console.log(events.augmentin(this));
                            mainController.events().push(events.augmentin(this));
                        }, objectModel.currentTime);
                    }
                },
            ]
        }
    ],

    /*pre console test data*/
    console: [
        new objectModel.gameEvent(() => {
        }, "mode formateur activé", "warning")
    ],

    /*ressources seed (you can only define them here)*/
    sideBarLeft: [
        new objectModel.ressource("couverture", 5, "unités"),
        new objectModel.ressource("pansements", 100, "unités"),
        new objectModel.ressource("oxygène", 500, "L"),
        new objectModel.ressource("morphine", 50, "mL"),
        new objectModel.ressource("augmentin", 50, "moles"),
        new objectModel.ressource("perche", 3, "unités")
    ],

    /*actors*/
    targetList: [
        new objectModel.doctor({ name: "Joueur", infos: ["médecin leader"], avatarUrl: "./images/victeams2.png" }),
        //use redefined nurses instead of default
        new objectModel.nurse({
            name: "Infirmier julien",
            infos: ["Efficace en pansements"],
            avatarUrl: "./images/victeams2.png",
            //make him start with more bandAidSkill than default nurse (50 in this model)
            constructor: function () { this.bandAidSkill.setKeyFrame(0, 80); }
        }),
        new objectModel.nurse({ name: "Auxiliaire jacob", infos: [""], avatarUrl: "./images/victeams2.png" }),
        new objectModel.nurse({ name: "Auxiliaire julie", infos: [], avatarUrl: "./images/victeams1.png" }),
        new objectModel.patient({ name: "Blessé 1", infos: ["nom: inconnu", "blessures: inconnu"], avatarUrl: "./images/victim.png" }),
        new objectModel.patient({ name: "Blessé 2", infos: ["nom: inconnu", "blessures: inconnu"], avatarUrl: "./images/victim.png" }),
        new objectModel.patient({ name: "Blessé 3", infos: ["nom: inconnu", "blessures: inconnu"], avatarUrl: "./images/victim.png" }),
        new objectModel.patient({ name: "Blessé 4", infos: ["nom: inconnu", "blessures: inconnu"], avatarUrl: "./images/victim.png" }),
    ],

});