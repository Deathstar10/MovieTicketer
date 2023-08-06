"use client";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Aravind",
    };

    // this.changeName = this.changeName.bind(this);
  }

  changeName = () => {
    this.setState({ name: "bablu" });
  };
  render(): React.ReactNode {
    return (
      <>
        <p>Hello World {this.state.name}</p>
        <button onClick={this.changeName}>Click me</button>
      </>
    );
  }
}
