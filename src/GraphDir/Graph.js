/* App.js */

import CanvasJSReact from './canvasjs.react';
var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: false,
			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: "Judgement of "+ this.props.unit
			},
      axisY: {

            tickColor: "azure",
            titleFontColor: "rgb(0,75,141)",
            suffix: "%",
            interval: 10
          },
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: [
					{label: "Very Good", y: this.props.S_AGG.Percentage },
					{label: "Good", y: this.props.AGG.Percentage },
					{label: "Neutral", y: this.props.NEU.Percentage },
					{label: "Bad", y: this.props.DIS.Percentage },
          { label: "Very Bad", y: this.props.S_DIS.Percentage }

				]
			}]
		}

		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default Graph;
