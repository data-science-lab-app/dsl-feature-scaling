import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";
export declare class ZScoreNormalization extends TransformPlugin {
    options: ZScoreNormalizationPluginOptions;
    inputs: ZScoreNormalizationPluginInputs;
    inputData?: PluginData;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    transform(): PluginData | PluginData[];
    submit(pluginData: PluginData): void;
}
declare class ZScoreNormalizationPluginInputs extends PluginInputs {
    plugin: ZScoreNormalization;
    constructor(plugin: ZScoreNormalization);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class ZScoreNormalizationPluginOptions extends PluginOptions {
    submit(inputs: {
        [id: string]: any;
    }): void;
    options(): Option[];
    noMore(): boolean;
}
export {};
