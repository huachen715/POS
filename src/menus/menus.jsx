import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Button, Row, Col, Menu as SideBar} from 'antd';
import Modal from 'react-modal';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const { SubMenu } = SideBar;

const { Content, Sider } = Layout;
class Menus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: {},
			curr_item: '',
			key: '',
		};
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

	refetch = () => {
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

	handleClick = (item, key) => {
		// this.setState({ curr_item: item, buttonType: 'danger' })
		this.state.curr_item = item;
		this.state.key = key;
	}
	handleDelete=(e) => {
		let item = this.state.curr_item;
		let key = this.state.key;
		console.log(item);
		console.log(key)
		delete this.state.catalog[item][key];
		// if (item.length) {
		// 	fetch('http://localhost:5002/delete_menu', {
	 //          method: 'POST',
	 //          body: JSON.stringify(item),
	 //          credentials: 'same-origin',
	 //        }).then((response) => {
	 //          if(!response.ok) {
	 //            throw Error(response.statusText);
	 //          }
	 //        }).catch(error => {console.log(error)});
	 //        this.setState({ curr_item: '' });
	 //    }
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
		const side_style = {
			width: 120,
			height: 100,
			fontSize: 20,
			backgroundColor: 'green'
		};
		let routes = [];
		for (let key in this.state.catalog) {
			let group = []
			for(let i = 0; i < this.state.catalog[key].length; ++i) {
				if (this.state.catalog[key][i]) {
					let item_name = this.state.catalog[key][i].name;
					let item_price = this.state.catalog[key][i].price;
					group.push(<Button type='primary' id={key} onClick={()=>this.handleClick(item_name, i)} style={style}>{item_name}</Button>);
				}
			}

			routes.push({
				name: key,
				path: '/'+key,
				main: () => <Row>{group}</Row>
			})
		}
		// console.log(routes)
		return(
			<div>
				<Layout>
					<Router>	
					    <div style={{ display: 'flex', backgroundColor: 'white'}}>
					     <Sider>
						        <SideBar theme = 'dark' mode="inline">
						          {routes.map((item) => (<SideBar.Item><Link to={item.path}>{item.name}</Link></SideBar.Item>)
						          )}
						        </SideBar>	      
					    </Sider>
					    <Content>
						      <div style={{ width: 800 }}>
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
				      		<Button type= 'primary' onClick={() => this.handleDelete()}> DELETE</Button>
					    </div>
					</Router>
		        </Layout>
			</div>
		);
	}
}



export default Menus;