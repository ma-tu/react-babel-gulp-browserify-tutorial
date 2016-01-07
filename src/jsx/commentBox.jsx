import React from 'react'
import $      from 'jquery';
import CommentList from './commentList.jsx';
import CommentForm from './commentForm.jsx';

export default class CommentBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval( () => this.loadCommentsFromServer(), this.props.pollInterval);
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => this.setState({data: data}),
      error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
    });
  }

  handleCommentSubmit(comment) {
    let comments = this.state.data;
    comment.id = Date.now();

    let newComments = comments.concat([comment]);
    this.setState({data: newComments});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => this.setState({data: data}),
      error: (xhr, status, err) => {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={(e) => this.handleCommentSubmit(e)} />
      </div>
    );
  }
};
