import React from 'react';
import PropTypes from 'prop-types';
import Login from './login';
import { Modal, Button, Col } from 'antd';
import 'antd/dist/antd.css';

class Table extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activate: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handler = this.handler.bind(this);
	}

	handleOpenModal () {
		this.setState({ activate: true });
	}

	handleCloseModal () {
		this.setState({ activate: false });
	}

	handler(e) {
		// e.preventDefault();
		this.setState( {activate: false });
	}

	render() {
		const button_styles = {
			width: 100,
			height: 100,
			margin: 3
		};

		const styles = {
			width: 50,
			height: 50,
			color: "black",
			backgroundColor: "red"
		};
		return (
			<div>
				<Button type="primary" onClick={this.handleOpenModal} icon="laptop" style={button_styles}>Table 1</Button>
				<Modal
					title="Please enter your password."
					visible={this.state.activate}
					onCancel={this.handleCloseModal}
					footer={null}
				>
					<Login handler={this.handler} table_number={this.props.number} />
				</Modal>
			</div>
		);
	}
}

Table.propTypes = {
	number: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	backgroundColor: PropTypes.string.isRequired,
}

export default Table;