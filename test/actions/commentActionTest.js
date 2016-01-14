import assert from 'power-assert';
import * as commentActions from '../../src/actions/commentAction';
import * as ActionTypes from '../../src/constants/ActionTypes'
import * as commentUtil from '../testUtil/commentUtil'

describe('actions', () => {
    it('addComment', () => {
        const actual = commentActions.addComment(commentUtil.getPeteComment())
        const expected = {type: ActionTypes.ADD_COMMENT, comment: commentUtil.getPeteComment()}

        assert.deepEqual(actual, expected)
    });

    it('setComments', () => {
        const actual = commentActions.setComments([commentUtil.getPeteComment()])
        const expected = {type: ActionTypes.SET_COMMENTS, comments: [commentUtil.getPeteComment()]}

        assert.deepEqual(actual, expected)
    });

});
