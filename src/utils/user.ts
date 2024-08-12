const capitalizeName = (name: string) => {
  if (typeof name === 'string') {
    const arr = name.trim().split(' ');
    return arr.map((cur) => (cur && cur !== ' ' ? cur[0].toUpperCase() + cur.slice(1).toLowerCase() : '')).join(' ');
  }
  return name;
};

export { capitalizeName };
