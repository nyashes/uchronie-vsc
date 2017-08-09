﻿function computeStars(prop: string, element: JQuery) {
    var stars: number = 1;
    element.children().each((dum, child) => {
        var currentChild = jQuery(child);
        var star: number = parseFloat(currentChild.attr("star"));
        if (!star)
            star = 1;
        stars += star;

    });
    element.children().each((dum, child) => {
        var currentChild = jQuery(child);
        var star: number = parseFloat(currentChild.attr("star"));
        if (!star)
            star = 1;
        currentChild.css(prop, (star / stars * 100) + "%");
    });
}
function mcBinder(element: JQuery) {
    if (element.hasClass("noParse"))
        return;

    if (element.attr("controller") != undefined) {
        var object = undefined;
        if (element.attr("model") != undefined)
            object = window[element.attr("model")];
        else if (element.data("model") != undefined)
            object = element.data("model");

        if (mainController.submodules[element.attr("controller")] == undefined)
            mainController.submodules[element.attr("controller")] = {};

        mainController.submodules[element.attr("controller")][element.attr("id")] = 
            new window[element.attr("controller")](element, object);
    }
    makePageLayout(element);
}

function mvcBinder(element: JQuery) {
    if (element.attr("view") != undefined) {
        element.load(element.attr("view"), null, () => mcBinder(element));
    }
    else
        mcBinder(element);
}

function makePageLayout(rootNode) {
    rootNode.children().each((dum, element) => { mvcBinder(jQuery(element)); });
    rootNode.children(".partition").each((dum, element) => { computeStars("width", jQuery(element)); });
    rootNode.children(".vpartition").each((dum, element) => { computeStars("height", jQuery(element)); });
}

function importScenario(jsonFile) {
    //global evaluation we want to import definitions in current scope (acording to ES3 & ES5, indirect eval is global, eval.call is indirect)
    return jQuery.ajax({
        url: jsonFile,
        dataType: "text"
    }).done((data) => { eval.call(null, data); });

}

function loadAllModel(jsonFile, done?) {

    
    //json.ts files are json files able to store ts functions in addition to data
    let callback = (data) => {

        let todo = () => {
            let postload = undefined;
            if (data["postload"]) {
                postload = data["postload"];
                delete data["postload"];
            }

            for (let elem in data)
                jQuery("#" + elem).data("model", data[elem]);

            if (postload)
                postload();
        }

        if (data["preload"]) {
            let result = data["preload"]();
            delete data["preload"];
            if (result == undefined || result.responseText) {
                todo();
                if (done) done();
            }
            else {
                result.done(() => { todo(); if (done) done(); });
            }
        }
        else {
            todo();
            if (done) done();
        }

        
    };

    //weird invocation = encapsulate eval in a controlled environement
    jQuery.ajax({
        url: jsonFile,
        dataType: "text"
    }).done((data) => { ((data) => { eval(data);  }).call(callback, data) });
}
