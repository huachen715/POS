import React from 'react';
import { Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';

// const Table = props => <p className={`height-${props.value}`}>{props.childrem}</p>;


export default () => (
	<div>
		<Row type='flex' justify='space-between' align = 'bottom'>
			<Col span={100} push={4}>1</Col>
			<Col span={4}><Button type='primary' size='large'>Table1</Button></Col>
			<Col span={4}><Button type='primary' size='large'>Table1</Button></Col>
			<Col span={4}><Button type='primary' size='large'>Table1</Button></Col>
		</Row>
	</div>
);