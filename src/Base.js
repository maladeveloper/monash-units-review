import React, { Component } from "react";
import Graph from "./GraphDir/Graph.js"
import Responders from "./RespondersDir/Responders.js"
import ReactStoreIndicator from 'react-score-indicator'
import ErrorComp from './ErrorCompDir/ErrorComp.js'

var xhr;
var counter=0;
class Base extends Component {
  constructor(props) {
  super(props);
  this.state= ({
    isValid: true,
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
  xhr.open("GET", "https://setureportstorage.blob.core.windows.net/teststorage/0_ALL_UNITS.json", true);
  xhr.send();
  xhr.addEventListener("readystatechange", this.processRequest, false);

}

componentWillReceiveProps(nextProps){
  counter++
  console.log(counter)
  this.startProcess(nextProps);
}



processRequest() {
  var isMyValid = false
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    for(var i=0; i<response.length;i++){
      console.log(response[i]["UNIT"])
      console.log(this.props.unit)
      if(this.props.unit == response[i]["UNIT"]){
                    isMyValid = true
                    this.setState({
                      unit: response[i].UNIT,
                      S_AGG:{
                        Value: parseInt(response[i].S_AGG.Value),
                        Count: parseInt(response[i].S_AGG.Count),
                        Percentage: parseInt(response[i].S_AGG.Percentage.slice(0,5)),
                      },
                      AGG:{
                        Value: parseInt(response[i].AGG.Value),
                        Count: parseInt(response[i].AGG.Count),
                        Percentage: parseInt(response[i].AGG.Percentage.slice(0,5)),
                      },
                      NEU:{
                        Value: parseInt(response[i].NEU.Value),
                        Count: parseInt(response[i].NEU.Count),
                        Percentage: parseInt(response[i].NEU.Percentage.slice(0,5)),
                      },
                      DIS:{
                        Value: parseInt(response[i].DIS.Value),
                        Count: parseInt(response[i].DIS.Count),
                        Percentage: parseInt(response[i].DIS.Percentage.slice(0,5)),
                      },
                      S_DIS:{
                        Value: parseInt(response[i].S_DIS.Value),
                        Count: parseInt(response[i].S_DIS.Count),
                        Percentage: parseInt(response[i].S_DIS.Percentage.slice(0,5)),
                      },
                      RESP_COUNT:parseFloat(response[i].RESP_COUNT[0]),
                      MEAN:parseFloat(response[i].MEAN[0]),
                      MEDIAN:parseFloat(response[i].MEDIAN[0])
                    });
                    break;
          }
          else {
            isMyValid = false
          }
    }
  }
  this.setState({
    isValid: isMyValid
  })
  console.log(this.state)

}

  render() {
    const isFinalValid = this.state.isValid;
    return (
      <div >
      {isFinalValid ? (
        <div>
            <h1>{this.props.unit} Overall Satisfaction</h1>
            <br />
            <ReactStoreIndicator value={this.state.MEDIAN} maxValue={5}/>
            <br />
            <div><Graph {...this.state}/></div>
            <br />
            <div><center><Responders {...this.state} /></center></div>
        </div>
      ) :(
        <div>
         <ErrorComp unit={this.props.unit} />
        </div>
      )
      }
      </div>
    );
  }
}

export default Base;
