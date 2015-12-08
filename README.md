# React-PubSub

---

This boilerplate is a starting point to test most of the features and DOM behaviors of a React component.
It uses [AVA](https://github.com/sindresorhus/ava), [Airbnb Enzyne](https://github.com/airbnb/enzyme), [JSDOM](https://github.com/tmpvar/jsdom), react-addons-test-utils and many other tools (see `package.json` for the whole list).


Based on (library-boilerplate)[https://github.com/gaearon/library-boilerplate] by Dan Abramov
## Run the demo

1. Go to `./demo` folder
2. `npm install`
3. `npm start`

## Run Test

1. Go the project root folder
2. `npm install`
3. `npm run test`

## Lint
1. Go the project root folder
2. `npm run lint`


# BOILERPLATE OVERVIEW

## `</Hello>` component

Following code represents the `Hello` React component we would like to test:

```javascript
import React, { Component, PropTypes, Children } from 'react';
import ReactDOM from 'react-dom';
export default class Hello extends Component {

  componentDidMount() {
    // console.log ('do nothing');
  }

  doSomething = () => {
    console.log ('doSomething');
    this.props.onDoSomething();
  }

  checkRender = () => {
    const isChildren = Array.isArray(this.props.children);
    if (isChildren) {
      throw('<Hello> component doen not support multiple children')
    } else if (!this.props.children){
      throw('<Hello> component cannot ben empty')
    }
  }

  render() {
    const {cls, color, children} = this.props;
    this.checkRender();

    return (
      <div className={cls} style={{color: color}}>
        {children}
        <button onClick={this.doSomething}>Visit Website</button>
      </div>
    );
  }
}


Hello.propTypes = {
  color: PropTypes.string,
  cls: PropTypes.string,
  children: PropTypes.any.isRequired,
  onDoSomething: PropTypes.func,
};

Hello.defaultProps = {
  color: 'red',
  onDoSomething() {},
}

```


## GOALS

## Test the following behaviors:

### children

Test if the `Hello` component works fine with a child:

```javascript
test.serial('should work with a child', t => {
  t.doesNotThrow(() => TestUtils.renderIntoDocument(
    <Hello>
      <div>...</div>
    </Hello>
  ));
  t.end();
});
```

Test if `Hello` properly return an exception when it has not children:

```javascript
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

```


Test if `Hello` properly return an exception when it has multiple children

```javascript

test.serial('should not support multiple children', t => {

  t.throws(() => TestUtils.renderIntoDocument(
    <Hello>
      <div></div>
      <div></div>
    </Hello>
  ));

  t.end();

});
```

### properties

Test if a CSS class is applied to the root DOM element:

```javascript
test.serial('should apply a custom CSS class to the root DOM element', t => {
  const cls = 'pippo';
  const wrapper = shallow(<Hello cls={cls}> content </Hello>);
  t.is(wrapper.hasClass(cls), true)
  t.end();
});
```


Inline Styling: check if a CSS property has been set

```javascript

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
```


Simulate click button and callbacks

```javascript
test.serial('support "onDoSomething" callback', t => {
  const myCallBack = sinon.spy();
  const wrapper = mount(<Hello onDoSomething={myCallBack}>...</Hello>);
  // Simulate Click
  wrapper.find('button').simulate('click');
  t.is (myCallBack.calledOnce, true, 'the callback has not been called')
  t.end();
});
```

### Component lifecycle


Test if `componentDidMount` has been called

```javascript
test.serial('should invoke componentDidMount when component is initialized', t => {
  spyLifecycle(Hello);
  const wrapper = mount(<Hello>test</Hello>);
  t.is(Hello.prototype.componentDidMount.calledOnce, true)
  t.end();
});
```

# ROADMAP

* Add more tests
* Add tests for ES6 modules
* Create tests for components that are using 3rd party libraries (i.e. jQueryUI, GSAP Tweenmax, ...)

# Documentation

More info coming soon...

# License

MIT
