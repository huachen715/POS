import React from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import ReactDom from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import Home from './home';
import Order from './order';
import Topics from './topics';

ReactDom.render(
	<div>
		<Router>
			<div>
				<ul>
					<li><Link to='/order'> Order </Link></li>
				</ul>
				<hr/>
				<Route path="/order" component={Order}/>
			</div>
		</Router>
	</div>
	,
	document.getElementById('app')
);