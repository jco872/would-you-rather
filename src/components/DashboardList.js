import React, { Component } from 'react'
import { connect, useStore } from 'react-redux'
import Question from './Question'

class DashboardList extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ul className='dashboard-list'>
        {this.props.questionIds && this.props.questionIds.map((id) => (
          <li key={id}>
            <Question id={id}/>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps (state, ownProps, authedUser) {
  console.log("authedUser: ", state.authedUser);

  
  let questionIds;
  let filteredQuestionIds;
  let allKeys = Object.keys(state.questions);
  let { questions } = state;

  console.log("first one: ", questions[allKeys[0]].optionOne.votes.length);
  console.log("ownProps: ", ownProps);

  if (ownProps.questionCategory === "answered") {
    filteredQuestionIds = allKeys.filter(id => (questions[id].optionOne.votes.includes(state.authedUser) || questions[id].optionTwo.votes.includes(state.authedUser)))
  } else {  
    filteredQuestionIds = allKeys.filter(id => (!questions[id].optionOne.votes.includes(state.authedUser) && !questions[id].optionTwo.votes.includes(state.authedUser)))
  }

  return {
    questionIds: filteredQuestionIds.sort((a,b) => state.questions[b].timestamp - state.questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(DashboardList)