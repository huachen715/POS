import React from 'react';
import { Row, Col } from 'antd';
import Table from "./table"



export default () => (
	<div>
		<Row type="flex">
			<Table name={"test1"} color={"white"} backgroundColor={"black"} width={100} height={100}/>
		</Row>
	</div>
);