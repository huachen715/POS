import React from "react";
import { Row, Col } from 'antd';

class Keyboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayValue: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.input = this.input.bind(this);
		this.clear = this.clear.bind(this);
	}

	input(i) {
		this.setState({ displayValue: this.state.displayValue+i})
	}

	handleChange(event) {
		this.setState({ displayValue: event.target.value });
	}

	clear() {
		this.setState({ displayValue: "" });
	}

	handleSubmit(event) {
		event.preventDefault();
		let message = { password: this.state.displayValue };
		console.log(message);
		fetch("http://localhost:5002/validate", {
			method: 'POST',
			body: JSON.stringify(message),
			credentials: 'same-origin',
		}).then((response) => {
			if (!response.ok) alert("wrong password!");
			else alert("correct password!");
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange} value={this.state.displayValue} />
				</form>
				<Row>
					<button onClick={() => this.input('1')}>1</button>
					<button onClick={() => this.input('2')}>2</button>
					<button onClick={() => this.input('3')}>3</button>
				</Row>
				<Row>
					<button onClick={() => this.input('4')}>4</button>
					<button onClick={() => this.input('5')}>5</button>
					<button onClick={() => this.input('6')}>6</button>
				</Row>
				<Row>
					<button onClick={() => this.input('7')}>7</button>
					<button onClick={() => this.input('8')}>8</button>
					<button onClick={() => this.input('9')}>9</button>
				</Row>
				<Row>
					<button onClick={this.clear}>Clear</button>
					<button onClick={() => this.input('0')}>0</button>
					<button onClick={this.handleSubmit}>Enter</button>
				</Row>
			</div>
		);
	}
}

export default Keyboard;