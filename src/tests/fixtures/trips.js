import moment from 'moment';

export default [
  {
    trip_id: '1',
    title: 'New York City',
    start_date: moment().add(7, 'days'),
    end_date: moment().add(14, 'days'),
    created: moment().subtract(2, 'months'),
    travel_planner_id: 1,
    created_by: 1,
    attendees: [1, 2],
    image_id: 43,
    image: {
      secure_url:
        'https://res.cloudinary.com/placeiknow/image/upload/v1510189627/events/mfvmhdseaoprfjtyjo8f.jpg',
    },
  },
  {
    trip_id: '2',
    title: 'Paris',
    start_date: moment().add(7, 'weeks'),
    end_date: moment().add(9, 'weeks'),
    created: moment().subtract(4, 'months'),
    travel_planner_id: 1,
    created_by: 1,
    attendees: [2],
    image_id: 43,
    image: {
      secure_url:
        'https://res.cloudinary.com/placeiknow/image/upload/v1510189627/events/mfvmhdseaoprfjtyjo8f.jpg',
    },
  },
  {
    trip_id: '3',
    title: 'Tokyo',
    start_date: moment().add(7, 'months'),
    end_date: moment().add(8, 'months'),
    created: moment().subtract(5, 'months'),
    travel_planner_id: 1,
    created_by: 1,
    attendees: [2, 6],
    image_id: 43,
    image: {
      secure_url:
        'https://res.cloudinary.com/placeiknow/image/upload/v1510189627/events/mfvmhdseaoprfjtyjo8f.jpg',
    },
  },
];
