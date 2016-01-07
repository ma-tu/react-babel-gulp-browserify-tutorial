import React from 'react'

export default class CommentForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {author: '', text: ''};
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  }

  render() {
    return (
      <form className="commentForm" onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={(e) => this.handleAuthorChange(e)}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={(e) => this.handleTextChange(e)}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
};
