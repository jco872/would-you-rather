import React, { Component } from 'react'
import { connect, useStore } from 'react-redux'
import DashboardList from './DashboardList'

class Dashboard extends Component {
  constructor() {
    super();
  }

  state = {
    questionCategory: ""
  }
 
  refreshQuestions = (e) => {
    e.preventDefault();

    // access to e.target here
    this.setState({
      questionCategory: e.target.id
    })
  }

  render() {
    return (
      <div>
        <div className="question-nav">
          <a id="unanswered" href="" onClick={this.refreshQuestions}>Unanswered Questions</a> | <a onClick={this.refreshQuestions} id="answered" href="">Answered Questions</a>
        </div>
        
        <DashboardList questionCategory={this.state.questionCategory} />
      </div>
    )
  }
}

export default connect(null)(Dashboard)