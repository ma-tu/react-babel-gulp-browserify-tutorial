import React from 'react'
import $      from 'jquery';
import CommentList from './commentList.jsx';
import CommentForm from './commentForm.jsx';

export default class CommentBox extends React.Component{
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval( () => this.loadCommentsFromServer(), this.props.pollInterval);
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.props.setComments(data)
      },
      error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
    });
  }

  handleCommentSubmit(comment) {
    let comments = this.props.comments;
    comment.id = Date.now();

    let newComments = comments.concat([comment]);
    this.props.setComments(newComments)

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.props.setComments(data)
      },
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
        <CommentList data={this.props.comments} />
        <CommentForm onCommentSubmit={(e) => this.handleCommentSubmit(e)} />
      </div>
    );
  }
};
