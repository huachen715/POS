import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Keyboard from './keyboard';
import { Button,Col } from 'antd';
import 'antd/dist/antd.css';

class Table extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activate: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal () {
		this.setState({ activate: true });
	}

	handleCloseModal () {
		this.setState({ activate: false });
	}

	render() {
		const button_styles = {
			width: this.props.width,
			height: this.props.height,
			color: this.props.color,
			backgroundColor: this.props.backgroundColor
		};
		const styles = {
			width: 50,
			height: 50,
			color: "black",
			backgroundColor: "red"
		};
		return (
			<div>
				<button onClick={this.handleOpenModal} style={button_styles}>open!</button>
				<ReactModal
					isOpen={this.state.activate}
				>
					<Col offset={13}>
					<Button style = {styles} type = "danger" onClick={this.handleCloseModal}>X</Button>
					</Col>
					<Keyboard />

				</ReactModal>
			</div>
		);
	}
}

Table.propTypes = {
	name: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	backgroundColor: PropTypes.string.isRequired,
}

export default Table;