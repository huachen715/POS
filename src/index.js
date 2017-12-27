import { DatePicker } from 'antd';
import 'antd/dist/antd.css'
const React = require('react');
const ReactDOM = require('react-dom');

// render on page
ReactDOM.render(
  <div>
    <h1>Hello World!</h1>
    <DatePicker />
  </div>,
  document.getElementById('app')
);