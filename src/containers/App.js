import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CommentBox from '../jsx/commentBox.jsx';
import * as commentActions from '../actions/commentAction';

function mapStateToProps(state) {
  return {
    url: '/api/comments',
    pollInterval: 2000,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox)
