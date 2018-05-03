import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Avatar, Icon, Spin } from 'antd';
import { Attendee } from './Attendee';

export class AttendeesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      attendees: [],
    };
  }

  componentDidMount() {
    this.getAttendees();
  }

  async getAttendees() {
    this.setState(prevState => {
      return {
        ...prevState,
        loading: true,
      };
    });
    try {
      const attendees = await axios.get(
        `${process.env.REACT_APP_API_URL}/trip/${this.props.tripId}/attendees`,
        {
          headers: {
            'x-auth': this.props.authToken,
          },
        }
      );
      this.setState(() => {
        return {
          loading: false,
          attendees: attendees.data,
        };
      });
    } catch (e) {
      console.log(e);
    }
  }

  renderAttendees() {
    if (!this.state.loading) {
      const attendees = this.state.attendees.map(attendee => {
        return (
          <Attendee
            key={attendee.profile_id}
            fullName={attendee.first_name}
            image={attendee.image.secure_url}
          />
        );
      });
      return (
        <div>
          {attendees}
          <Avatar shape="square" size="large" icon="plus" />
        </div>
      );
    } else {
      return <Icon type="loading" spin />;
    }
  }

  render() {
    return <div>{this.renderAttendees()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.token,
  };
};

export default connect(mapStateToProps)(AttendeesList);
