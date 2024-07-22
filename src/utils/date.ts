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
  return date.toLocaleTimeString('en-US');
};

export { getNavDate, getNavTime };
