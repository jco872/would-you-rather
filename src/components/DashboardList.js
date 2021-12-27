import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardQuestion from './DashboardQuestion'

class DashboardList extends Component {
  render() {
    return (
      <ul className='dashboard-list'>
        {this.props.questionIds && this.props.questionIds.map((id) => (
          <li key={id}>
            <DashboardQuestion id={id} />
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps (state, ownProps) { 
  let filteredQuestionIds;
  let allKeys = Object.keys(state.questions);
  let { questions } = state;

  if (ownProps.questionCategory === "answered") {
    filteredQuestionIds = allKeys.filter(id => (questions[id].optionOne.votes.includes(state.authedUser) || questions[id].optionTwo.votes.includes(state.authedUser)))
  } else {  
    filteredQuestionIds = allKeys.filter(id => (!questions[id].optionOne.votes.includes(state.authedUser) && !questions[id].optionTwo.votes.includes(state.authedUser)))
  }

  return {
    questionIds: filteredQuestionIds.sort((a,b) => state.questions[b].timestamp - state.questions[a].timestamp),
    questionType: ownProps.questionCategory
  }
}

export default connect(mapStateToProps)(DashboardList)