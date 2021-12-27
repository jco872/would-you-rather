import { RECEIVE_QUESTIONS, TOGGLE_TWEET, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
        }
      }
    case ADD_QUESTION :
      const { question } = action

      return {
        ...state,
        [action.question.id]: action.question,
      }
    default :
      return state
  }
}