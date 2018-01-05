import React from "react";
import PropTypes from 'prop-types';
import { Modal, message, Button, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayValue: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.input = this.input.bind(this);
		this.clear = this.clear.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	input(i) {
		this.setState({ displayValue: this.state.displayValue+i})
	}

	handleChange(event) {
		this.setState({ displayValue: event.target.value });
	}

	clear() {
		this.setState({ displayValue: "" });
	}

	handleCloseModal () {
		this.setState({ activate: false });
	}

	wrong_password() {
		return message.error('Wrong Password!');
	} 

	occupied() {
		return message.error('Access Denied!');
	}

	handleSubmit(event) {
		event.preventDefault();
		let message = { 
			password: this.state.displayValue,
			table_number: this.props.table_number
		};
		fetch("http://localhost:5002/validate", {
			method: 'POST',
			body: JSON.stringify(message),
			credentials: 'same-origin',
		}).then((response) => {
			this.setState({ displayValue: "" });
			if (response.status == 401){
				this.wrong_password();
			}
			else if (response.status == 403) {
				this.occupied();
			}
			else{
				this.props.handler();
				this.props.onSuccess();
			}
		});
	}

	render() {
		const style = {
			width: 100,
			height: 100,
			margin: 3
		};

		const input_style = {
			// font-size: 'medium',
			width: 320,
			height: 50
		};

		return (
			<div>
				<Modal
					title="Please enter your password."
					visible={this.props.activate}
					onCancel={this.props.handler}
					footer={null}
				>
					<Row>
						<Col offset={4}>
							<form onSubmit={this.handleSubmit}>
								<Input style={input_style} type="text" onChange={this.handleChange} value={this.state.displayValue} />
							</form>
						</Col>
					</Row>
					<Row>
						<Col offset={4}>
							<Row>
								<Button type="primary" onClick={() => this.input('1')} style={style}>1</Button>
								<Button type="primary" onClick={() => this.input('2')} style={style}>2</Button>
								<Button type="primary" onClick={() => this.input('3')} style={style}>3</Button>
							</Row>
							<Row>
								<Button type="primary" onClick={() => this.input('4')} style={style}>4</Button>
								<Button type="primary" onClick={() => this.input('5')} style={style}>5</Button>
								<Button type="primary" onClick={() => this.input('6')} style={style}>6</Button>
							</Row>
							<Row>
								<Button type="primary" onClick={() => this.input('7')} style={style}>7</Button>
								<Button type="primary" onClick={() => this.input('8')} style={style}>8</Button>
								<Button type="primary" onClick={() => this.input('9')} style={style}>9</Button>
							</Row>
							<Row>
								<Button type="primary" onClick={this.clear} style={style}>Clear</Button>
								<Button type="primary" onClick={() => this.input('0')} style={style}>0</Button>
								<Button type="primary" onClick={this.handleSubmit} style={style}>Enter</Button>
							</Row>
						</Col>
					</Row>
				</Modal>
			</div>
		);
	}
}

Login.propTypes = {
	activate: PropTypes.bool.isRequired,
	table_number: PropTypes.number,
	handler: PropTypes.func,
	onSuccess: PropTypes.func
}

export default Login;