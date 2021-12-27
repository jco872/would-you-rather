import React from 'react';

function UserSummary(props) {
  return (
    <div className='question'>
      <img
        src={props.userSummary.avatar}
        alt={`Avatar of ${props.name}`}
        className='avatar'
      />
      <div className='question-info'>
        <div>
          <h2>{props.userSummary.name}</h2>
          <table className="leaderboard">
          <tr> 
            <td></td>
            <td></td>           
            <td>Score</td>            
          </tr>          
          <tr>            
            <td>Answered questions</td>
            <td>{props.userSummary.answeredQuestions}</td>
            <td rowspan="2">{props.userSummary.score}</td>
          </tr>
          <tr>
            <td>Created questions</td>
            <td>{props.userSummary.createdQuestions}</td>
          </tr>
          </table>
        </div>
        
      </div>
    </div>
  )
}

export default UserSummary;