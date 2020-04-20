import { MeanNormalization } from "./mean.normalization"

describe('Mean Normalization Tests', () => {
    let normalization: MeanNormalization;

    beforeEach(() => {
        normalization = new MeanNormalization();
    });

    it('options should return true for no more', () => {
        expect(normalization.getOptions().noMore()).toBeTruthy();
    });

    it('options should throw for options', (done) => {
        try {
            normalization.getOptions().options();
            done.fail();
        } catch(error) {
            expect().nothing();
            done();
        }
    });

    it('options should throw for submit', (done) => {
        try {
            normalization.getOptions().submit({});
            done.fail();
        } catch(error) {
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
        expect(data).toEqual(
            {
                features: ['f1'],
                examples: [[-0.5], [-0.5 / 3], [0.5], [0.5 / 3]]
            }
        )
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
        expect(data).toEqual(
            {
                features: ['f1', 'f2'],
                examples: [[-0.5, -0.6], [0, 0.4],  [0.5, 0.2]]
            }
        );
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

