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
var objectModel;
(function (objectModel) {
    var actionCat = (function () {
        function actionCat() {
        }
        return actionCat;
    }());
    objectModel.actionCat = actionCat;
    var actionMeta = (function () {
        function actionMeta() {
        }
        return actionMeta;
    }());
    objectModel.actionMeta = actionMeta;
    var actor = (function () {
        function actor(name) {
            this.name = name;
        }
        return actor;
    }());
    objectModel.actor = actor;
    var animatedActor = (function (_super) {
        __extends(animatedActor, _super);
        function animatedActor(base) {
            var _this = _super.call(this, "") || this;
            _this.defiance = new objectModel.nonDeterministicState(0);
            for (var prop in base)
                _this[prop] = base[prop];
            if (_this["constructor"]) {
                var ctor_1 = function () {
                    _this["constructor"].call(_this);
                    delete _this["constructor"];
                    objectModel.guiTick.splice(objectModel.guiTick.indexOf(ctor_1), 1);
                };
                objectModel.guiTick.push(ctor_1);
            }
            return _this;
        }
        return animatedActor;
    }(actor));
    objectModel.animatedActor = animatedActor;
    var patient = (function (_super) {
        __extends(patient, _super);
        function patient(base) {
            var _this = _super.call(this, base) || this;
            //certain patients ont suivi une formation de premier soin
            _this.firstAidSkill = new objectModel.nonDeterministicState(Math.floor(Math.random() * 80));
            _this.gravity = new objectModel.nonDeterministicState(1 + (Math.random() - 0.01) * 4);
            _this.injuries = new objectModel.nonDeterministicState(new Array());
            //this.defiance.set(0, () => 25 + Math.random() * 25);
            _this.eventIdx = objectModel.tick.push(function () { return _this.onUpdate(); });
            return _this;
        }
        patient.prototype.onUpdate = function () {
            var target = this;
            for (var _i = 0, _a = this.injuries.current(); _i < _a.length; _i++) {
                var item = _a[_i];
                var parameters = [];
                for (var _b = 0, _c = item.signature; _b < _c.length; _b++) {
                    var param = _c[_b];
                    parameters.push(eval(param));
                }
                item.delegate.apply(parameters.shift(), parameters);
            }
        };
        patient.prototype.kill = function () {
            var targetList = mainController.submodules["targetListController"]["targetList"];
            this.gravity.setKeyFrame(objectModel.currentTime, 5);
            this.injuries.setKeyFrame(objectModel.currentTime, []);
        };
        return patient;
    }(animatedActor));
    objectModel.patient = patient;
    var nurse = (function (_super) {
        __extends(nurse, _super);
        function nurse() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.bandAidSkill = new objectModel.nonDeterministicState(100);
            _this.firstAidSkill = new objectModel.nonDeterministicState(100);
            _this.injectionSkill = new objectModel.nonDeterministicState(100);
            _this.perfusionSkill = new objectModel.nonDeterministicState(100);
            return _this;
        }
        return nurse;
    }(animatedActor));
    objectModel.nurse = nurse;
    var doctor = (function (_super) {
        __extends(doctor, _super);
        function doctor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.examineSkill = new objectModel.nonDeterministicState(100);
            //difficile, même les meilleurs échouent parfois
            _this.operateSkill = new objectModel.nonDeterministicState(70 + Math.random() * 20);
            return _this;
        }
        return doctor;
    }(nurse));
    objectModel.doctor = doctor;
    var ressource = (function (_super) {
        __extends(ressource, _super);
        function ressource(name, quantity, unit) {
            var _this = _super.call(this, name) || this;
            _this.quantity = new objectModel.nonDeterministicState();
            _this.quantity.setKeyFrame(0, quantity);
            _this.unit = unit;
            return _this;
        }
        return ressource;
    }(actor));
    objectModel.ressource = ressource;
})(objectModel || (objectModel = {}));
