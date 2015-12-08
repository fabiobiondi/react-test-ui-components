import React, { Component, PropTypes, Children } from 'react';
import ReactDOM from 'react-dom';

export default class Hello extends Component {

  componentDidMount() {
    //console.log (ReactDOM.findDOMNode(this))
  }

  doSomething = () => {
    this.props.onDoSomething();
  }

  /**
   * Component cannot be empty or have multiple children
   */
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
