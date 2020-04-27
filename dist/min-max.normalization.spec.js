"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var min_max_normalization_1 = require("./min-max.normalization");
describe('Min Max Normalization Tests', function () {
    var normalization;
    beforeEach(function () {
        normalization = new min_max_normalization_1.MinMaxNormalization();
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
                examples: [[1], [2]]
            }
        });
        var data = normalization.transform();
        expect(data).toEqual({
            features: ['f1'],
            examples: [[0], [1]]
        });
    });
    it('submit a duel list of number should be normalization', function () {
        normalization.getInputs().submit({
            'feature': {
                features: ['f1', 'f2'],
                examples: [[1, -1], [2, 4], [3, 3]]
            }
        });
        var data = normalization.transform();
        expect(data).toEqual({
            features: ['f1', 'f2'],
            examples: [[0, 0], [0.5, 1], [1, .8]]
        });
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
