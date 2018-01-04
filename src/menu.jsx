import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Row, Col, Menu as SideBar} from 'antd';
import Modal from 'react-modal';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
const { SubMenu } = SideBar;


const { Content, Sider } = Layout;
import MenuItems from './menuItems';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			catalog: {}
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

	render() {
		// const routes = this.state.catalog.map((item) => 
		// 	({path: '/'+item, 
		// 	  name: item,
		// 	  main: () => (<MenuItems url={`http://localhost:5002/menu/${item}`}/>)
		// 	})
		// );

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
				group.push(<Button type='primary'>{this.state.catalog[key][i].name}</Button>);
			}

			routes.push({
				name: key,
				path: '/'+key,
				main: () => <Row>{group}</Row>
			})
		}


		console.log(routes);

		const side_style = {
			backgroundColor: 'white',
			position: 'absolute',
			top: 50,
			right: 21
		}
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
								      <div style={{ width: 1100 }}>
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