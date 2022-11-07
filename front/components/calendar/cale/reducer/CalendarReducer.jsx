function calendarReducer(state, action) {
  if (action.type === "INCREMENT") {
    if (state.month < 11) {
      return { ...state, month: state.month + 1 };
    }
    // 12월을 넘길 경우 Year + 1
    return { ...state, year: state.year + 1, month: 0 };
  }
  if (state.month > 0) {
    return { ...state, month: state.month - 1 };
  }
  // 1월 보다 작을 경우 Year - 1
  return { ...state, year: state.year - 1, month: 11 };
}

export default calendarReducer;
