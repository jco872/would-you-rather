import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  componentDidMount() {
    this.props.dispatch(setAuthedUser(null));
  }  
  
  state = {
    user: '',
  }

  handleChange = (e) => {
    const user = e.target.value;

    this.setState(() => ({
      user
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { user } = this.state
   
    this.props.dispatch(setAuthedUser(user));

    this.setState(() => ({
      user: '',
    }), () => {
      this.props.history.push('/');
    })
  }

  render() {
    const { user } = this.state

    return (
      <div style={{marginTop: 20}}>
        <h3 className='center'>Welcome to the Would You Rather App!</h3>

        <p style={{textAlign: 'center'}}>Please sign in to continue</p>
        
        <form className='login-form' onSubmit={this.handleSubmit}>

        <select name="user" onChange={this.handleChange}>
          <option value="">- Select a User -</option> 
          <option value="jeffcounts">Jeff Counts</option>
          <option value="maxcounts">Max Counts</option>
          <option value="tylermcginnis">Tyler McGinnis</option>
          <option value="sarahedo">Sarah Edo</option>          
        </select>
        
          <button
             className='submit-button'
            type='submit'
            disabled={user === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login)