import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { withRouter } from 'react-router-dom'

class ViewPoll extends Component {
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/questions/${id}`)
  }

  format(perc) {
    if (perc  % 1 !== 0) {
      return perc.toFixed(2);
    } else {
      return perc;
    }
  }

  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This Question doesn't existd</p>
    }

    const {
      name, avatar
    } = question

    let topClass = "top-result";
    let bottomClass = "bottom-result";

    if (this.props.myVote === "one") {
      topClass += " my-selection";
    } else {
      bottomClass += " my-selection";
    }

    const optionOnePerc = this.format(this.props.optionOne.percent).toString() + '%';
    const optionTwoPerc = this.format(this.props.optionTwo.percent).toString() + '%';

    
    let backgroundBarColor = '#CBDCDB';
    let percentBarColorBottom = '#4EBEA5';
    let percentBarColorTop =  '#4EBEA5';
    
    if (optionOnePerc === '0%') {
      percentBarColorTop ='#CBDCDB';
    }

    if (optionTwoPerc === '0%') {
      percentBarColorBottom ='#CBDCDB';
    }

    console.log("percentBarColorTop: ", percentBarColorTop);

    return (
      <div className='question'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='question-info'>
            <div style={{fontWeight: 'bold'}}>Asked by {name}</div>
            
            <div style={{fontWeight: 'bold', marginTop: 19, fontSize: 19}}>Results:</div>

            <div className={topClass}>
              <p>Would you rather {this.props.optionOne.text}?</p>

              <div>
                <div style={{marginBottom: 10, fontWeight: 'bold', textAlign: 'center', backgroundColor: backgroundBarColor}}>
                  <div style={{color: 'white', backgroundColor: percentBarColorTop, textAlign: 'right', padding: 4, width: optionOnePerc }}>
                    {optionOnePerc}
                  </div>
                </div>
                <div style={{fontWeight: 'bold', textAlign: 'center'}}>{this.props.optionOne.votes} out of {this.props.totalVotes} votes</div>
                <div className="your-choice">
                  
                  </div>
              </div>
            </div>

            <div className={bottomClass}>
              <p>Would you rather {this.props.optionTwo.text}?</p>

              <div>
                <div style={{marginBottom: 10, fontWeight: 'bold', textAlign: 'center', backgroundColor: backgroundBarColor}}>
                  <div style={{color: 'white', backgroundColor: percentBarColorBottom, textAlign: 'right', padding: 4, width: optionTwoPerc }}>
                    {optionTwoPerc}
                  </div>
                </div>
                <div style={{fontWeight: 'bold', textAlign: 'center'}}>{this.props.optionTwo.votes} out of {this.props.totalVotes} votes</div>
                <div className="your-choice">
                  
                </div>
              </div>
            </div>
   
        </div>
      </div>
    )
  } 
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const parentQuestion = null
  const question = questions[id]  
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
  let myVote = question.optionOne.votes.includes(authedUser) ? "one" : "two";

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser, parentQuestion)
      : null,
    optionOne: { 
      text: question.optionOne.text, 
      votes: question.optionOne.votes.length,
      percent: (question.optionOne.votes.length / totalVotes) * 100,
      },
    optionTwo: { 
      text: question.optionTwo.text, 
      votes: question.optionTwo.votes.length,
      percent: (question.optionTwo.votes.length / totalVotes) * 100,
      },      
    totalVotes,
    myVote
  }
}

export default withRouter(connect(mapStateToProps)(ViewPoll))