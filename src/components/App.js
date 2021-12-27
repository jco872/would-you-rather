import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import PollPage from './PollPage'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Unknown from './Unknown'
import Nav from './Nav'
import { showLoading } from 'react-redux-loading'
import { PrivateRoute } from './PrivateRoute';

class App extends Component {
  constructor() {
    super();
    
    this.logout = this.logout.bind(this);
    this.refreshQuestions = this.refreshQuestions.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  logout(e) {
    e.preventDefault();

    this.props.dispatch(showLoading());
  }

  refreshQuestions = (e) => {
    e.preventDefault();    
}

  render() {
    return (      
      <Router>        
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav loggedInUser={this.props.loggedInUser} logout={this.logout} />
                <div>   
                  <Switch>
                    <PrivateRoute exact path="/" component={Dashboard} 
                                  user={this.props.loggedInUser} />
                    <Route exact path='/questions/:id' component={PollPage} />                                                
                    <PrivateRoute exact path='/add' component={NewQuestion} user={this.props.loggedInUser} />
                    <PrivateRoute exact path='/leaderboard' component={Leaderboard} user={this.props.loggedInUser} />                 
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/unknown' component={Unknown} />
                    <Route path="*"><Login /></Route>            
                  </Switch>               
                </div>               
          </div>
        </Fragment>  
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  let loggedInUser = "";

   if (authedUser && users[authedUser]) {
    loggedInUser = users[authedUser].name;
  }

  return {
    loading: authedUser === null,
    loggedInUser,
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(App)