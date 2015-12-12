/* eslint no-console:0,react/no-multi-comp:0 */
import test from 'ava';
import sinon from 'sinon';
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

import TestUtils from 'react-addons-test-utils';
import 'babel-core/register';
import initJsDom from '../helpers/_document';
import {getName} from '../../src/utils/Service';
import Hello from '../../src/components/Hello';
import { shallow } from 'enzyme';
import {
  describeWithDOM,
  mount,
  spyLifecycle,
} from 'enzyme';

initJsDom();

// Helper component
class Container extends Component {
  render() {
    return (<Hello ref={'hello'} color={this.props.color}>....</Hello>);
  }
}


// -------------------------------------------
// Check children
// -------------------------------------------

test.serial('should work with a child', t => {
  t.doesNotThrow(() => TestUtils.renderIntoDocument(
    <Hello>
      <div>...</div>
    </Hello>
  ));
  t.end();
});


test.serial('should not be empty', t => {

  const propTypes = Hello.propTypes;
  Hello.propTypes = {};

  try {
    t.throws(() => TestUtils.renderIntoDocument(
      <Hello></Hello>
    ));
    t.end();
  } finally {
    // Restore PropTypes
    Hello.propTypes = propTypes;
  }

});


test.serial('should not support multiple children', t => {

  t.throws(() => TestUtils.renderIntoDocument(
    <Hello>
      <div></div>
      <div></div>
    </Hello>
  ));

  t.end();

});


// -------------------------------------------
// Check Properties' behaviors
// -------------------------------------------

test.serial('should apply a custom CSS class to the root DOM element', t => {
  const cls = 'pippo';
  const wrapper = shallow(<Hello cls={cls}> content </Hello>);
  t.is(wrapper.hasClass(cls), true)
  t.end();
});


test.serial('should apply a custom CSS class to the root DOM element (solution 2)', t => {
  const wrapper = shallow(<Hello cls="fake-class"> content </Hello>);
  const isClassed = wrapper.find('.fake-class').length; // if 1: css is applied
  t.is(isClassed === 1, true, 'The "cls" property is not applied or applied too many times');
  t.end();
});



test.serial('should set the "color" CSS property to the root DOM element', t => {
  const color = 'white';
  // Mount the Container wrapper
  const wrapper = mount(<Container color='white'/>);
  // Get Hello reference
  const hello = wrapper.instance().refs.hello;
  // Check if the color CSS property is applied to the root element
  t.is(ReactDOM.findDOMNode(hello).style.color, color, 'The \'color\' props has not been applied');
  t.end();
});


test.serial('should dont call "onClickButton" callback if url is NOT defined', t => {
  const myCallBack = sinon.spy();
  const wrapper = mount(<Hello onClickButton={myCallBack}>...</Hello>);
  // Simulate Click
  const button = wrapper.find('button');
  console.log ("...1>", wrapper.contains(<button />))
  t.is (button.length, 0, 'the callback has not been called')
  t.end();
});

test.serial('should call "onClickButton" callback if url is defined', t => {
  const myCallBack = sinon.spy();
  const wrapper = mount(<Hello onClickButton={myCallBack} url="http://www.xyz.fakeurl.com">...</Hello>);
  // Simulate Click
  const button = wrapper.find('button').simulate('click');
  console.log ("...2>", button.length)
  t.is (myCallBack.calledOnce, true, 'the callback has not been called')
  t.end();
});


// -------------------------------------------
// Component Lifecycle
// -------------------------------------------

test.serial('should invoke componentDidMount when component is initialized', t => {
  spyLifecycle(Hello);
  const wrapper = mount(<Hello>test</Hello>);
  // Check if componentDidMount has been called
  t.is(Hello.prototype.componentDidMount.calledOnce, true)
  t.end();
});
