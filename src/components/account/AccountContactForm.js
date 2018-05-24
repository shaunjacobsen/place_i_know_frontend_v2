import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { Button, Select, Input, Radio, DatePicker, Icon, Tooltip } from 'antd';
import { makeField } from './../../forms/makeField';
import { countryList, phonePrefixes } from './../../forms/staticData';

const SelectField = makeField(Select);
const InputField = makeField(Input);
const RadioField = makeField(Radio.Group);
const DateField = makeField(DatePicker);

const phonePrefixSelector = (
  <Select style={{ width: 75 }}>
    {phonePrefixes.map(prefix => (
      <Select.Option key={prefix.code} value={prefix.dial_code}>
        {prefix.dial_code}
      </Select.Option>
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
        <Field label="ZIP/Postal Code" name="postal" component={InputField} />
        <Field label="Country" name="country" component={SelectField}>
          {countryList.map(country => (
            <Select.Option key={country.name} value={country.code}>
              {country.name}
            </Select.Option>
          ))}
        </Field>
        <Field
          addonBefore={phonePrefixSelector}
          label="Phone Number"
          name="phone"
          help="Please specify the country code, e.g. +1 234 567 8910"
          component={InputField}
        />
        <Field label="Birthdate" name="birthdate" component={DateField} />
        <Field label="Gender" name="gender" component={RadioField}>
          <Tooltip title="Please select the gender indicated on your official documents (e.g. passport). If this changes before your trip, please let your travel planner know so your tickets can be updated.">
            <Radio.Button value="F">Female</Radio.Button>
            <Radio.Button value="M">Male</Radio.Button>
          </Tooltip>
        </Field>
        <Button type="primary" htmlType="submit">
          <Icon type="save" />&nbsp;Save
        </Button>
      </form>
    );
  }
}

AccountContactForm = reduxForm({ form: 'updateContactInformation' })(AccountContactForm);

export default AccountContactForm;
