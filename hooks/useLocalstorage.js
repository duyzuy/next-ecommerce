const useLocalStorage = (name) => {
  if (typeof window === 'undefined') return <></>;
  let item = JSON.parse(localStorage.getItem(name)) || {};

  const addItem = (key, value) => {
    item = {
      ...item,
      [key]: value
    };
    localStorage.setItem(name, JSON.stringify(item));
  };

  const removeItem = () => {};

  const getItem = () => JSON.parse(localStorage.getItem(name));

  return {
    addItem,
    getItem
  };
};

export default useLocalStorage;
