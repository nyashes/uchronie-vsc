

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
                            mainController.events().push(events.augmentin(this));
                        }, objectModel.currentTime);
                    }
                },
                {
                    name: "cri aléatoire",
                    signature: [],
                    delegate: function () {
                        mainController.events().push(events.scream());
                        networking.remote(function() {
                            mainController.events().push(events.scream(this));
                        }, objectModel.currentTime);
                    }
                },
                {
                    name: "hémoragie sur cible",
                    signature: [],
                    delegate: function () {
                        networking.remote(function() {
                            let patient = (mainController.actors().model[this[1]] as objectModel.patient);
                            patient.injuries.set(this[0], (cur) => {cur.push(injuries.hemoragy); return cur});
                        }, [objectModel.currentTime, mainController.actors().model.indexOf(mainController.currentTarget().model)]);
                    }
                },
                {
                    name: "infection sur cible",
                    signature: [],
                    delegate: function () {
                        networking.remote(function() {
                            let patient = (mainController.actors().model[this[1]] as objectModel.patient);
                            patient.injuries.set(this[0], (cur) => {cur.push(injuries.bactery); return cur});
                        }, [objectModel.currentTime, mainController.actors().model.indexOf(mainController.currentTarget().model)]);
                    }
                },
                {
                    name: "message du PMA",
                    signature: [],
                    delegate: function () {
                        networking.remote(function() {
                            let patient = (mainController.actors().model[this[1]] as objectModel.patient);
                            patient.injuries.set(this[0], (cur) => {cur.push(injuries.bactery); return cur});
                        }, [objectModel.currentTime, prompt("message?")]);
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