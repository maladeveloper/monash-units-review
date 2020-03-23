import React, { Component } from "react";
import Graph from "./GraphDir/Graph.js"
import Responders from "./RespondersDir./Responders.js"

var xhr;
var counter=0;
class Base extends Component {
  constructor(props) {
  super(props);
  this.state= ({
    unit: 0,
    S_AGG:{
      Value: 0,
      Count: 0,
      Percentage: 0,
    },
    AGG:{
      Value: 0,
      Count: 0,
      Percentage: 0,
    },
    NEU:{
      Value: 0,
      Count: 0,
      Percentage: 0,
    },
    DIS:{
      Value: 0,
      Count: 0,
      Percentage: 0,
    },
    S_DIS:{
      Value: 0,
      Count: 0,
      Percentage: 0,
    },
    RESP_COUNT:0,
    MEAN:0,
    MEDIAN:0
  });
  this.processRequest = this.processRequest.bind(this);
  this.startProcess = this.startProcess.bind(this);
  this.startProcess(this.props)

}

startProcess(props){
  console.log(props)
  xhr = new XMLHttpRequest();
  console.log("https://setureportstorage.blob.core.windows.net/setureports/"+props.unit+".json")
  xhr.open("GET", "https://setureportstorage.blob.core.windows.net/setureports/"+props.unit+".json", true);
  xhr.send();
  xhr.addEventListener("readystatechange", this.processRequest, false);

}

componentWillReceiveProps(nextProps){
  counter++
  console.log(counter)
  this.startProcess(nextProps);
}



processRequest() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    this.setState({
      unit: response.UNIT,
      S_AGG:{
        Value: parseInt(response.S_AGG.Value),
        Count: parseInt(response.S_AGG.Count),
        Percentage: parseInt(response.S_AGG.Percentage.slice(0,5)),
      },
      AGG:{
        Value: parseInt(response.AGG.Value),
        Count: parseInt(response.AGG.Count),
        Percentage: parseInt(response.AGG.Percentage.slice(0,5)),
      },
      NEU:{
        Value: parseInt(response.NEU.Value),
        Count: parseInt(response.NEU.Count),
        Percentage: parseInt(response.NEU.Percentage.slice(0,5)),
      },
      DIS:{
        Value: parseInt(response.DIS.Value),
        Count: parseInt(response.DIS.Count),
        Percentage: parseInt(response.DIS.Percentage.slice(0,5)),
      },
      S_DIS:{
        Value: parseInt(response.S_DIS.Value),
        Count: parseInt(response.S_DIS.Count),
        Percentage: parseInt(response.S_DIS.Percentage.slice(0,5)),
      },
      RESP_COUNT:parseFloat(response.RESP_COUNT[0]),
      MEAN:parseFloat(response.MEAN[0]),
      MEDIAN:parseFloat(response.MEDIAN[0])
    });
  }

  console.log(this.state)

}

  render() {

    return (
      <div >
        <h1>{this.props.unit} Overall Satisfaction</h1>
        <br />
        <div><Graph {...this.state}/></div>
        <br />
        <div><center><Responders {...this.state} /></center></div>

      </div>
    );
  }
}

export default Base;
