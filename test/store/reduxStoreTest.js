import assert from 'power-assert';
import configureStore from '../../src/store/reduxStore';
import * as ActionTypes from '../../src/constants/ActionTypes'

describe('store', () => {
    const store = configureStore();

    it('init', () => {
        assert.deepEqual(store.getState(), {comments: []});
    });
});
