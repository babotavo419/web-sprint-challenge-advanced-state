import { combineReducers } from 'redux';

// Initial state values
const initialWheelState = 0;
const initialQuizState = null;
const initialSelectedAnswerState = null;
const initialMessageState = '';
const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
};

// Reducer for wheel state
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case 'UPDATE_WHEEL_POSITION':
      return action.position;
    default:
      return state;
  }
}

// Reducer for quiz state
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case 'UPDATE_QUIZ':
      return action.quiz;
    default:
      return state;
  }
}

// Reducer for selected answer state
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case 'SELECT_ANSWER':
      return action.answerId;
    case 'UNSELECT_ANSWER':
      return null;
    default:
      return state;
  }
}

// Reducer for info message state
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case 'DISPLAY_LOADING_MESSAGE':
      return 'Loading next quiz';
    default:
      return state;
  }
}

// Reducer for form state
function form(state = initialFormState, action) {
  switch (action.type) {
    case 'UPDATE_NEW_QUESTION':
      return {
        ...state,
        newQuestion: action.question,
      };
    case 'UPDATE_NEW_TRUE_ANSWER':
      return {
        ...state,
        newTrueAnswer: action.trueAnswer,
      };
    case 'UPDATE_NEW_FALSE_ANSWER':
      return {
        ...state,
        newFalseAnswer: action.falseAnswer,
      };
    default:
      return state;
  }
}

// Combine all reducers
const rootReducer = combineReducers({
  wheel,
  quiz,
  selectedAnswer,
  infoMessage,
  form,
});

export default rootReducer;

