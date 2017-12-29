import React from 'react';

// var ReactGridLayout = require('react-grid-layout');

import ReactGridLayout from 'react-grid-layout';

var layout = [
  {i: 'a', x: 0, y: 0, w: 3, h: 2, static: true},
  {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
  {i: 'c', x: 4, y: 0, w: 3, h: 2}
];

var styles = {
	width: 100,
	height: 100,
	color: "red",
	backgroundColor: "black"
};

export default () => (
	<div>
		<ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200} verticalCompact={false}>
	        <div key="a"><button style = {styles}> A </button></div>
	        <div key="b"><button style = {styles}> B </button></div>
	        <div key="c"><button style = {styles}> C </button></div>
	    </ReactGridLayout>
	</div>
);