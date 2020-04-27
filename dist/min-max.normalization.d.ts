import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";
export declare class MinMaxNormalization extends TransformPlugin {
    options: MinMaxNormalizationPluginOptions;
    inputs: MinMaxNormalizationPluginInputs;
    inputData?: PluginData;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    submit(pluginData: PluginData): void;
}
declare class MinMaxNormalizationPluginInputs extends PluginInputs {
    plugin: MinMaxNormalization;
    constructor(plugin: MinMaxNormalization);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class MinMaxNormalizationPluginOptions extends PluginOptions {
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
