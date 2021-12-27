import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserSummary from './UserSummary'

class Leaderboard extends Component {
   render() {
    const { users } = this.props;

    let userIds = Object.keys(users);
    let userSummayData =
      userIds.map(id => {
        let user = users[id];
        const { questions, answers } = user;
        const score = questions.length + Object.keys(answers).length;

        let userSummary = { 
          name: user.name,
          avatar: user.avatarURL,
          createdQuestions: questions.length,
          answeredQuestions: Object.keys(answers).length,
          score
        }

        return userSummary
      }).sort((a,b) =>b.score - a.score);

    let userSummary = userSummayData.map(userSummary => 
      <div style={{marginTop: 5}}>
        <UserSummary userSummary={userSummary} />
      </div>
    );

    return (
      <div style={{width: 500, margin: 'auto'}}>      
        {userSummary}
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)