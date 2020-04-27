"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var z_score_normalization_1 = require("./z-score.normalization");
describe('Z Score Normalization Tests', function () {
    var normalization;
    beforeEach(function () {
        normalization = new z_score_normalization_1.ZScoreNormalization();
    });
    it('options should return true for no more', function () {
        expect(normalization.getOptions().noMore()).toBeTruthy();
    });
    it('options should throw for options', function (done) {
        try {
            normalization.getOptions().options();
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('options should throw for submit', function (done) {
        try {
            normalization.getOptions().submit({});
            done.fail();
        }
        catch (error) {
            expect().nothing();
            done();
        }
    });
    it('inputs should return one inputs', function () {
        expect(normalization.getInputs().inputs().length).toBe(1);
    });
    it('submit a single list of number should be normalization', function () {
        normalization.getInputs().submit({
            'feature': {
                features: ['f1'],
                examples: [[1], [2], [4], [3]]
            }
        });
        var data = normalization.transform();
        expect(data.features).toEqual(['f1']);
        expect(data.examples.length).toBe(4);
        expect(data.examples[0].length).toBe(1);
        expect(data.examples[1].length).toBe(1);
        expect(data.examples[2].length).toBe(1);
        expect(data.examples[3].length).toBe(1);
        expect(data.examples[0][0]).toBeCloseTo(-3 * (Math.pow(5, 0.5)) / 5);
        expect(data.examples[1][0]).toBeCloseTo(-1 * (Math.pow(5, 0.5)) / 5);
        expect(data.examples[2][0]).toBeCloseTo(3 * (Math.pow(5, 0.5)) / 5);
        expect(data.examples[3][0]).toBeCloseTo((Math.pow(5, 0.5)) / 5);
    });
    it('submit a duel list of number should be normalization', function () {
        normalization.getInputs().submit({
            'feature': {
                features: ['f1', 'f2'],
                examples: [[1, -1], [2, 4], [3, 3]]
            }
        });
        var data = normalization.transform();
        expect(data.features).toEqual(['f1', 'f2']);
        expect(data.examples.length).toBe(3);
        expect(data.examples[0].length).toBe(2);
        expect(data.examples[1].length).toBe(2);
        expect(data.examples[2].length).toBe(2);
        expect(data.examples[0][0]).toBeCloseTo(-1.0 * (Math.pow(6.0, 0.5)) / 2);
        expect(data.examples[1][0]).toBeCloseTo(0);
        expect(data.examples[2][0]).toBeCloseTo(1.0 * (Math.pow(6.0, 0.5)) / 2.0);
        expect(data.examples[0][1]).toBeCloseTo(-3 * (Math.pow(42, 0.5)) / 14);
        expect(data.examples[1][1]).toBeCloseTo((Math.pow(42, 0.5)) / 7);
        expect(data.examples[2][1]).toBeCloseTo((Math.pow(42, 0.5)) / 14);
    });
    it('submit nothing should return nothing', function () {
        normalization.getInputs().submit({
            'feature': {
                features: ['f1'],
                examples: []
            }
        });
        var data = normalization.transform();
        expect(data).toEqual({
            features: ['f1'],
            examples: []
        });
    });
});
