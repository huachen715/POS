import React from 'react';
import 'antd/dist/antd.css';
import { Icon, Layout, Menu, Button } from 'antd';
import ReactDom from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const { Content, Sider } = Layout;

import Order from './order';
import Register from './employee/register';
import View from './employee/view';
import Exit from './exit';
import Menus from './menus/menus'
import Sales from './sales'

ReactDom.render(
	<div>
		<Router>
			<div>
				<Layout>
					<Sider style={{height: 830}}>
						<Menu theme='dark' mode='inline'>
							<SubMenu title={<span><Icon type="coffee" /><span>Dine in</span></span>}>
								<Menu.Item><Link to='/order'> Sushi Bar </Link></Menu.Item>
								<Menu.Item>Tatami</Menu.Item>
								<Menu.Item>Habachi</Menu.Item>
								<Menu.Item>Bar</Menu.Item>
								<Menu.Item>Dining</Menu.Item>
							</SubMenu>
							<Menu.Item><Icon type="phone"/>Take Out</Menu.Item>
							<Menu.Item><Icon type="user"/>Reservation</Menu.Item>
							<Menu.Item><Link to='/viewEmployee'><Icon type="user-add" />Employee Manage</Link></Menu.Item>
							<SubMenu title={<span><Icon type="clock-circle-o" /><span>Punctuation</span></span>}>
								<Menu.Item>Clock in/out</Menu.Item>
								<Menu.Item>Modify</Menu.Item>
								<Menu.Item>View</Menu.Item>
							</SubMenu>
							<SubMenu title={<span><Icon type="file-text" /><span>Ticket</span></span>}>
								<Menu.Item>View Ticket</Menu.Item>
								<Menu.Item>Modify Ticket</Menu.Item>
								<Menu.Item>Delete Ticket</Menu.Item>
							</SubMenu>
							<Menu.Item><Link to='/viewSales'><Icon type="pay-circle-o" />Sales</Link></Menu.Item>
							<Menu.Item><Link to='/viewMenus'><Icon type="book" />Menu</Link></Menu.Item>
							<Menu.Item><Link to='/exit'><Icon type="logout"/>Exit</Link></Menu.Item>
						</Menu>
					</Sider>
					<Content>
						<div>
							<Route path="/order" component={Order}/>
							<Route path="/viewEmployee" component={View} />
							<Route path="/viewMenus" component={Menus} />
							<Route path="/viewSales" component={Sales} />
							<Route path="/exit" component={Exit}/>
						</div>
					</Content>
				</Layout>
			</div>
		</Router>
	</div>
	,
	document.getElementById('app')
);