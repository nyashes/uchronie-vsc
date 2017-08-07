function computeStars(prop, element) {
    var stars = 1;
    element.children().each(function (dum, child) {
        var currentChild = jQuery(child);
        var star = parseFloat(currentChild.attr("star"));
        if (!star)
            star = 1;
        stars += star;
    });
    element.children().each(function (dum, child) {
        var currentChild = jQuery(child);
        var star = parseFloat(currentChild.attr("star"));
        if (!star)
            star = 1;
        currentChild.css(prop, (star / stars * 100) + "%");
    });
}
function mcBinder(element) {
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
function mvcBinder(element) {
    if (element.attr("view") != undefined) {
        element.load(element.attr("view"), null, function () { return mcBinder(element); });
    }
    else
        mcBinder(element);
}
function makePageLayout(rootNode) {
    rootNode.children().each(function (dum, element) { mvcBinder(jQuery(element)); });
    rootNode.children(".partition").each(function (dum, element) { computeStars("width", jQuery(element)); });
    rootNode.children(".vpartition").each(function (dum, element) { computeStars("height", jQuery(element)); });
}
function importScenario(jsonFile) {
    //global evaluation we want to import definitions in current scope (acording to ES3 & ES5, indirect eval is global, eval.call is indirect)
    return jQuery.ajax({
        url: jsonFile,
        dataType: "text"
    }).done(function (data) { eval.call(null, data); });
}
function loadAllModel(jsonFile, done) {
    //json.ts files are json files able to store ts functions in addition to data
    var callback = function (data) {
        var todo = function () {
            var postload = undefined;
            if (data["postload"]) {
                postload = data["postload"];
                delete data["postload"];
            }
            for (var elem in data)
                jQuery("#" + elem).data("model", data[elem]);
            if (postload)
                postload();
        };
        if (data["preload"]) {
            var result = data["preload"]();
            delete data["preload"];
            if (result == undefined || result.responseText) {
                todo();
                if (done)
                    done();
            }
            else {
                result.done(function () { todo(); if (done)
                    done(); });
            }
        }
        else {
            todo();
            if (done)
                done();
        }
    };
    //weird invocation = encapsulate eval in a controlled environement
    jQuery.ajax({
        url: jsonFile,
        dataType: "text"
    }).done(function (data) { (function (data) { eval(data); }).call(callback, data); });
}
