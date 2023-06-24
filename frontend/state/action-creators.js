export const MOVE_CLOCKWISE = 'MOVE_CLOCKWISE';
export const MOVE_COUNTERCLOCKWISE = 'MOVE_COUNTERCLOCKWISE';
export const SET_SELECTED_ANSWER = 'SET_SELECTED_ANSWER';
export const SET_INFO_MESSAGE = 'SET_INFO_MESSAGE';
export const SET_QUIZ_INTO_STATE = 'SET_QUIZ_INTO_STATE';
export const INPUT_CHANGE = 'INPUT_CHANGE';
export const RESET_FORM = 'RESET_FORM';
export const SET_CORRECT_ANSWER_MESSAGE = 'SET_CORRECT_ANSWER_MESSAGE';
export const SET_INCORRECT_ANSWER_MESSAGE = 'SET_INCORRECT_ANSWER_MESSAGE';

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE,
  };
}

export function selectAnswer(answerId) {
  return {
    type: SET_SELECTED_ANSWER,
    answerId,
  };
}

export function setMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    message,
  };
}

export function setCorrectAnswerMessage() {
  return {
    type: SET_INFO_MESSAGE,
    message: 'Nice job! That was the correct answer.',
  };
}

export function setIncorrectAnswerMessage() {
  return {
    type: SET_INFO_MESSAGE,
    message: 'What a shame! That was the incorrect answer.',
  };
}

export function setQuiz(quiz) {
  return {
    type: SET_QUIZ_INTO_STATE,
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

export function fetchQuiz() {
  return function(dispatch) {

    fetch('http://localhost:9000/api/quiz/next')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const quiz = {
          quiz_id: data.quiz_id,
          question_text: data.question_text,
          answers: data.answers.map(answer => ({
            answer_id: answer.answer_id,
            text: answer.text,
          }))
        }
        dispatch(setQuiz(quiz)); // Set fetched quiz into state
      })
      .catch(error => {
        console.log('Error fetching quiz:', error);
        // Dispatch an action to handle error cases if needed
      });
  };
}

export function postAnswer(quizId, answerId) {
  return function(dispatch) {
    const payload = {
      quiz_id: quizId,
      answer_id: answerId,
    };
    
    fetch('http://localhost:9000/api/quiz/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {throw err;});
      }
      return response.json();
    })
    .then(data => {
      // Handling the response based on the message
      dispatch(setMessage(data.message));

      // Fetch the next quiz
      // This ensures that the next quiz is only fetched after the answer has been successfully posted
      dispatch(fetchQuiz());
    })
    .catch(error => {
      console.log('Error posting answer:', error);
      dispatch(setMessage('Error submitting answer.'));
    });
  }
}    

export function postQuiz(questionText, trueAnswerText, falseAnswerText) {
  return function(dispatch) {
    const payload = {
      question_text: questionText,
      true_answer_text: trueAnswerText,
      false_answer_text: falseAnswerText,
    };

    fetch('http://localhost:9000/api/quiz/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Handle response and dispatch appropriate actions
        if (data.success) {
          const message = `Congrats: "${questionText}" is a great question!`;
          dispatch(setMessage(message));
          dispatch(resetForm());
        } else {
          dispatch(setMessage('Error submitting new quiz.'));
        }
      })
      .catch(error => {
        console.log('Error posting new quiz:', error);
        dispatch(setMessage('Error submitting new quiz.'));
        // Dispatch an action to handle error cases if needed
      });
  };
}