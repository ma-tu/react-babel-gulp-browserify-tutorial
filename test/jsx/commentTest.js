import assert from 'power-assert';
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Comment from '../../src/jsx/comment.jsx';

function setup() {
  const component = TestUtils.renderIntoDocument(<Comment author="Paul O’Shannessy" key={1420070400000}>
      React is *great*!
    </Comment>
  )
  return {
    component: component,
    h2: TestUtils.findRenderedDOMComponentWithTag(component, 'h2'),
    span: TestUtils.findRenderedDOMComponentWithTag(component, 'span')
  }
}

describe('jsx/comment', () => {
  it('display', () => {
    const { h2, span } = setup()
    assert.equal(h2.innerHTML, "Paul O’Shannessy")
    assert.equal(span.innerHTML.trim(), "<p>React is <em>great</em>!</p>")
  })
})
