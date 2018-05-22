import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Avatar, Icon, Spin, Button } from 'antd';
import { Alert } from '../microcomponents/Alert';
import { Attendee } from './Attendee';

export class AttendeesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      attendees: [],
    };
  }

  componentDidMount() {
    this.getAttendees();
  }

  getAttendees = async () => {
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
          error: null,
          attendees: attendees.data,
        };
      });
    } catch (e) {
      this.setState(() => ({
        error: 'Error loading fellow travellers',
      }));
    }
  };

  renderAttendees = () => {
    if (this.state.error) {
      return (
        <Alert
          type="error"
          title={this.state.error}
          actions={[<Button onClick={this.getAttendees}>Reload</Button>]}
        >
          There was an error loading the other travellers in your group from the server.
          Please try again.
        </Alert>
      );
    }
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
      return <div>{attendees}</div>;
    } else {
      return <Icon type="loading" spin />;
    }
  };

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
