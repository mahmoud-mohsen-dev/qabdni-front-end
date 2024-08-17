import dayjs, { Dayjs } from 'dayjs';

const getNavDate = () => {
  const date = new Date();
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

const getNavTime = () => {
  const date = new Date();
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Input: 2024-02-19T22:00:00.000Z ==> (( Output: "Aug 24, 2022" ))
const isoToDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Input: Tue Feb 20 2024 00:00:00 GMT+0200 (Eastern European Standard Time) ==> (( Output: "20/10/2023" ))
const convertToCustomDate = (date: string) => {
  // Accepts a date object
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};

const parseIsoStringToDayjs = (value): null | string | Dayjs => {
  // Check if value is falsy
  if (!value) {
    return null;
  }

  // Check if value is a valid ISO string
  if (typeof value === 'string' && dayjs(value).isValid()) {
    return dayjs(value);
  }

  if (typeof value === 'object' && value.isValid()) {
    return value;
  }

  // Return null for invalid date strings or other values
  return null;
};

const parseDayjsToIsoString = (value: string | Dayjs | null): null | string | Dayjs => {
  // Check if value is falsy
  if (!value) {
    return null;
  }

  // Check if value is a valid dayjs object
  if (typeof value === 'object' && value.isValid()) {
    return value.toISOString();
  }

  if (typeof value === 'string' && dayjs(value).isValid()) {
    return value;
  }

  // Return null for invalid date strings or other values
  return null;
};

const formatDayjsToStrHoursAndMinutes = (value) => {
  return value.isValid() ? value.format('HH:mm') : '';
};

export {
  getNavDate,
  getNavTime,
  parseIsoStringToDayjs,
  parseDayjsToIsoString,
  convertToCustomDate,
  isoToDate,
  formatDayjsToStrHoursAndMinutes
};
