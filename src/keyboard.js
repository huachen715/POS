import React from "react";
import { Button, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css';

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
			height: 100
		};

		const input_style = {
			// font-size: 'medium',
			width: 320,
			height: 50,
			fontSize: "20px"
		};
		return (
			<div>
				<Row>
					<Col offset={8}>
						<form onSubmit={this.handleSubmit}>
							<Input style={input_style} type="text" onChange={this.handleChange} value={this.state.displayValue} />
						</form>
					</Col>
				</Row>
				<Row>
					<Col offset={8}>
						<Row>
							<Button type="primary" onClick={() => this.input('2')} style={style}>20</Button>
							<Button type="primary" onClick={() => this.input('2')} style={style}>2</Button>
							<Button type="primary" onClick={() => this.input('3')} style={style}>3</Button>
						</Row>
						<Row>
							<Button type="primary" onClick={() => this.input('4')} style={style}>4</Button>
							<Button type="primary" onClick={() => this.input('5')} style={style}>5</Button>
							<Button type="primary" onClick={() => this.input('6')} style={style}>6</Button>
						</Row>
						<Row>
							<Button type="primary" onClick={() => this.input('7')} style={style}>7</Button>
							<Button type="primary" onClick={() => this.input('8')} style={style}>8</Button>
							<Button type="primary" onClick={() => this.input('9')} style={style}>9</Button>
						</Row>
						<Row>
							<Button type="primary" onClick={this.clear} style={style}>Clear</Button>
							<Button type="primary" onClick={() => this.input('0')} style={style}>0</Button>
							<Button type="primary" onClick={this.handleSubmit} style={style}>Enter</Button>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Keyboard;