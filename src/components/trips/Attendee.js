import React from 'react';
import { connect } from 'react-redux';
import {Avatar} from 'antd';
import { getAttendee } from '../../actions/attendee';

export class Attendee extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getAttendee(this.props.userId));
  }

  render() {
    return (
      <div>
        <Avatar src={} />
      </div>
    )
  }
}