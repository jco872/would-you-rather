import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
} from './_DB.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion (info) {
  return _saveQuestion(info)
}