import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

class OrderDisplay extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {

		const columns = [{
		  title: 'Name',
		  dataIndex: 'name',
		}, {
		  title: 'Price',
		  dataIndex: 'price',
		}];

		return (
			<div>
				 <Table columns={columns} dataSource={this.props.item} />
			</div>
		)
	}
}

OrderDisplay.propTypes = {
	item: PropTypes.array.isRequired
}

export default OrderDisplay;