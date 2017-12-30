import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';
import Modal from 'react-modal';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			catalog: []
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

	render() {

		const style = {
			width: 100,
			height: 100,
			margin: 3
		};

		const list_item = this.state.catalog.map((item) =>
			<li>{item}</li>
		);


		const routes = [
		  { path: '/',
		    exact: true,
		    sidebar: () => <div>home!</div>,
		    main: () => (<div><Row>
							<Button type="primary" style={style}>1</Button>
							<Button type="primary" style={style}>2</Button>
							<Button type="primary" style={style}>3</Button>
						</Row>
						<Row>
							<Button type="primary" style={style}>4</Button>
							<Button type="primary" style={style}>5</Button>
							<Button type="primary" style={style}>6</Button>
						</Row>
						<Row>
							<Button type="primary" style={style}>7</Button>
							<Button type="primary" style={style}>8</Button>
							<Button type="primary" style={style}>9</Button>
						</Row>
						<Row>
							<Button type="primary" style={style}>Clear</Button>
							<Button type="primary" style={style}>0</Button>
							<Button type="primary" style={style}>Enter</Button>
						</Row></div>)
		  },
		  { path: '/bubblegum',
		    sidebar: () => <div>bubblegum!</div>,
		    main: () => (<div><Row>
							<Button type="primary" style={style}>1</Button>
							<Button type="primary" style={style}>2</Button>
							<Button type="primary" style={style}>3</Button>
						</Row>
						<Row>
							<Button type="primary" style={style}>4</Button>
							<Button type="primary" style={style}>5</Button>
							<Button type="primary" style={style}>6</Button>
						</Row>
						<Row>
							<Button type="primary" style={style}>7</Button>
							<Button type="primary" style={style}>8</Button>
							<Button type="primary" style={style}>9</Button>
						</Row>
						<Row>
							<Button type="primary" style={style}>Clear</Button>
							<Button type="primary" style={style}>0</Button>
							<Button type="primary" style={style}>Enter</Button>
						</Row></div>)
		  },
		  { path: '/shoelaces',
		    sidebar: () => <div>shoelaces!</div>,
		    main: () => (<div><Row>
							<Button type="primary" style={style}>1</Button>
							<Button type="primary" style={style}>2</Button>
							<Button type="primary" style={style}>3</Button>
						</Row>
						<Row>
							<Button type="primary" style={style}>4</Button>
							<Button type="primary" style={style}>5</Button>
							<Button type="primary" style={style}>6</Button>
						</Row>
						<Row>
							<Button type="primary" style={style}>7</Button>
							<Button type="primary" style={style}>8</Button>
							<Button type="primary" style={style}>9</Button>
						</Row>
						<Row>
							<Button type="primary" style={style}>Clear</Button>
							<Button type="primary" style={style}>0</Button>
							<Button type="primary" style={style}>Enter</Button>
						</Row></div>)
		  }
		];
		// this.setState({ isOpen: this.props.isOpen })
		return (
			<div>
				<Modal
					title="Menu"
					isOpen={this.state.isOpen}
				>
					<Router>
					    <div style={{ display: 'flex' }}>
					      <div style={{
					        padding: '10px',
					        width: '40%',
					        background: '#f0f0f0'
					      }}>
					        <ul style={{ listStyleType: 'none', padding: 0 }}>
					          <li><Link to="/">Home</Link></li>
					          <li><Link to="/bubblegum">Bubblegum</Link></li>
					          <li><Link to="/shoelaces">Shoelaces</Link></li>
					        </ul>

					        {routes.map((route, index) => (
					          // You can render a <Route> in as many places
					          // as you want in your app. It will render along
					          // with any other <Route>s that also match the URL.
					          // So, a sidebar or breadcrumbs or anything else
					          // that requires you to render multiple things
					          // in multiple places at the same URL is nothing
					          // more than multiple <Route>s.
					          <Route
					            key={index}
					            path={route.path}
					            exact={route.exact}
					            component={route.sidebar}
					          />
					        ))}
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
				</Modal>
			</div>
		);
	}
}

Menu.propTypes = {
	isOpen: PropTypes.bool.isRequired
}

export default Menu;