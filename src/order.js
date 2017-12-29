import React from 'react';
import { Row, Col } from 'antd';


var styles = {
	width: 100,
	height: 100,
	color: 'white',
	backgroundColor: 'blue'
};

export default () => (
	<div>
	<Row type="flex">
		<button style= {styles}> test </button>
	</Row>
	<Row type="flex">
		<button style= {styles}> test </button>
	</Row>
	<Row type="flex" justify="center">
		<button style= {styles}> test </button>
	</Row>
	</div>
);