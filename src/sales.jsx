import React from "react";
import PropTypes from 'prop-types';
import {Crosshair, XAxis, YAxis, XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines} from 'react-vis';
import 'react-vis/dist/style.css';

const DATA = [
[
	{x: 1, y: ((Math.random() * 10000) + 10000) },
	{x: 2, y: ((Math.random() * 10000) + 10000) },
	{x: 3, y: ((Math.random() * 10000) + 10000) },
	{x: 4, y: ((Math.random() * 10000) + 10000) },
	{x: 5, y: ((Math.random() * 10000) + 10000) },
	{x: 6, y: ((Math.random() * 10000) + 10000) },
	{x: 7, y: ((Math.random() * 10000) + 10000) },
	{x: 8, y: ((Math.random() * 10000) + 10000) },
	{x: 9, y: ((Math.random() * 10000) + 10000) },
	{x: 10, y: ((Math.random() * 10000) + 10000) },
	{x: 11, y: ((Math.random() * 10000) + 10000) },
	{x: 12, y: ((Math.random() * 10000) + 10000) }
	]
];

class Sales extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      crosshairValues: []
    };
  }

  render() {
    return (
      <XYPlot
        onMouseLeave={() => this.setState({crosshairValues: []})}
        width={500}
        height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          onNearestX={(value, {index}) =>
              this.setState({crosshairValues: DATA.map(d => d[index])})}
          data={DATA[0]}/>
        <Crosshair values={this.state.crosshairValues}/>
      </XYPlot>
    );
  }
}

export default Sales;