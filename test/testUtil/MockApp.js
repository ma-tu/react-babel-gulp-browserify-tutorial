import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CommentBox from '../../src/jsx/commentBox.jsx';
import * as commentActions from '../../src/actions/commentAction';

function mapStateToProps(state) {
  return {
    url: '',
    pollInterval: 0,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox)
