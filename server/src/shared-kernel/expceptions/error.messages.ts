export const ERROR = {
  COMPARTMENT: {
    ID_REQUIRED: 'Compartment ID must be required',
    ID_SHOULD_BE_NUMBER: 'Compartment ID must be a number',
  },
  CABIN: {
    ID_REQUIRED: 'Cabin ID must be required',
    ID_SHOULD_BE_NUMBER: 'Cabin ID must be a number',
  },

  PASSENGER: {
    NAME: {
      IS_REQUIRED: 'Passenger name is required',
      MUST_BE_STRING: 'Passenger name must be string',
    },
    AGE: {
      IS_REQUIRED: 'Passenger age is required',
      MUST_BE_NUMBER: 'Passenger age must be number',
    },
    BERTH_PREFERENCE: {
      IS_REQUIRED: 'Berth preference is required',
      MUST_BE_STRING: 'Berth preference must be string',
      IS_INVALID: 'Invalid berth preference',
    },
  },

  BOOKING: {
    MAX_TICKETS_PER_BOOKING_REACHED:
      'Max 6 tickets can be reserved per booking',
    MIN_TICKETS_PER_BOOKING: 'Min 1 ticket must be required per booking',
  },
};
