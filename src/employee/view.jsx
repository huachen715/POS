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
			this.setState({ info: data });
		})
		.catch(error => console.log(error));
	}

	render() {
		const column = [{
			title: 'First Name',
			dataIndex: 'first_name',
			key: 'first_name',
		},{
			title: 'Last Name',
			dataIndex: 'last_name',
			key: 'last_name',
		},{
			title: 'Date of Birth',
			dataIndex: 'dob',
			key: 'dob',
		},{
			title: 'SSN',
			dataIndex: 'ssn',
			key: 'ssn',
		}]

		console.log(this.state.info);

		return(
			<div>
				<Table column={column} dataSource={this.state.info}/>
			</div>
		);
	}
}

export default View;