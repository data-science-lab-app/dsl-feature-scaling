"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unit_length_normalization_1 = require("./unit-length.normalization");
describe('Unit Length Normalization Tests', function () {
    var normalization;
    beforeEach(function () {
        normalization = new unit_length_normalization_1.UnitLengthNormalization();
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
        expect(data.examples[0][0]).toBeCloseTo(1.0 / (Math.pow(30, 0.5)));
        expect(data.examples[1][0]).toBeCloseTo(2.0 / (Math.pow(30, 0.5)));
        expect(data.examples[2][0]).toBeCloseTo(4.0 / (Math.pow(30, 0.5)));
        expect(data.examples[3][0]).toBeCloseTo(3.0 / (Math.pow(30, 0.5)));
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
        expect(data.examples[0][0]).toBeCloseTo(1.0 / (Math.pow(14, 0.5)));
        expect(data.examples[1][0]).toBeCloseTo(2.0 / (Math.pow(14, 0.5)));
        expect(data.examples[2][0]).toBeCloseTo(3.0 / (Math.pow(14, 0.5)));
        expect(data.examples[0][1]).toBeCloseTo(-1.0 / (Math.pow(26, 0.5)));
        expect(data.examples[1][1]).toBeCloseTo(4.0 / (Math.pow(26, 0.5)));
        expect(data.examples[2][1]).toBeCloseTo(3.0 / (Math.pow(26, 0.5)));
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
