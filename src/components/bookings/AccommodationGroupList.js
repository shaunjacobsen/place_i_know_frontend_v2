import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';
import AccommodationGroup from './AccommodationGroup';

export class AccommodationGroupList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.groups.map(group => {
      return <AccommodationGroup key={group.accommodation_group_id} group={group} />;
    });
  }
}

export default AccommodationGroupList;
