import assert from 'power-assert';
import React from 'react'
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils'
import configureStore from '../../src/store/reduxStore';
import MockApp from '../testUtil/MockApp';
import CommentList from '../../src/jsx/commentList.jsx';
import * as commentActions from '../../src/actions/commentAction';
import * as commentUtil from '../testUtil/commentUtil'


function setup() {
  const store = configureStore();
  store.dispatch(commentActions.addComment(commentUtil.getPaulComment()))

  const component = TestUtils.renderIntoDocument(
    <Provider store={store}>
      <MockApp />
    </Provider>
  )
  return {
    component: component,
    h2: TestUtils.findRenderedDOMComponentWithTag(component, 'h2'),
    span: TestUtils.findRenderedDOMComponentWithTag(component, 'span'),
    inputs: TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
  }
}

describe('container/App', () => {
  it('display', () => {
    const { h2, span } = setup()
    assert.equal(h2.innerHTML, "Paul O’Shannessy")
    assert.equal(span.innerHTML.trim(), "<p>React is <em>great</em>!</p>")
  })

  it('append comment', () => {
    const { component, inputs } = setup()
    TestUtils.Simulate.change(inputs[0], {target: {value: 'Test Author'}});
    TestUtils.Simulate.change(inputs[1], {target: {value: 'Test **Text**'}});
    TestUtils.Simulate.submit(inputs[2]);

    const h2List = TestUtils.scryRenderedDOMComponentsWithTag(component, 'h2')
    assert.deepEqual(h2List.map((item) => item.innerHTML), [ 'Paul O’Shannessy', 'Test Author' ])

    const spanList = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span')
    assert.deepEqual(spanList.map((item) => item.innerHTML.trim()), [ '<p>React is <em>great</em>!</p>','<p>Test <strong>Text</strong></p>' ])
  })
})
