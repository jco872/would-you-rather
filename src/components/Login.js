import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  componentDidMount() {
    this.props.dispatch(setAuthedUser(null));
  }  
 
  state = {
    user: '',
    id: this.props.location !== undefined ? this.props.location.id : null
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
      if (this.state.id !== undefined) {
        this.props.history.push(`questions/${this.state.id}`);
      } else {
        this.props.history.push('/');
      }
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
            <option value="tylermcginnis">Tyler McGinnis</option>                         
            <option value="sarahedo">Sara Hedo</option>       
            <option value="johndoe">John Doe</option>
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