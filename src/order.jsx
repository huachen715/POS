import React from 'react';
import { Row, Col } from 'antd';
import Table from "./table"



export default () => (
	<div>
		<Row type="flex">
			<Table name={"Table 1"} color={"white"} backgroundColor={"DodgerBlue"} width={100} height={100} number={1} />
			<Table name={"Table 2"} color={"white"} backgroundColor={"DodgerBlue"} width={100} height={100} number={2} />
		</Row>
	</div>
);