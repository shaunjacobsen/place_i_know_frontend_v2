import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button } from 'antd';
import { getItineraryEventsForDate } from './../../actions/activeTrip';
const ButtonGroup = Button.Group;

export class ItineraryDatesSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  selectDate(date) {
    console.log('selectDate clicked', date);
    this.props.selectDate(date);
  }

  render() {
    return (
      <div>
        <ButtonGroup>
          {this.props.dates.map(date => (
            <Button key={date} onClick={this.selectDate}>
              {moment(date).format('ddd D MMM')}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // activeDate:
    //   state.activeTrip.itinerary.activeDate ||
    //   Object.keys(state.activeTrip.itinerary.dates)[0],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectDate: date => dispatch(getItineraryEventsForDate(date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryDatesSelector);
