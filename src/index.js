import React from 'react';
import ReactDOM from 'react-dom';
import InputUnit from "./InputUnit";





ReactDOM.render(
  <center>
    <InputUnit />
  </center>,
  document.getElementById('root')
);
var unitsArray = new Array();
fetch('https://setureportstorage.blob.core.windows.net/teststorage/0_ALL_UNITS.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for(var i=0; i<data.length;i++){
      unitsArray.push(data[i]["UNIT"])
    }

    var str="";
    for(var j=0; j<unitsArray.length;j++){
      str+='<option value="'+unitsArray[j]+'" />'
    }

    var myCurrentList = document.getElementById("unitInput")
    myCurrentList.innerHTML = str;
    console.log("The number of units are "+unitsArray.length)

  });




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
