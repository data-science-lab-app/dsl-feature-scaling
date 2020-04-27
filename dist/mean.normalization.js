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
var MeanNormalization = /** @class */ (function (_super) {
    __extends(MeanNormalization, _super);
    function MeanNormalization() {
        var _this = _super.call(this) || this;
        _this.options = new MeanNormalizationPluginOptions();
        _this.inputs = new MeanNormalizationPluginInputs(_this);
        return _this;
    }
    MeanNormalization.prototype.getOptions = function () {
        return this.options;
    };
    MeanNormalization.prototype.getInputs = function () {
        return this.inputs;
    };
    MeanNormalization.prototype.transform = function () {
        if (this.inputData !== undefined) {
            if (this.inputData.examples.length === 0) {
                return this.inputData;
            }
            var maximums_1 = this.inputData.examples[0].slice();
            var minimums_1 = this.inputData.examples[0].slice();
            var averages_1 = this.inputData.examples[0].map(function () { return 0.0; });
            this.inputData.examples.forEach(function (row, rowCount) {
                row.forEach(function (value, index) {
                    averages_1[index] += (value - averages_1[index]) / (rowCount + 1);
                    if (value > maximums_1[index]) {
                        maximums_1[index] = value;
                    }
                    else if (value < minimums_1[index]) {
                        minimums_1[index] = value;
                    }
                });
            });
            var denominators_1 = this.inputData.examples[0].map(function (_, index) { return maximums_1[index] - minimums_1[index]; });
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(function (row) {
                    return row.map(function (value, index) {
                        return (value - averages_1[index]) / denominators_1[index];
                    });
                })
            };
        }
        throw new Error("Mean Normalization unable to get input data");
    };
    MeanNormalization.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    return MeanNormalization;
}(data_science_lab_core_1.TransformPlugin));
exports.MeanNormalization = MeanNormalization;
var MeanNormalizationPluginInputs = /** @class */ (function (_super) {
    __extends(MeanNormalizationPluginInputs, _super);
    function MeanNormalizationPluginInputs(plugin) {
        var _this = _super.call(this) || this;
        _this.plugin = plugin;
        return _this;
    }
    MeanNormalizationPluginInputs.prototype.submit = function (inputs) {
        this.plugin.submit(inputs['feature']);
    };
    MeanNormalizationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'feature',
                label: 'Features to Normalize',
                min: 1,
                type: 'number'
            }
        ];
    };
    return MeanNormalizationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var MeanNormalizationPluginOptions = /** @class */ (function (_super) {
    __extends(MeanNormalizationPluginOptions, _super);
    function MeanNormalizationPluginOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeanNormalizationPluginOptions.prototype.submit = function (inputs) {
        throw new Error("Mean Normalization has no submit options.");
    };
    MeanNormalizationPluginOptions.prototype.options = function () {
        throw new Error("Mean Normalization has no options.");
    };
    MeanNormalizationPluginOptions.prototype.noMore = function () {
        return true;
    };
    return MeanNormalizationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
