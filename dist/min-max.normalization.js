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
var MinMaxNormalization = /** @class */ (function (_super) {
    __extends(MinMaxNormalization, _super);
    function MinMaxNormalization() {
        var _this = _super.call(this) || this;
        _this.options = new MinMaxNormalizationPluginOptions();
        _this.inputs = new MinMaxNormalizationPluginInputs(_this);
        return _this;
    }
    MinMaxNormalization.prototype.getOptions = function () {
        return this.options;
    };
    MinMaxNormalization.prototype.getInputs = function () {
        return this.inputs;
    };
    MinMaxNormalization.prototype.transform = function () {
        if (this.inputData !== undefined) {
            if (this.inputData.examples.length === 0) {
                return this.inputData;
            }
            var maximums_1 = this.inputData.examples[0].slice();
            var minimums_1 = this.inputData.examples[0].slice();
            this.inputData.examples.forEach(function (row) {
                row.forEach(function (value, index) {
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
                        return (value - minimums_1[index]) / denominators_1[index];
                    });
                })
            };
        }
        throw new Error("Min Max Normalization unable to get input data");
    };
    MinMaxNormalization.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    return MinMaxNormalization;
}(data_science_lab_core_1.TransformPlugin));
exports.MinMaxNormalization = MinMaxNormalization;
var MinMaxNormalizationPluginInputs = /** @class */ (function (_super) {
    __extends(MinMaxNormalizationPluginInputs, _super);
    function MinMaxNormalizationPluginInputs(plugin) {
        var _this = _super.call(this) || this;
        _this.plugin = plugin;
        return _this;
    }
    MinMaxNormalizationPluginInputs.prototype.submit = function (inputs) {
        this.plugin.submit(inputs['feature']);
    };
    MinMaxNormalizationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'feature',
                label: 'Features to Normalize',
                min: 1,
                type: 'number'
            }
        ];
    };
    return MinMaxNormalizationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var MinMaxNormalizationPluginOptions = /** @class */ (function (_super) {
    __extends(MinMaxNormalizationPluginOptions, _super);
    function MinMaxNormalizationPluginOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinMaxNormalizationPluginOptions.prototype.submit = function (inputs) {
        throw new Error("Min Max Normalization has no submit options.");
    };
    MinMaxNormalizationPluginOptions.prototype.options = function () {
        throw new Error("Min Max Normalization has no options.");
    };
    MinMaxNormalizationPluginOptions.prototype.noMore = function () {
        return true;
    };
    return MinMaxNormalizationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
