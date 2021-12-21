const reducer = (state = { isLoggedIn: false }, action) => {
  if (!action.data) {
    console.debug("just returned");
    return state;
  }

  if (action.type === "LOGGEDIN") {
    console.debug('edited data');
    return {
      ...state,
      isLoggedIn: true,
    };
  }
};

export default reducer;
