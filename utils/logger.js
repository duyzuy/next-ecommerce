export const logger = (reducer) => {
  return (state, action) => {
    console.group('Action: ' + action.type);
    console.group('Current');
    console.info(state);
    console.groupEnd();
    const newState = reducer(state, action);
    console.group('Next');
    console.info(newState);
    console.groupEnd();
    console.groupEnd();
    return newState;
  };
};
