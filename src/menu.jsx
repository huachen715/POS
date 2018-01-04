import React from 'react';
import PropTypes from 'prop-types';
import { Table, Layout, Button, Row, Col, Menu as SideBar} from 'antd';
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
			isOpen: false,
			catalog: {},
			ordered_items: []
		};
		this.handleClose = this.handleClose.bind(this);
		this.addItem = this.addItem.bind(this);
		this.cancelAll = this.cancelAll.bind(this);
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
		this.setState({ ordered_items: this.state.ordered_items.concat(item) });
	}

	cancelAll() {
		this.setState({ ordered_items: [] });
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

		const table_entry = this.state.ordered_items.map((item) => 
			({
				name: item['name'],
				price: item['price'],
				action: <Button type='danger'>Delete</Button>
			})
		)


		// console.log(routes);

		// this.setState({ isOpen: this.props.isOpen })
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
								          // Render more <Route>s with the same paths as
								          // above, but different components this time.
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

							<Sider width={500} style={content_style}>
								<Table columns={columns} dataSource={table_entry} />
								<Button type="primary" onClick={this.cancelAll}>Cancel All</Button>
							</Sider>
					</Layout>
				</Modal>
			</div>
		);
	}
}

Menu.propTypes = {
	isOpen: PropTypes.bool.isRequired
}

export default Menu;