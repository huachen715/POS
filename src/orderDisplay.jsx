import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

class OrderDisplay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: [],
		};
	}

	componentWillReceiveProps(nextProps) {
	  if (nextProps.item !== this.state.item) {
	    this.setState({ item: nextProps.item });
	  }
	}

	render() {

		const columns = [{
		  title: 'Name',
		  dataIndex: 'name',
		}, {
		  title: 'Price',
		  dataIndex: 'price',
		}, {
		   title: 'Action',
		   dataIndex: 'action',
		}];

		// const data = [{
		// 	name: "test1",
		// 	price: "1",
		// 	action: <button>test1</button>
		// }]

		return (
			<div>
				 <Table columns={columns} dataSource={this.state.item} />
			</div>
		)
	}
}

OrderDisplay.propTypes = {
	item: PropTypes.array.isRequired
}

export default OrderDisplay;