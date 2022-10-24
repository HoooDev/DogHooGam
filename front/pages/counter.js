import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { testActions } from "redux/slice/testSlice";

function TestPage() {
  const count = useSelector((state) => state.test.value);
  const dispatch = useDispatch();

  return (
    <>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(testActions.increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(testActions.decrement())}
      >
        Decrement
      </button>

      <div>hi</div>
    </>
  );
}

export default TestPage;
