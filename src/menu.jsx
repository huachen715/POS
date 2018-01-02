import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Row, Col } from 'antd';
import Modal from 'react-modal';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
const { Content, Sider } = Layout;
import MenuItems from './menuItems';
import OrderDisplay from './orderDisplay';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			catalog: [],
			ordered_items: []
		};
		this.handleClose = this.handleClose.bind(this);
		this.addItem = this.addItem.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost:5002/menu',{ credentials: 'same-origin' })
		.then((response) => {
			if(!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			this.setState({ catalog: data['catalog'] });
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
		// console.log(item);
	}

	render() {
		const routes = this.state.catalog.map((item) => 
			({path: '/'+item, 
			  name: item,
			  main: () => (<MenuItems addItem={this.addItem} url={`http://localhost:5002/menu/${item}`}/>)
			})
		);

		const side_style = {
			backgroundColor: 'white'
		}

		// console.log(routes);

		// this.setState({ isOpen: this.props.isOpen })
		return (
			<div>
				<Modal
					title="Menu"
					isOpen={this.state.isOpen}
				>
					<Layout>
						<Content>
							<Router>
							    <div style={{ display: 'flex' }}>
							      <div style={{
							        padding: '5px',
							        width: '20%',
							        background: '#f0f0f0',
							        color: 'white'
							      }}>
							        <ul style={{ listStyleType: 'none', padding: 0 }}>
							          {routes.map((item) => (<li><Link to={item.path}>{item.name}</Link></li>)
							          )}
							        </ul>
							      </div>

							      <div style={{ flex: 1, padding: '10px' }}>
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
							    </div>
							</Router>
						</Content>
						<Sider width={500} style={side_style}>
							<OrderDisplay item={this.state.ordered_items} />
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