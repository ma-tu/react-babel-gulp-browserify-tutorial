import * as ActionTypes from '../constants/ActionTypes'

export function addComment(comment) {
  return {
    type: ActionTypes.ADD_COMMENT,
    comment
  };
}

export function setComments(comments) {
  return {
    type: ActionTypes.SET_COMMENTS,
    comments
  };
}
