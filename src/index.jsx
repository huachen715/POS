import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Button } from 'antd';
import ReactDom from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
const { Content, Sider } = Layout;

import Order from './order';
import Register from './register';

ReactDom.render(
	<div>
		<Router>
			<div>
				<Layout>
					<Sider>
						<Menu theme='dark' mode='inline'>
							<Menu.Item><Link to='/order'> Order </Link></Menu.Item>
							<Menu.Item><Link to='/register'> Register </Link></Menu.Item>
						</Menu>
					</Sider>
					<Content>
						<div>
							<Route path="/order" component={Order}/>
							<Route path="/register" component={Register}/>
						</div>
					</Content>
				</Layout>
			</div>
		</Router>
	</div>
	,
	document.getElementById('app')
);