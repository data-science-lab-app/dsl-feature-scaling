"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
var UnitLengthNormalization = /** @class */ (function (_super) {
    __extends(UnitLengthNormalization, _super);
    function UnitLengthNormalization() {
        var _this = _super.call(this) || this;
        _this.options = new UnitLengthNormalizationPluginOptions();
        _this.inputs = new UnitLengthNormalizationPluginInputs(_this);
        return _this;
    }
    UnitLengthNormalization.prototype.getOptions = function () {
        return this.options;
    };
    UnitLengthNormalization.prototype.getInputs = function () {
        return this.inputs;
    };
    UnitLengthNormalization.prototype.transform = function () {
        if (this.inputData !== undefined) {
            if (this.inputData.examples.length === 0) {
                return this.inputData;
            }
            var examples_1 = this.inputData.examples.length;
            var averages_1 = this.inputData.examples[0].map(function () { return 0.0; });
            this.inputData.examples.forEach(function (row, rowCount) {
                row.forEach(function (value, index) {
                    averages_1[index] += ((Math.pow(value, 2)) - averages_1[index]) / (rowCount + 1);
                });
            });
            var magnitudes_1 = averages_1.map(function (value) { return (Math.pow(value, 0.5)) * (Math.pow(examples_1, 0.5)); });
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(function (row) {
                    return row.map(function (value, index) {
                        return (value) / magnitudes_1[index];
                    });
                })
            };
        }
        throw new Error("Unit Length Normalization unable to get input data");
    };
    UnitLengthNormalization.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    return UnitLengthNormalization;
}(data_science_lab_core_1.TransformPlugin));
exports.UnitLengthNormalization = UnitLengthNormalization;
var UnitLengthNormalizationPluginInputs = /** @class */ (function (_super) {
    __extends(UnitLengthNormalizationPluginInputs, _super);
    function UnitLengthNormalizationPluginInputs(plugin) {
        var _this = _super.call(this) || this;
        _this.plugin = plugin;
        return _this;
    }
    UnitLengthNormalizationPluginInputs.prototype.submit = function (inputs) {
        this.plugin.submit(inputs['feature']);
    };
    UnitLengthNormalizationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'feature',
                label: 'Features to Normalize',
                min: 1,
                type: 'number'
            }
        ];
    };
    return UnitLengthNormalizationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var UnitLengthNormalizationPluginOptions = /** @class */ (function (_super) {
    __extends(UnitLengthNormalizationPluginOptions, _super);
    function UnitLengthNormalizationPluginOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnitLengthNormalizationPluginOptions.prototype.submit = function (inputs) {
        throw new Error("Unit Length Normalization has no submit options.");
    };
    UnitLengthNormalizationPluginOptions.prototype.options = function () {
        throw new Error("Unit Length Normalization has no options.");
    };
    UnitLengthNormalizationPluginOptions.prototype.noMore = function () {
        return true;
    };
    return UnitLengthNormalizationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
