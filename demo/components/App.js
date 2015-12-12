import React, { Component } from 'react';
import { Hello } from 'xyz-components';

export default class App extends Component {
  render() {
    return (
      <div>
        <Hello color="blue" url="http://www.google.com">Google</Hello>
        <Hello color="green"><span>Second</span></Hello>
        <Hello cls="mirror">Third</Hello>
      </div>
    );
  }
}
