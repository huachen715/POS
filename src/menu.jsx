import React from 'react';
import PropTypes from 'prop-types';
import { Switch, message, Table, Layout, Button, Row, Col, Menu as SideBar} from 'antd';
import Modal from 'react-modal';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
const { SubMenu } = SideBar;


const { Content, Sider } = Layout;

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item_counter: 0,
			isOpen: false,
			catalog: {},
			ordered_items: [],
			sent_items: [],
			total: 0.00,
			force_delete: false,
		};
		this.handleClose = this.handleClose.bind(this);
		this.addItem = this.addItem.bind(this);
		this.remove = this.remove.bind(this);
		this.cancelOne = this.cancelOne.bind(this);
		this.submitOrder = this.submitOrder.bind(this);
		this.enable_delete = this.enable_delete.bind(this);
		this.checkOut = this.checkOut.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost:5002/menu',{ credentials: 'same-origin' })
		.then((response) => {
			if(!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			this.setState({ catalog: data });
		})
		.catch(error => console.log(error));
	}

	handleClose(e) {
		this.setState({ isOpen: false });
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isOpen) this.setState({ isOpen: nextProps.isOpen });
	}

	addItem(item) {
		item.key = this.state.item_counter;
		this.setState({ item_counter: this.state.item_counter + 1});
		this.setState({ total: this.state.total + item.price });
		this.setState({ ordered_items: this.state.ordered_items.concat(item) });
	}

	failed_to_send() {
		return message.error('Failed To Send Order.')
	}

	submitOrder() {
		let message = {
			table_number: this.props.table_number,
			order: this.state.ordered_items
		}
		fetch('http://localhost:5002/menu', {
			method: 'POST',
			body: JSON.stringify(message),
			credentials: 'same-origin',
		}).then((response) => {
			if(!response.ok) {
				throw Error(response.statusText);
			}
			else {
				this.setState({ sent_items: this.state.sent_items.concat(this.state.ordered_items) });
				this.setState({ ordered_items: [] });
			}
		}).catch(error => {this.failed_to_send(); console.log(error)});
	}

	remove(array, index) {
		let target = 0;
		if (this.state.force_delete) {
			for(let i = 0; i < this.state.sent_items.length; ++i) {

				if(index === this.state.sent_items[i].key) {
					target = i;
					break;
				}
			}
			this.setState({ total: this.state.total - this.state.sent_items[target].price });
			return array.filter(e => e.key !== index);
		}
		else {
			for(let i = 0; i < this.state.ordered_items.length; ++i) {

				if(index === this.state.ordered_items[i].key) {
					target = i;
					break;
				}
			}
			this.setState({ total: this.state.total - this.state.ordered_items[target].price });
			return array.filter(e => e.key !== index);
		}
	}

	cancelOne(index) {
		if (this.state.force_delete) {
			this.setState({ sent_items: this.remove(this.state.sent_items, index)});
		}
		else {
			this.setState({ ordered_items: this.remove(this.state.ordered_items, index)});
		}
	}

	enable_delete(checked) {
		this.setState({ force_delete: checked });
	}

	failed_to_check() {
		return message.error('Failed to Checkout!');
	}

	success_to_check() {
		return message.success('Checkout Sucessfully!');
	}

	checkOut() {
		let message = {
			table_number: this.props.table_number,
			order: this.state.sent_items,
			total: this.state.total,
		};
		fetch('http://localhost:5002/check', {
			method: 'POST',
			body: JSON.stringify(message),
			credentials: 'same-origin',
		}).then((response) => {
			if(!response.ok) {
				throw Error(response.statusText);
			}
			else {
				this.setState({
					item_counter: 0,
					isOpen: false,
					ordered_items: [],
					sent_items: [],
					total: 0.00,
					force_delete: false,
				});
				this.success_to_check();
			}
		}).catch(error => {this.failed_to_check(); console.log(error)});
	}

	render() {
		const style = {
			verticalAlign: 'top',
			justifyContent: 'center',
			whiteSpace: "pre-line",
			fontSize: 14,
			width: 120,
			height: 100,
			margin: 2
		};

		let routes = [];
		for (let key in this.state.catalog) {
			let group = []
			for(let i = 0; i < this.state.catalog[key].length; ++i) {
				let item_name = this.state.catalog[key][i].name;
				let item_price = this.state.catalog[key][i].price;
				let item_index = this.state.ordered_items.length;
				group.push(<Button type='primary' style={style} onClick={() => this.addItem({name: item_name, price: item_price})}>{item_name}</Button>);
			}

			routes.push({
				name: key,
				path: '/'+key,
				main: () => <Row>{group}</Row>
			})
		}

		const side_style = {
			backgroundColor: 'white',
			position: 'absolute',
			top: 50,
			right: 21
		}


		const content_style = {
			backgroundColor: 'white'
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

		let table_entry = this.state.sent_items.map((item) => 
			({
				name: item['name'],
				price: item['price'],
				action: <Button disabled={!this.state.force_delete} type='danger' onClick={() => this.cancelOne(item['key'])}>Delete</Button>
			})
		);

		table_entry = table_entry.concat(this.state.ordered_items.map((item) => 
			({
				name: item['name'],
				price: item['price'],
				action: <Button type='danger' onClick={() => this.cancelOne(item['key'])}>Delete</Button>
			})
		));

		return (
			<div>
				<Modal
					title="Menu"
					isOpen={this.state.isOpen}
				>
				<Button onClick={this.handleClose}>X</Button>
					<Layout>
							<Router>	
							    <div style={{ display: 'flex', backgroundColor: 'white'}}>
							     <Sider>
								        <SideBar theme="dark" mode="inline">
								          {routes.map((item) => (<SideBar.Item><Link to={item.path}>{item.name}</Link></SideBar.Item>)
								          )}
								        </SideBar>	      
							    </Sider>
							    <Content>
								      <div style={{ width: 700 }}>
								        {routes.map((route, index) => (
								          <Route
								            key={index}
								            path={route.path}
								            exact={route.exact}
								            component={route.main}
								          />
								        ))}
								      </div>
							      </Content>
							    </div>
							</Router>

							<Sider width={450} style={content_style}>
								<Table columns={columns} dataSource={table_entry} />
								<p>Tax: (6%)</p>
								<p>Total: ${(this.state.total * 1.06).toFixed(2)}</p>
								<Button type='primary' onClick={this.checkOut}>Check Out</Button>
								<Button type='primary' onClick={this.submitOrder}>Submit</Button>
								Force Delete<Switch onChange={this.enable_delete}/>
							</Sider>
					</Layout>
				</Modal>
			</div>
		);
	}
}

Menu.propTypes = {
	table_number: PropTypes.number.isRequired,
	isOpen: PropTypes.bool.isRequired
}

export default Menu;