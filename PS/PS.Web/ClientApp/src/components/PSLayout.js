import React, { Component } from 'react';
import { NavMenu } from './NavMenu/NavMenu.js';


export class PSLayout extends Component {
  static displayName = PSLayout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <div className='ps-layout-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
