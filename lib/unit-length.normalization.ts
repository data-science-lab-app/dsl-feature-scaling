import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";

export class UnitLengthNormalization extends TransformPlugin {

    options: UnitLengthNormalizationPluginOptions;
    inputs: UnitLengthNormalizationPluginInputs;

    inputData?: PluginData;

    constructor() {
        super();
        this.options = new UnitLengthNormalizationPluginOptions();
        this.inputs = new UnitLengthNormalizationPluginInputs(this);

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

            const examples = this.inputData.examples.length;
            const averages = this.inputData.examples[0].map(() => 0.0);

            this.inputData.examples.forEach((row, rowCount) => {
                row.forEach((value, index) => {
                    averages[index] += ((value ** 2) - averages[index]) / (rowCount + 1);
                });
            });

            const magnitudes = averages.map((value) => (value ** 0.5) * (examples ** 0.5));

            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(row =>
                    row.map((value, index) =>
                        (value) / magnitudes[index]
                    ))
            };
        }
        throw new Error(`Unit Length Normalization unable to get input data`);
    }


    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }
}

class UnitLengthNormalizationPluginInputs extends PluginInputs {
    constructor(public plugin: UnitLengthNormalization) {
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

class UnitLengthNormalizationPluginOptions extends PluginOptions {
    submit(inputs: { [id: string]: any; }): void {
        throw new Error("Unit Length Normalization has no submit options.");
    }
    options(): Option[] {
        throw new Error("Unit Length Normalization has no options.");
    }
    noMore(): boolean {
        return true;
    }

}
