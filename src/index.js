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
import About from './about';
import Topics from './topics';

ReactDom.render(
	<div>
		<Router>
			<div>
				<ul>
					<li><Button type="primary"><Link to='/'>Home</Link></Button></li>
					<li><Link to='/about'> About </Link></li>
					<li><Link to='/topics'> Topics </Link> </li>
					<li><Button type="primary"> MAIN_MENU </Button></li>
				</ul>
				<hr/>
				<Route exact path="/" component={Home}/>
				<Route path="/about" component={About}/>
				<Route path="/topics" component={Topics}/>
			</div>
		</Router>
		<p>nihao!</p>
	</div>
	,
	document.getElementById('app')
);