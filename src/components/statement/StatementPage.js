import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon, Button } from 'antd';
import { Alert } from './../microcomponents/Alert';
import { ChargesList } from './ChargesList';
import { getCharges } from './../../actions/statement';

export class StatementPage extends React.Component {
  componentDidMount() {
    this.props.getCharges(this.props.trip.trip_id);
  }

  render() {
    if (this.props.error) {
      return (
        <Alert
          type="error"
          title="Error loading statement"
          actions={[
            <Button onClick={() => this.props.getCharges(this.props.trip.trip_id)}>
              Reload
            </Button>,
          ]}
          icon
        >
          There was an error loading the charges for your trip. Please check your Internet
          connection and try again.
        </Alert>
      );
    }
    if (this.props.trip.charges === undefined || this.props.trip.charges.loading) {
      return (
        <div>
          <Spin indicator={<Icon type="loading" spin />} /> Loading statement...
        </div>
      );
    }
    return (
      <div>
        <ChargesList charges={this.props.trip.charges.data} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCharges: tripId => dispatch(getCharges(tripId)),
});

const mapStateToProps = (state, props) => {
  return {
    trip: state.activeTrip,
    error: state.activeTrip.charges ? state.activeTrip.charges.error : null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatementPage);
