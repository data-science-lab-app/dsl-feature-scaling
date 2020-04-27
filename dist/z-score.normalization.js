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
var ZScoreNormalization = /** @class */ (function (_super) {
    __extends(ZScoreNormalization, _super);
    function ZScoreNormalization() {
        var _this = _super.call(this) || this;
        _this.options = new ZScoreNormalizationPluginOptions();
        _this.inputs = new ZScoreNormalizationPluginInputs(_this);
        return _this;
    }
    ZScoreNormalization.prototype.getOptions = function () {
        return this.options;
    };
    ZScoreNormalization.prototype.getInputs = function () {
        return this.inputs;
    };
    ZScoreNormalization.prototype.transform = function () {
        if (this.inputData !== undefined) {
            if (this.inputData.examples.length === 0) {
                return this.inputData;
            }
            var examples_1 = this.inputData.examples.length;
            var averages_1 = this.inputData.examples[0].map(function () { return 0.0; });
            this.inputData.examples.forEach(function (row, rowCount) {
                row.forEach(function (value, index) {
                    averages_1[index] += (value - averages_1[index]) / (rowCount + 1);
                });
            });
            var standardDeviations_1 = this.inputData.examples[0].map(function () { return 0.0; });
            this.inputData.examples.forEach(function (row) {
                row.forEach(function (value, index) {
                    standardDeviations_1[index] += Math.pow((value - averages_1[index]), 2.0);
                });
            });
            standardDeviations_1 = standardDeviations_1.map(function (value) {
                return Math.pow((value / examples_1), 0.5);
            });
            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(function (row) {
                    return row.map(function (value, index) {
                        return (value - averages_1[index]) / standardDeviations_1[index];
                    });
                })
            };
        }
        throw new Error("Z Score Normalization unable to get input data");
    };
    ZScoreNormalization.prototype.submit = function (pluginData) {
        this.inputData = pluginData;
    };
    return ZScoreNormalization;
}(data_science_lab_core_1.TransformPlugin));
exports.ZScoreNormalization = ZScoreNormalization;
var ZScoreNormalizationPluginInputs = /** @class */ (function (_super) {
    __extends(ZScoreNormalizationPluginInputs, _super);
    function ZScoreNormalizationPluginInputs(plugin) {
        var _this = _super.call(this) || this;
        _this.plugin = plugin;
        return _this;
    }
    ZScoreNormalizationPluginInputs.prototype.submit = function (inputs) {
        this.plugin.submit(inputs['feature']);
    };
    ZScoreNormalizationPluginInputs.prototype.inputs = function () {
        return [
            {
                id: 'feature',
                label: 'Features to Normalize',
                min: 1,
                type: 'number'
            }
        ];
    };
    return ZScoreNormalizationPluginInputs;
}(data_science_lab_core_1.PluginInputs));
var ZScoreNormalizationPluginOptions = /** @class */ (function (_super) {
    __extends(ZScoreNormalizationPluginOptions, _super);
    function ZScoreNormalizationPluginOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZScoreNormalizationPluginOptions.prototype.submit = function (inputs) {
        throw new Error("Z Score Normalization has no submit options.");
    };
    ZScoreNormalizationPluginOptions.prototype.options = function () {
        throw new Error("Z Score Normalization has no options.");
    };
    ZScoreNormalizationPluginOptions.prototype.noMore = function () {
        return true;
    };
    return ZScoreNormalizationPluginOptions;
}(data_science_lab_core_1.PluginOptions));
