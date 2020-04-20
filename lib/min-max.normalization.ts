import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";

export class MinMaxNormalization extends TransformPlugin {

    options: MinMaxNormalizationPluginOptions;
    inputs: MinMaxNormalizationPluginInputs;

    inputData?: PluginData;

    constructor() {
        super();
        this.options = new MinMaxNormalizationPluginOptions();
        this.inputs = new MinMaxNormalizationPluginInputs(this);

    }

    getOptions(): PluginOptions {
        return this.options;
    }

    getInputs(): PluginInputs {
        return this.inputs;
    }

    transform(): PluginData | PluginData[] {
        if (this.inputData !== undefined) {
            if (this.inputData.examples.length === 0) {
                return this.inputData;
            }

            const maximums = this.inputData.examples[0].slice();
            const minimums = this.inputData.examples[0].slice();

            this.inputData.examples.forEach((row) => {
                row.forEach((value, index) => {
                    if (value > maximums[index]) {
                        maximums[index] = value;
                    } else if (value < minimums[index]) {
                        minimums[index] = value;
                    }
                });
            });

            const denominators = this.inputData.examples[0].map((_, index) => maximums[index] - minimums[index]);

            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(row =>
                    row.map((value, index) =>
                        (value - minimums[index]) / denominators[index]
                    ))
            };
        }
        throw new Error(`Min Max Normalization unable to get input data`);
    }


    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }
}

class MinMaxNormalizationPluginInputs extends PluginInputs {
    constructor(public plugin: MinMaxNormalization) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        this.plugin.submit(inputs['feature']);
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'feature',
                label: 'Features to Normalize',
                min: 1,
                type: 'feature'
            }];
    }
}

class MinMaxNormalizationPluginOptions extends PluginOptions {
    submit(inputs: { [id: string]: any; }): void {
        throw new Error("Min Max Normalization has no submit options.");
    }
    options(): Option[] {
        throw new Error("Min Max Normalization has no options.");
    }
    noMore(): boolean {
        return true;
    }

}
