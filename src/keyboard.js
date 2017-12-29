import React from "react";
import { Button, Input, Row, Col } from 'antd';

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
		const style = {
			width: 100,
			height: 100,
			backgroundColor: 'CornflowerBlue',
			color: 'white',
			font_size: 500
		};

		const input_style = {
			// font-size: 'medium',
			width: 300,
			height: 50
		}

		return (
			<div>
				<Row>
					<Col offset={7}>
						<form onSubmit={this.handleSubmit}>
							<Input style={input_style} type="text" onChange={this.handleChange} value={this.state.displayValue} />
						</form>
					</Col>
				</Row>
				<Row>
					<Col offset={7}>
						<Row>
							<button onClick={() => this.input('1')} style={style}>1</button>
							<button onClick={() => this.input('2')} style={style}>2</button>
							<button onClick={() => this.input('3')} style={style}>3</button>
						</Row>
						<Row>
							<button onClick={() => this.input('4')} style={style}>4</button>
							<button onClick={() => this.input('5')} style={style}>5</button>
							<button onClick={() => this.input('6')} style={style}>6</button>
						</Row>
						<Row>
							<button onClick={() => this.input('7')} style={style}>7</button>
							<button onClick={() => this.input('8')} style={style}>8</button>
							<button onClick={() => this.input('9')} style={style}>9</button>
						</Row>
						<Row>
							<button onClick={this.clear} style={style}>Clear</button>
							<button onClick={() => this.input('0')} style={style}>0</button>
							<button onClick={this.handleSubmit} style={style}>Enter</button>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Keyboard;