import React, { Component } from 'react';
import { NavMenu } from './NavMenu/NavMenu.js';


export class PSLayout extends Component {
  static displayName = PSLayout.name;

  render() {
    return (
      <div>
        <div className='ps-layout'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
