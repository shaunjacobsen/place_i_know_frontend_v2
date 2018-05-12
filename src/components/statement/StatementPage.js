import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';
import { ChargesList } from './ChargesList';
import { getCharges } from './../../actions/statement';

export class StatementPage extends React.Component {
  componentDidMount() {
    this.props.getCharges(this.props.trip.trip_id);
  }

  render() {
    if (
      this.props.trip.charges === undefined ||
      this.props.trip.charges.loading
    ) {
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

const mapDispatchToProps = dispatch => {
  return {
    getCharges: tripId => dispatch(getCharges(tripId)),
  };
};

const mapStateToProps = (state, props) => {
  return {
    trip: state.activeTrip,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatementPage);
