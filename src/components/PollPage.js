import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewPoll from './ViewPoll'
import TakePoll from './TakePoll'
import { Redirect } from 'react-router-dom'

class PollPage extends Component {
  render() {
    const { question, authedUser, id } = this.props
    let content;

    console.log("this.props: ", this.props);

    if (authedUser === null) {
      content = (
        <Redirect to={{ pathname: '/login', id: id }} />
      )
    } 
    else if (question === undefined) {
      content = (
        <Redirect to={{ pathname: '/unknown' }} />
      )
    }  
    else if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
      content = (
        <ViewPoll id={id} />
      )
    } else {
      content = (
        <TakePoll id={id} />
      )
    }

    return (
      <div>      
        {content}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  
  let question = questions[id];

  return {
    id,
    question,
    authedUser
  }
}

export default connect(mapStateToProps)(PollPage)