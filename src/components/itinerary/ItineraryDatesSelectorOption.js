import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setItineraryActiveDate } from './../../actions/itinerary';

export class ItineraryDatesSelectorOption extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSelectDate = () => {
    this.props.selectDate(this.props.date);
  };

  isActiveDate = () => {
    return this.props.date === this.props.activeDate;
  };

  render() {
    let dateClassName = 'itinerary-dates-selector__date';
    if (this.isActiveDate()) {
      dateClassName += ' active';
    }

    return (
      <div className={dateClassName}>
        <button
          className="itinerary-dates-selector__button"
          key={this.props.date}
          onClick={this.handleSelectDate}
        >
          {moment(this.props.date).format('ddd')}
          <br />
          <span className="itinerary-dates-selector__date-day">
            {moment(this.props.date).format('D')}
          </span>
          <br />
          {moment(this.props.date).format('MMM')}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeDate: state.activeTrip.itinerary.activeDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectDate: date => dispatch(setItineraryActiveDate(date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryDatesSelectorOption);
