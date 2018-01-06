import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

class View extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: []
		};
	}

	componentDidMount() {
		fetch('http://localhost:5002/employee',{ credentials: 'same-origin' })
		.then((response) => {
			if(!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			console.log(data);
			this.setState({ info: data });
		})
		.catch(error => console.log(error));
	}

	render() {
		// const column = [{
		// 	title: 'First Name',
		// 	dataIndex: 'first_name',
		// 	key: 'first_name',
		// },{
		// 	title: 'Last Name',
		// 	dataIndex: 'last_name',
		// 	key: 'last_name',
		// },{
		// 	title: 'Date of Birth',
		// 	dataIndex: 'dob',
		// 	key: 'dob',
		// },{
		// 	title: 'SSN',
		// 	dataIndex: 'ssn',
		// 	key: 'ssn',
		// }]

		// // console.log(this.state.info);
		// const render_data = this.state.info.map((row, index) => ({
		// 	dob: row.dob,
		// 	first_name: row.first_name,
		// 	last_name: row.last_name,
		// 	key: index,
		// 	ssn: row.ssn
		// }));
		const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];


		// console.log(render_data);

		return(
			<div>
				<Table column={columns} dataSource={data} />
			</div>
		);
	}
}

export default View;