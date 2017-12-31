import React from 'react';
import PropTypes from 'prop-types';
import { Row, Button } from 'antd';
import 'antd/dist/antd.css';

const style = {
	whiteSpace: "pre-line",
	fontSize: 28,
	width: 150,
	height: 100,
	margin: 4
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
			console.log(key);
			result.push(<Button type='primary' style={style}>{key}</Button>);
		}
		// console.log(result);
		return (
			<div><Row>{result}</Row></div>
		);
	}
}

MenuItems.propTypes = {
	url: PropTypes.string.isRequired
}

export default MenuItems;