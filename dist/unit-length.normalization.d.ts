import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";
export declare class UnitLengthNormalization extends TransformPlugin {
    options: UnitLengthNormalizationPluginOptions;
    inputs: UnitLengthNormalizationPluginInputs;
    inputData?: PluginData;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    submit(pluginData: PluginData): void;
}
declare class UnitLengthNormalizationPluginInputs extends PluginInputs {
    plugin: UnitLengthNormalization;
    constructor(plugin: UnitLengthNormalization);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class UnitLengthNormalizationPluginOptions extends PluginOptions {
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
