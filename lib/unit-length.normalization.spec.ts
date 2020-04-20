import { UnitLengthNormalization } from "./unit-length.normalization"
import { PluginData } from "data-science-lab-core";

describe('Unit Length Normalization Tests', () => {
    let normalization: UnitLengthNormalization;

    beforeEach(() => {
        normalization = new UnitLengthNormalization();
    });

    it('options should return true for no more', () => {
        expect(normalization.getOptions().noMore()).toBeTruthy();
    });

    it('options should throw for options', (done) => {
        try {
            normalization.getOptions().options();
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('options should throw for submit', (done) => {
        try {
            normalization.getOptions().submit({});
            done.fail();
        } catch (error) {
            expect().nothing();
            done();
        }
    });

    it('inputs should return one inputs', () => {
        expect(normalization.getInputs().inputs().length).toBe(1);
    });

    it('submit a single list of number should be normalization', () => {
        normalization.getInputs().submit({
            'feature':
            {
                features: ['f1'],
                examples: [[1], [2], [4], [3]]
            }
        })
        const data = normalization.transform();
        expect((data as PluginData).features).toEqual(['f1']);
        expect((data as PluginData).examples.length).toBe(4);
        expect((data as PluginData).examples[0].length).toBe(1);
        expect((data as PluginData).examples[1].length).toBe(1);
        expect((data as PluginData).examples[2].length).toBe(1);
        expect((data as PluginData).examples[3].length).toBe(1);
        expect((data as PluginData).examples[0][0]).toBeCloseTo(1.0 / (30 ** 0.5));
        expect((data as PluginData).examples[1][0]).toBeCloseTo(2.0 / (30 ** 0.5));
        expect((data as PluginData).examples[2][0]).toBeCloseTo(4.0 / (30 ** 0.5));
        expect((data as PluginData).examples[3][0]).toBeCloseTo(3.0 / (30 ** 0.5));
    });

    it('submit a duel list of number should be normalization', () => {
        normalization.getInputs().submit({
            'feature':
            {
                features: ['f1', 'f2'],
                examples: [[1, -1], [2, 4], [3, 3]]
            }
        })
        const data = normalization.transform();
        expect((data as PluginData).features).toEqual(['f1', 'f2']);
        expect((data as PluginData).examples.length).toBe(3);
        expect((data as PluginData).examples[0].length).toBe(2);
        expect((data as PluginData).examples[1].length).toBe(2);
        expect((data as PluginData).examples[2].length).toBe(2);
        expect((data as PluginData).examples[0][0]).toBeCloseTo(1.0 / (14 ** 0.5));
        expect((data as PluginData).examples[1][0]).toBeCloseTo(2.0 / (14 ** 0.5));
        expect((data as PluginData).examples[2][0]).toBeCloseTo(3.0 / (14 ** 0.5));
        expect((data as PluginData).examples[0][1]).toBeCloseTo(-1.0 / (26 ** 0.5));
        expect((data as PluginData).examples[1][1]).toBeCloseTo(4.0 / (26 ** 0.5));
        expect((data as PluginData).examples[2][1]).toBeCloseTo(3.0 / (26 ** 0.5));
    });

    it('submit nothing should return nothing', () => {
        normalization.getInputs().submit({
            'feature': {
                features: ['f1'],
                examples: []
            }
        });
        const data = normalization.transform();
        expect(data).toEqual({
            features: ['f1'],
            examples: []
        });
    });

});

