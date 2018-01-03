import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Button } from 'antd';
import 'antd/dist/antd.css';
import OrderDisplay from './orderDisplay';

const style = {
	verticalAlign: 'top',
	justifyContent: 'center',
	whiteSpace: "pre-line",
	fontSize: 14,
	width: 120,
	height: 100,
	margin: 2
};

const content_style = {
	backgroundColor: 'white'
}
const { Content, Sider } = Layout;

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
			<div>
				<Layout>
					<Content style={content_style}>
					<Row>{result}</Row>
					</Content>
					<Sider width={500} style={content_style}>
						<OrderDisplay item={this.props.ordered_items} />
						<Button type="primary" onClick={this.props.handleCancel}>Cancel items</Button>
					</Sider>
				</Layout>
			</div>
		);
	}
}

MenuItems.propTypes = {
	ordered_items: PropTypes.array.isRequired,
	url: PropTypes.string.isRequired,
	addItem: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired
}

export default MenuItems;