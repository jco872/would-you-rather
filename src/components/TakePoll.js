import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class TakePoll extends Component {
  constructor() {
    super();

    this.state = {
      selectedOption: 'optionOne'
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.submitVote = this.submitVote.bind(this);
  }

  submitVote = (e) => {
    e.preventDefault()

    this.props.dispatch(handleSaveQuestionAnswer(this.props.id, this.state.selectedOption)).then(() =>
    {
      this.props.history.push(`/questions/${this.props.id}`);
    });
  }

  onValueChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }

  render() {
    const { formattedquestion } = this.props

    if (formattedquestion === null) {
      return <p>This Question doesn't existd</p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
    } = formattedquestion

    return (
      <div className='question'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar-large'
        />
        <div className='question-info'>
          <div>
            <span>{name} asks:</span>
            
            <div style={{fontSize: 22}}>Would you rather?</div>
              <div>
                <input type="radio" checked={this.state.selectedOption === "optionOne"} 
                       value='optionOne' onChange={this.onValueChange} />
                <label for="questionOne">{this.props.question.optionOne.text}</label>
              </div>

              <div>
                <input type="radio" checked={this.state.selectedOption === "optionTwo"} 
                       value='optionTwo' onChange={this.onValueChange} />
                <label for="questionTwo">{this.props.question.optionTwo.text}</label>
              </div>

          </div>
          <div className='question-icons'>
            <button className='submit-button' onClick={this.submitVote}>Submit</button>       
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
    formattedquestion: question
      ? formatQuestion(question, users[question.author], authedUser, parentQuestion)
      : null,
    question,
    id
  }
}

export default withRouter(connect(mapStateToProps)(TakePoll))