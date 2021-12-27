const logger = (store) => (next) => (action) => {
  console.group(action.type);
    console.log('The action: ', action);
    const returnValue = next(action);   // invoking next which is dispatch, passing it the action, which will update the state
    console.log('The new state: ', store.getState())
  console.groupEnd()

  return returnValue;
}

export default logger;