import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Row, Col } from 'antd';
import 'antd/dist/antd.css';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			catalog: []
		};
		this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost:5002/menu',{ credentials: 'same-origin' })
		.then((response) => {
			if(!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			this.setState({ catalog: data['catalog'] });
		})
		.catch(error => console.log(error));
	}

	handleClose(e) {
		this.setState({ isOpen: false });
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isOpen) this.setState({ isOpen: nextProps.isOpen });
	}

	render() {

		const style = {
			height: 200
		}

		const list_item = this.state.catalog.map((item) =>
			<li>{item}</li>
		);
		// this.setState({ isOpen: this.props.isOpen })
		return (
			<div>
				<Modal
					title="Menu"
					visible={this.state.isOpen}
					onCancel={this.handleClose}
				>
					<Row>
						<Col span={8} style={style}>
							<ul>{list_item}</ul>
						</Col>
						<Col span={8} style={style}>col-2</Col>
					</Row>
				</Modal>
			</div>
		);
	}
}

Menu.propTypes = {
	isOpen: PropTypes.bool.isRequired
}

export default Menu;