const getFromLocalStorage = (keyName: string) => localStorage.getItem(keyName);

const setToLocalStorage = (keyName: string, value: string) => localStorage.setItem(keyName, value);

export { getFromLocalStorage, setToLocalStorage };
