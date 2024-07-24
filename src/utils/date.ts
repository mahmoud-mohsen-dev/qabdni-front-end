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

// Input: Tue Feb 20 2024 00:00:00 GMT+0200 (Eastern European Standard Time) ==> (( Output: "20/10/2023" ))
const convertToCustomDate = (date: string) => {
  // Accepts a date object
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};

export { getNavDate, getNavTime, convertToCustomDate };
