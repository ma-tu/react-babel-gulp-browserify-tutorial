import assert from 'power-assert';
import { createStore } from 'redux'

function testReducer(state=0, action){
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'SET-VALUE':
      return action.value
    default:
      return state
  }
}

function decrementActionCreator(){
  return {
    type: 'DECREMENT'
  }
}

function setValueActionCreator(value){
  //use Object Literal Extensions
  return {
    type: 'SET-VALUE',
    value
  }
}

const store = createStore(testReducer)

describe('redux simple test', () => {
  it('increment: simple', () => {
    store.dispatch({ type: 'INCREMENT'})
    assert(store.getState() === 1)
  });

  it('decrement: use actionCreatorFunction', () => {
    store.dispatch(decrementActionCreator())
    assert(store.getState() === -1)
  })

  it('set value: action value', () => {
    store.dispatch(setValueActionCreator(5))
    assert(store.getState() === 5)
  })

  it('subscribe & unsubscribe', () => {
    let actionCounter = 0

    const unsubscribe = store.subscribe(() => {
      actionCounter = actionCounter + 1
    })

    store.dispatch({ type: 'INCREMENT'})
    unsubscribe()

    assert(actionCounter === 1)
  });

  beforeEach(function(done) {
    store.dispatch(setValueActionCreator(0))
    done();
  });

});
