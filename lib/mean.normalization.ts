import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";

export class MeanNormalization extends TransformPlugin {

    options: MeanNormalizationPluginOptions;
    inputs: MeanNormalizationPluginInputs;

    inputData?: PluginData;

    constructor() {
        super();
        this.options = new MeanNormalizationPluginOptions();
        this.inputs = new MeanNormalizationPluginInputs(this);

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
            const averages = this.inputData.examples[0].map(() => 0.0); 

            this.inputData.examples.forEach((row, rowCount) => {
                row.forEach((value, index) => {
                    
                    averages[index] += (value - averages[index]) / (rowCount + 1);

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
                        (value - averages[index]) / denominators[index]
                    ))
            };
        }
        throw new Error(`Mean Normalization unable to get input data`);
    }


    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }
}

class MeanNormalizationPluginInputs extends PluginInputs {
    constructor(public plugin: MeanNormalization) {
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
                type: 'number'
            }];
    }
}

class MeanNormalizationPluginOptions extends PluginOptions {
    submit(inputs: { [id: string]: any; }): void {
        throw new Error("Mean Normalization has no submit options.");
    }
    options(): Option[] {
        throw new Error("Mean Normalization has no options.");
    }
    noMore(): boolean {
        return true;
    }

}
