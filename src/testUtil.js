import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './Reducers/reducer';


export const storeFactory = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}

export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }

export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(
      component.propTypes,
      conformingProps,
      'prop',
      component.name);
    expect(propError).toBeUndefined();
  }