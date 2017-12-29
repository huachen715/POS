import React from 'react';
import ReactModal from 'react-modal';
// import PropTypes from 'prop-types';

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
		// let styles = {
		// 	width: this.props.width,
		// 	height: this.props.height,
		// 	color: this.props.color,
		// 	backgroundColor: this.props.backgroundColor
		// };

		return (
			<div>
				<button onClick={this.handleOpenModal}>open!</button>
				<ReactModal
					isOpen={this.state.activate}
					contentLabel="Minimal Modal Example"
				>
					<button onClick={this.handleCloseModal}>Close</button>
					<p>I'm opened!</p>
				</ReactModal>
			</div>
		);
	}
}

// Table.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	width: PropTypes.integer.isRequired,
// 	height: PropTypes.integer.isRequired,
// 	color: PropTypes.string.isRequired,
// 	backgroundColor: PropTypes.string.isRequired,
// }

export default Table;