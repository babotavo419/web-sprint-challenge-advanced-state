import { combineReducers } from 'redux';
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  SET_CORRECT_ANSWER_MESSAGE,
  SET_INCORRECT_ANSWER_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from '../state/action-types';

// Initial state values
const initialWheelState = 0;
const initialQuizState = {
  quiz_id: '',
  question: '',
  answers: [],
};

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
    case MOVE_CLOCKWISE:
      return (state + 1) % 6;
    case MOVE_COUNTERCLOCKWISE:
      return (state - 1 + 6) % 6;
    default:
      return state;
  }
}

// Reducer for quiz state
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return {
        ...state,
        quiz_id: action.quiz.quiz_id,
        question: action.quiz.question,
        answers: action.quiz.answers,
      };
    default:
      return state;
  }
}

// Reducer for selected answer state
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return action.answerId;
    default:
      return state;
 
  }

}

// Reducer for info message state
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.message;
    case SET_CORRECT_ANSWER_MESSAGE:
      return 'Nice job! That was the correct answer.';
    case SET_INCORRECT_ANSWER_MESSAGE:
      return 'What a shame! That was the incorrect answer.';
    default:
      return state;
  }
}

// Reducer for form state
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.fieldName]: action.value,
      };
    case RESET_FORM:
      return initialFormState;
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

