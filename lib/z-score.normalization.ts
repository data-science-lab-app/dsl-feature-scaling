import { TransformPlugin, PluginInputs, PluginData, PluginDataInput, Option, PluginOptions } from "data-science-lab-core";

export class ZScoreNormalization extends TransformPlugin {

    options: ZScoreNormalizationPluginOptions;
    inputs: ZScoreNormalizationPluginInputs;

    inputData?: PluginData;

    constructor() {
        super();
        this.options = new ZScoreNormalizationPluginOptions();
        this.inputs = new ZScoreNormalizationPluginInputs(this);

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
                    averages[index] += (value - averages[index]) / (rowCount + 1);
                });
            });

            let standardDeviations = this.inputData.examples[0].map(() => 0.0);

            this.inputData.examples.forEach((row) => {
                row.forEach((value, index) => {
                    standardDeviations[index] += (value - averages[index]) ** 2.0;
                });
            });

            standardDeviations = standardDeviations.map((value) => {
                return (value / examples) ** 0.5
            });

            return {
                features: this.inputData.features,
                examples: this.inputData.examples.map(row =>
                    row.map((value, index) =>
                        (value - averages[index]) / standardDeviations[index]
                    ))
            };
        }
        throw new Error(`Z Score Normalization unable to get input data`);
    }


    submit(pluginData: PluginData) {
        this.inputData = pluginData;
    }
}

class ZScoreNormalizationPluginInputs extends PluginInputs {
    constructor(public plugin: ZScoreNormalization) {
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

class ZScoreNormalizationPluginOptions extends PluginOptions {
    submit(inputs: { [id: string]: any; }): void {
        throw new Error("Z Score Normalization has no submit options.");
    }
    options(): Option[] {
        throw new Error("Z Score Normalization has no options.");
    }
    noMore(): boolean {
        return true;
    }

}
