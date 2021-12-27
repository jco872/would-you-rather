import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false, 
  }
  
  handleChangOptionOne = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }

  handleChangOptionTwo = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div style={{width: 500, margin: 'auto'}}>
      
        <h1 className='center'>Create New Question</h1>

        <p style={{fontWeight: 'bold'}}>
          Complete the question
        </p>

        <div style={{marginTop: 20, fontSize: 18 }}>
          <p style={{fontWeight: 'bold'}}>Would you rather...</p>

          <form className='new-question' onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter Option One Text Here"
            value={optionOneText}
            onChange={this.handleChangOptionOne}
            className='text'
          />

          <div style={{textAlign: 'center', fontWeight: 'bold', margin: 20}}>OR</div>

          <input
            placeholder="Enter Option Two Text Here"
            value={optionTwoText}
            onChange={this.handleChangOptionTwo}
            className='text'
          />

          <div style={{marginTop: 14}}>
            <button
              className='submit-button'
              type='submit'
              disabled={optionOneText === '' || optionTwoText === ''}>
                Submit
            </button>
          </div>
        </form>

        </div>
        
        
      </div>
    )
  }
}

export default connect()(NewQuestion)