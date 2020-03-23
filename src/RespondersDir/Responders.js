/* App.js */
import React, { Component } from "react";

class Responders extends Component {
	render() {
		var responderStyle = {
       fontSize: "200px"
    }
    var responderTextStyle = {
       fontSize: "50px"
    }
		return (
    <div>
      <div>
      <i class="material-icons md-48" style={responderStyle}>face</i>
      </div>
      <div>
      <text style = {responderTextStyle}>{this.props.RESP_COUNT} Responders</text>
  		</div>
    </div>
		);
	}
}

export default Responders;
