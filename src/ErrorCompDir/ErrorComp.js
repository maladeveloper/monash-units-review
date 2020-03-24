import React, { Component } from "react";

class ErrorComp extends Component {

  render() {

    return (
      <div class="alert alert-danger">
        <h1><strong>Sorry!</strong> {this.props.unit} has not been added to the database yet or is an invalid unit :(</h1>
      </div>

    );
  }

}

export default ErrorComp;
