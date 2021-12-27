import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Nav extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leader' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>    
          <li style={{verticalAlign: 'top', paddingLeft: 50, paddingRight: 50 }}>
            {this.props.loggedInUser && 
              <Fragment>
                <span style={{verticalAlign: 'top'}}>Hello, {this.props.loggedInUser}  </span>     

                <img style={{marginTop: -15, marginLeft: 5}} width="50px" src={this.props.avatar} />          
               </Fragment>
            }

          </li>
          <li>
            {this.props.authedUser &&
            <NavLink to='/login' activeClassName='active'>
              Logout
            </NavLink>
          }
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  let user = users[authedUser];

  let avatar = user ? user.avatarURL : "";
    
  return {
    authedUser: user,
    avatar
  }
}

export default withRouter(connect(mapStateToProps)(Nav))