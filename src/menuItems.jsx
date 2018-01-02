import React from 'react';
import PropTypes from 'prop-types';
import { Row, Button } from 'antd';
import 'antd/dist/antd.css';

const style = {
	verticalAlign: 'top',
	justifyContent: 'center',
	whiteSpace: "pre-line",
	fontSize: 14,
	width: 120,
	height: 100,
	margin: 2
};

class MenuItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: {}
		};
	}

	componentDidMount() {
		fetch(this.props.url, { credentials: 'same-origin' })
		.then((response) => {
			if(!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			this.setState({ items: data });
		})
		.catch(error => console.log(error));
	}

	render() {
		let result = [];
		for (let key in this.state.items) {
			// let item = {name: key, price: this.state.items[key]}
			result.push(<Button type='primary' style={style} onClick={() => this.props.addItem({name: key, price: this.state.items[key]})}>{key}</Button>);
		}
		// console.log(result);
		return (
			<div><Row>{result}</Row></div>
		);
	}
}

MenuItems.propTypes = {
	url: PropTypes.string.isRequired,
	addItem: PropTypes.func.isRequired
}

export default MenuItems;