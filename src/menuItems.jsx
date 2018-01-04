import React from 'react';
import PropTypes from 'prop-types';
import { Table, Layout, Row, Button } from 'antd';
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

const content_style = {
	backgroundColor: 'white'
}
const { Content, Sider } = Layout;

class MenuItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: {},
			ordered_items: []
		};
		this.addItem = this.addItem.bind(this);
		this.cancelAll = this.cancelAll.bind(this);
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

	addItem(item) {
		this.setState({ ordered_items: this.state.ordered_items.concat(item) });
	}

	cancelAll() {
		this.setState({ ordered_items: [] });
	}

	render() {
		let result = [];
		for (let key in this.state.items) {
			// let item = {name: key, price: this.state.items[key]}
			result.push(<Button type='primary' style={style} onClick={() => this.addItem({name: key, price: this.state.items[key]})}>{key}</Button>);
		}

		const columns = [{
		  title: 'Name',
		  dataIndex: 'name',
		}, {
		  title: 'Price',
		  dataIndex: 'price',
		}, {
		   title: '',
		   dataIndex: 'action' ,
		}];

		const table_entry = this.state.ordered_items.map((item) => 
			({
				name: item['name'],
				price: item['price'],
				action: <Button type='danger'>Delete</Button>
			})
		)

		// console.log(result);
		return (
			<div>
				<Layout>
					<Content style={content_style}>
					<Row>{result}</Row>
					</Content>
					<Sider width={500} style={content_style}>
						<Table columns={columns} dataSource={table_entry} />
						<Button type="primary" onClick={this.cancelAll}>Cancel All</Button>
					</Sider>
				</Layout>
			</div>
		);
	}
}

MenuItems.propTypes = {
	url: PropTypes.string.isRequired
}

export default MenuItems;