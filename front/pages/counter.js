import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as counterActions from "../store/modules/counter";

export default function Test() {
  const dispatch = useDispatch();
  const value = useSelector(({ counter }) => counter.value);

  // const plus = useCallback(
  //   ({ value }) => {
  //     dispatch(counterActions.increment());
  //   },
  //   [dispatch]
  // );

  const plus = () => {
    dispatch(counterActions.increment());
  };

  const minus = () => {
    dispatch(counterActions.decrement());
  };

  // const minus = useCallback(
  //   ({ value }) => {
  //     dispatch(counterActions.decrement());
  //   },
  //   [dispatch]
  // );

  return (
    <div>
      <h1>Counter</h1>
      <button onClick={() => minus()}>-</button>
      <span>{value}</span>
      <button onClick={() => plus()}>+</button>
    </div>
  );
}
