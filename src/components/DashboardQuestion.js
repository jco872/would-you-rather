import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import { withRouter } from 'react-router-dom'

class DashboardQuestion extends Component {
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/questions/${id}`)
  }
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This Tweet doesn't existd</p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
    } = question

    return (
      <div className='question'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <span>{name} asks:</span>
            
            <div>Would you rather?</div>

            <p>...{text.substring(0, 15)}...</p>
          </div>
          <div className='question-icons'>
            <button style={{width: 95, marginTop: 5, padding: 8}} onClick={() => this.props.history.push(`/questions/${id}`) }>View Poll</button>       
          </div>
        </div>
      </div>
    )
  } 
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const parentQuestion = question ? questions[question.replyingTo] : null

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser, parentQuestion)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(DashboardQuestion))