export const SLEEPER_SEATS_IN_CABIN = 7;

export const SEATS_IN_CABIN = 8;

export const REGULAR_BERTH_TYPES = {
  UPPER: 'U',
  MIDDLE: 'M',
  LOWER: 'L',
};

export const SIDE_BERTH_TYPES = {
  SIDE_UPPER: 'SU',
  RAC: 'RAC',
};

export const ALL_BERTH_TYPES = {
  ...REGULAR_BERTH_TYPES,
  ...SIDE_BERTH_TYPES,
};

export const CABIN_SEAT_BERTHS = [
  ...Object.values(REGULAR_BERTH_TYPES),
  ...Object.values(REGULAR_BERTH_TYPES),
  ...Object.values(SIDE_BERTH_TYPES),
];
