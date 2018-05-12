import React from 'react';
import moment from 'moment';
import { Table, Tag, Icon } from 'antd';

const determineColor = text => {
  switch (text) {
    case 'fee':
      return 'cyan';
    case 'booking':
      return 'purple';
    case 'hold':
      return 'gold';
    default:
      return 'magenta';
  }
};

const columns = [
  {
    title: 'Title',
    key: 'product_name',
    dataIndex: 'product_name',
    fixed: 'left',
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
    render: text => {
      return <Tag color={determineColor(text)}>{text.toUpperCase()}</Tag>;
    },
  },
  {
    title: 'Date',
    key: 'charge_date',
    dataIndex: 'charge_date',
    render: text => {
      return moment(text).format('DD MMM YYYY');
    },
  },
  {
    title: 'Total',
    key: 'total',
    dataIndex: 'total',
  },
  {
    title: 'Due By',
    key: 'due_date',
    dataIndex: 'due_date',
    render: text => {
      const date = moment(text);
      return (
        <div>
          {date.format('DD MMM YYYY')}
          {date.isSameOrAfter(moment()) ? (
            <span>
              <br />
              <small>{date.fromNow()}</small>
            </span>
          ) : (
            ''
          )}
        </div>
      );
    },
  },
  {
    title: 'Paid',
    key: 'client_paid',
    dataIndex: 'client_paid',
    render: text => {
      return !!text ? (
        <Tag color="green">
          <Icon type="check" />
        </Tag>
      ) : (
        <Icon type="minus" />
      );
    },
  },
  {
    title: 'Paid On',
    key: 'client_paid_date',
    dataIndex: 'client_paid_date',
  },
  {
    title: 'Reference',
    key: 'reference',
    dataIndex: 'reference',
  },
];

export const ChargesList = props => {
  return (
    <div>
      <Table
        dataSource={props.charges}
        columns={columns}
      />
    </div>
  );
};
