import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardList from './DashboardList'

class Dashboard extends Component {
  state = {
    questionCategory: "",
    unansweredStyle: "question-nav-link question-nav-link-active",
    answeredStyle: "question-nav-link"
  }
 
  refreshQuestions = (e) => {
    e.preventDefault();

    let unansweredStyle;
    let answeredStyle;

    if (e.target.id === "answered") {
      unansweredStyle = "question-nav-link";
      answeredStyle = "question-nav-link question-nav-link-active";
    } else {
      unansweredStyle = "question-nav-link question-nav-link-active";
      answeredStyle = "question-nav-link";
    }
    // access to e.target here
    this.setState({
      questionCategory: e.target.id,
      answeredStyle,
      unansweredStyle
    })
  }

  render() {
    return (
      <div>
        <div className="question-nav">
          <a className={this.state.unansweredStyle} id="unanswered" href="" onClick={this.refreshQuestions}>Unanswered Questions</a>&nbsp;|&nbsp; 
          <a className={this.state.answeredStyle} onClick={this.refreshQuestions} id="answered" href="">Answered Questions</a>
        </div>
        
        <DashboardList questionCategory={this.state.questionCategory} />
      </div>
    )
  }
}

export default connect(null)(Dashboard)