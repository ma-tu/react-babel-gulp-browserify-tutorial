import assert from 'power-assert';
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import CommentList from '../../src/jsx/commentList.jsx';
import * as commentUtil from '../testUtil/commentUtil'

function setup() {
  const comments = [commentUtil.getPaulComment()]
  const component = TestUtils.renderIntoDocument(<CommentList data={comments} />)
  return {
    component: component,
    h2: TestUtils.findRenderedDOMComponentWithTag(component, 'h2'),
    span: TestUtils.findRenderedDOMComponentWithTag(component, 'span')
  }
}

describe('jsx/commentList', () => {
  it('display', () => {
    const { h2, span } = setup()
    assert.equal(h2.innerHTML, "Paul O’Shannessy")
    assert.equal(span.innerHTML.trim(), "<p>React is <em>great</em>!</p>")
  })
})
