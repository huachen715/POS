import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Switch, message, Table, Layout, Button, Row, Col, Menu as SideBar} from 'antd';
import Modal from 'react-modal';
import Login from './login'
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
			activate_login: false,
			activate_qty: false,
		};
		this.handleClose = this.handleClose.bind(this);
		this.addQty = this.addQty.bind(this);
		this.addItem = this.addItem.bind(this);
		this.remove = this.remove.bind(this);
		this.cancelOne = this.cancelOne.bind(this);
		this.submitOrder = this.submitOrder.bind(this);
		this.enable_delete = this.enable_delete.bind(this);
		this.checkOut = this.checkOut.bind(this);
		this.handler = this.handler.bind(this);
		this.invoke_login = this.invoke_login.bind(this);
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

	addQty(item) {
		console.log(this.state.ordered_items[item].quality);
		this.state.ordered_items[item].quality += 1;
		// console.log(this.state.ordered_items[item].quality)	
		this.forceUpdate();
		// this.setState({ ordered_items[item].quality: this.state.ordered_items[item].quality + 1});
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

	invoke_login(checked) {
		if(checked) {
			this.setState({ activate_login: true });
		}
		else {
			this.setState({ force_delete: checked });
		}
	}

	handler() {
		this.setState({ activate_login: false });
	}

	enable_delete() {
		this.setState({ force_delete: true });
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
				group.push(<Button type='primary' style={style} onClick={() => this.addItem({quality: 1,name: item_name, price: item_price})}>{item_name}</Button>);
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

		const columns = [
		{
			title: 'Qty',
			dataIndex: 'quality',
		},
		{
		  title: 'Name',
		  dataIndex: 'name',
		}, {
		  title: 'Price',
		  dataIndex: 'price',
		}, {
		   title: 'Action',
		   dataIndex: 'action' ,
		}];

		let table_entry = this.state.sent_items.map((item) => 
			({	
				quality: <InputNumber min={1} defaultValue={item['quality']} />,
				// quality: <Button onClick={() => this.addQty(item['key'])}> {item['quality']}</Button>,
				name: item['name'],
				price: item['price'],
				action: <Button disabled={!this.state.force_delete} type='danger' onClick={() => this.cancelOne(item['key'])}>Delete</Button>
			})
		);

		table_entry = table_entry.concat(this.state.ordered_items.map((item) => 
			({
				quality: <InputNumber min={1} defaultValue={item['quality']} />,
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
							Force Delete<Switch checked={this.state.force_delete} onChange={this.invoke_login}/>
						</Sider>
					</Layout>
					<Login url="http://localhost:5002/validate_delete" handler={this.handler} onSuccess={this.enable_delete} activate={this.state.activate_login}/>
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