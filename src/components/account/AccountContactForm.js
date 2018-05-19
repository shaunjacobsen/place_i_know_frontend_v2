import React from 'react';
import { Form, Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Select, Input, Radio, DatePicker, Icon } from 'antd';
import { makeField } from './../../forms/makeField';
import { countryList, phonePrefixes } from './../../forms/staticData';

const SelectField = makeField(Select);
const InputField = makeField(Input);
const RadioField = makeField(Radio);
const DateField = makeField(DatePicker);

const phonePrefixSelector = (
  <Select style={{ width: 75 }}>
    {phonePrefixes.map(prefix => (
      <Select.Option value={prefix.dial_code}>{prefix.dial_code}</Select.Option>
    ))}
  </Select>
);

export class AccountContactForm extends React.Component {
  render() {
    return (
      <form>
        <Field label="First Name" name="firstName" component={InputField} />
        <Field label="Last Name" name="lastName" component={InputField} />
        <Field label="Email Address" name="email" component={InputField} />
        <Field label="Address" name="address1" component={InputField} />
        <Field label="Line 2" name="address2" component={InputField} />
        <Field label="City" name="city" component={InputField} />
        <Field label="State/Province" name="state" component={InputField} />
        <Field label="ZIP/Postal Code" name="zip" component={InputField} />
        <Field label="Country" name="zip" component={SelectField}>
          {countryList.map(country => (
            <Select.Option value={country.code}>{country.name}</Select.Option>
          ))}
        </Field>
        <Field
          addonBefore={phonePrefixSelector}
          label="Phone Number"
          name="phone"
          help="Please specify the country code, e.g. +1 234 567 8910"
          component={InputField}
        />
        <Button type="primary" htmlType="submit">
          <Icon type="save" />&nbsp;Save
        </Button>
      </form>
    );
  }
}

AccountContactForm = reduxForm({ form: 'updateContactInformation' })(AccountContactForm);

export default AccountContactForm;
