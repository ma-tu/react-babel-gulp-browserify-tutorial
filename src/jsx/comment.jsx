import React from 'react'
import marked from 'marked';

export default class Comment extends React.Component{
  rawMarkup() {
    let rawMarkupHtml = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkupHtml };
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
};
