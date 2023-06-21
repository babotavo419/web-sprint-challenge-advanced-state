// ❗ You don't need to add extra action creators to achieve MVP

// Action types
export const MOVE_CLOCKWISE = 'MOVE_CLOCKWISE';
export const MOVE_COUNTER_CLOCKWISE = 'MOVE_COUNTERCLOCKWISE';
export const SELECT_ANSWER = 'SELECT_ANSWER';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_QUIZ = 'SET_QUIZ';
export const INPUT_CHANGE = 'INPUT_CHANGE';
export const RESET_FORM = 'RESET_FORM';

// Action creators
export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTER_CLOCKWISE,
  };
}

export function selectAnswer(answerId) {
  return {
    type: SELECT_ANSWER,
    answerId,
  };
}

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    message,
  };
}

export function setQuiz(quiz) {
  return {
    type: SET_QUIZ,
    quiz,
  };
}

export function inputChange(fieldName, value) {
  return {
    type: INPUT_CHANGE,
    fieldName,
    value,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null));

    // Simulate an asynchronous request to fetch the next quiz
    setTimeout(() => {
      // On successful GET:
      // - Dispatch an action to send the obtained quiz to its state
      const nextQuiz = { /* The obtained quiz object */ };
      dispatch(setQuiz(nextQuiz));
    }, 2000); // Simulating a slow response
  };
}

export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    // Simulate an asynchronous request to post the answer
    setTimeout(() => {
      // On successful POST:
      // - Dispatch an action to reset the selected answer state
      // - Dispatch an action to set the server message to state
      // - Dispatch the fetching of the next quiz
      dispatch(selectAnswer(null));
      dispatch(setMessage('Answer submitted successfully.'));
      dispatch(fetchQuiz());
    }, 1000);
  };
}

export function postQuiz(question, trueAnswer, falseAnswer) {
  return function (dispatch) {
    // Simulate an asynchronous request to post the new quiz
    setTimeout(() => {
      // On successful POST:
      // - Dispatch the correct message to the appropriate state
      // - Dispatch the resetting of the form
      dispatch(setMessage('New quiz submitted successfully.'));
      dispatch(resetForm());
    }, 1000);
  };
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

