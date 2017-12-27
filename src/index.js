import React from 'react';
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
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
					<li><Link to='/topics'>Topics</Link></li>
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