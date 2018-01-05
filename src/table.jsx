import React from 'react';
import PropTypes from 'prop-types';
import Login from './login';
import { Modal, Button, Col } from 'antd';
import Menu from './menu';
import 'antd/dist/antd.css';

class Table extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activate: false,
			openMenu: false,
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handler = this.handler.bind(this);
		this.openMenu = this.openMenu.bind(this);
	}

	handleOpenModal () {
		this.setState({ activate: true });
	}

	handler(e) {
		// e.preventDefault();
		this.setState({ activate: false });
	}

	openMenu() {
		this.setState({ openMenu: true });
		// work round
		this.setState({ openMenu: false });
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
				<Login handler={this.handler} table_number={this.props.number} activate={this.state.activate} onSuccess={this.openMenu}/>
				<Menu isOpen={this.state.openMenu} table_number={this.props.number} />
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