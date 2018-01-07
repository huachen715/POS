import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form, Input, Row, Col, Button } from 'antd';
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.dob = values.dob.format('YYYY-MM-DD');
        fetch('http://localhost:5002/modify_employee', {
          method: 'POST',
          body: JSON.stringify(values),
          credentials: 'same-origin',
        }).then((response) => {
          if(!response.ok) {
            throw Error(response.statusText);
          }
        }).catch(error => {console.log(error)});
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="First Name"
        >
          {getFieldDecorator('first_name', {
            rules: [{
              required: true, message: 'Please input your first name!',
            }],
            initialValue: this.props.default_value.first_name,
          })(
            <Input style={{width: 300}} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Last Name"
        >
          {getFieldDecorator('last_name', {
            rules: [{
              required: true, message: 'Please input your last name!',
            }],
            initialValue: this.props.default_value.last_name,
          })(
            <Input style={{width: 300}} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input style={{width: 300}} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
            initialValue: this.props.default_value.password,
          })(
            <Input type="password" style={{width: 300}} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
            initialValue: this.props.default_value.password,
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} style={{width: 300}} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input style={{ width: 300 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="SSN"
        >
          {getFieldDecorator('ssn', {
            rules: [{ required: true, message: 'Please input your SSN!' }],
            initialValue: this.props.default_value.ssn,
          })(
            <Input style={{ width: 300 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="DOB"
        >
          {getFieldDecorator('dob')(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">{this.props.button_name}</Button>
        </FormItem>
      </Form>
    );
  }
}

RegistrationForm.propTypes = {
  default_value: PropTypes.object,
  button_name: PropTypes.string.isRequired
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;