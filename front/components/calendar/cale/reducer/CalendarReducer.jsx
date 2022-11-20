function calendarReducer(state, action) {
  if (action.type === "INCREMENT") {
    if (state.month < 11) {
      return { ...state, month: state.month + 1 };
    }
    return { ...state, year: state.year + 1, month: 0 };
  }
  if (state.month > 0) {
    return { ...state, month: state.month - 1 };
  }
  return { ...state, year: state.year - 1, month: 11 };
}

export default calendarReducer;
