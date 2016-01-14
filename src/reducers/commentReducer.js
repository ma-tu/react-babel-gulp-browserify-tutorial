import * as ActionTypes from '../constants/ActionTypes'

export default function commentReducer(state={comments : []}, action) {
  switch(action.type){
    case ActionTypes.ADD_COMMENT:
      return {comments: state.comments.concat([action.comment])}
    case ActionTypes.SET_COMMENTS:
      return {comments: action.comments}
    default:
      return state;
  }
}
