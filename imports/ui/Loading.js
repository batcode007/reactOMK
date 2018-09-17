import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
 
export default class Loading extends Component {

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container">LOADING</span>;
  }
}