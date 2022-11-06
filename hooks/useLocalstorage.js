const useLocalStorage = (name) => {
  const name = localStorage.getItem(name);

  const setItem = (key, value) => {};

  const getItem = () => {};

  return {
    setItem,
    getItem
  };
};

export default useLocalStorage;
