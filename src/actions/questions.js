import { saveLikeToggle, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (tweet) {
  return {
    type: ADD_QUESTION,
    tweet,
  }
}

export function handleAddQuestion (text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      text,
      author: authedUser,
      replyingTo
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (tweets) {
  return {
    type: RECEIVE_QUESTIONS,
    tweets,
  }
}