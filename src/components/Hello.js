import React, { Component, PropTypes } from 'react';
// import ReactDOM from 'react-dom';

export default class Hello extends Component {

  componentDidMount() {
    // console.log (ReactDOM.findDOMNode(this))
  }

  onClickButton() {
    window.open(this.props.url);
    this.props.onClickButton();
  }

  /**
   * Component cannot be empty or have multiple children
   */
  childrenValidation() {
    const isChildren = Array.isArray(this.props.children);
    if (isChildren) {
      throw new Error('<Hello> component doen not support multiple children');
    } else if (!this.props.children) {
      throw new Error('<Hello> component cannot ben empty');
    }
  }

  renderLinkButton() {
    return (this.props.url) ? <button onClick={() => this.onClickButton()}>Visit Website</button> : null;
  }

  render() {
    const {cls, color, children} = this.props;
    this.childrenValidation();

    return (
      <div className={cls} style={{color: color}}>
        {children}
        {this.renderLinkButton()}
      </div>
    );
  }
}


Hello.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string,
  cls: PropTypes.string,
  children: PropTypes.any.isRequired,
  onClickButton: PropTypes.func,
};

Hello.defaultProps = {
  color: 'red',
  url: null,
  onClickButton() {},
};
