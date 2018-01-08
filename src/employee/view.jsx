import React from 'react';
import { List, Button, Modal, Divider, Card } from 'antd';
import 'antd/dist/antd.css';
import Edit from './register';

class View extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: [],
			openEdit: false,
			current_value: {}
		};
	}

	componentDidMount() {
		fetch('http://localhost:5002/employee',{ credentials: 'same-origin' })
		.then((response) => {
			if(!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			// console.log(data);
			this.setState({ info: data });
		})
		.catch(error => console.log(error));
	}

	handleEdit = (item) => {
		this.setState({ current_value: item });
		this.setState({ openEdit: true });
	}

	handleCancel = () => {
		this.setState({ openEdit: false });
	}

	delete_arr = (arr, key) => {
		return arr.filter(e => e.password !== key);
	}

	handleDelete = (item) => {
		// let message = {password: item.password};
		fetch('http://localhost:5002/delete_employee', {
          method: 'POST',
          body: JSON.stringify({password: item.password}),
          credentials: 'same-origin',
        }).then((response) => {
          if(!response.ok) {
            throw Error(response.statusText);
          }
        }).catch(error => {console.log(error)});
        this.setState({ info: this.delete_arr(this.state.info, item.password) });
	}

	render() {

		return(
			<div style={{margin: 'auto', width: 600}}>
				<List
				    itemLayout="horizontal"
				    dataSource={this.state.info}
				    renderItem={item => (
				      <List.Item>
				        <List.Item.Meta
				          title={`${item.first_name} ${item.last_name}`}
				          description={
				          	<div>
				          		Date of Birth: {item.dob}<br />
				          		Password: {item.password}<br />
				          		SSN: {item.ssn}
				          	</div>
				          }
				        />
				        <Button type='primary' onClick={() => this.handleEdit(item)}>Edit</Button>
				        <Divider type="vertical" />
				        <Button type='danger' onClick={() => this.handleDelete(item)}>Delete</Button>
				      </List.Item>
				    )}
				/>
				<Modal
		          title="Edit profile"
		          visible={this.state.openEdit}
		          onCancel={this.handleCancel}
		          footer={<Button type="primary" onClick={this.handleCancel}>Cancel</Button>}
		        >
		        	<Edit button_name="register" default_value={this.state.current_value}/>
		        </Modal>
			</div>
		);
	}
}



export default View;