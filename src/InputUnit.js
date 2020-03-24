import React, { Component } from "react";
import Base from "./Base";
import ReactDOM from 'react-dom';

class InputUnit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unit: ""
    };

    this.unitValue = this.unitValue.bind(this);
    this.setFinalUnitValue = this.setFinalUnitValue.bind(this);
  }

  unitValue(e) {
  this.setState({
    unit: e.target.value.toUpperCase()
  });
}

setFinalUnitValue(e) {
  this._input.focus();
  this._input.value = "";
  e.preventDefault();
  //Now render the Graph
  ReactDOM.render(
      <div><Base {...this.state}/></div>
    ,
    document.getElementById('graph')
  );

}

  render() {
    var inputStyle = {
       fontSize: "35px"
    }
    var buttonStyle ={

    }
    return (
      <form  onSubmit={this.setFinalUnitValue}>
        <input  style={inputStyle} onChange={this.unitValue}
        ref = {(el) => this._input = el}
          placeholder="Enter Monash Unit Code"></input>
        <button style={inputStyle} type="submit">GO</button>
      </form>
    );
  }
}

export default InputUnit;
