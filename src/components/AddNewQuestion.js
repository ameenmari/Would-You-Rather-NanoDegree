import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Segment } from 'semantic-ui-react'
import { handleAddQuestion } from '../actions/QuestionAction';

class AddNewQuestion extends React.Component {
  
  
    state={
        optionOneText: '',
        optionTwoText: '',
        toHomePage:false
      }
    
      handleChange = (e) => {
        const option = e.target.name;
        this.setState(({
          [option]: e.target.value
        }));
      }

  

    handleSubmit = (e) => {
        e.preventDefault();


    const {dispatch} = this.props
    
    const {optionOneText, optionTwoText} = this.state;

        dispatch(handleAddQuestion(optionOneText, optionTwoText));

        this.setState(() => ({
            toHomePage: true 
        }))
        
    }

    render() {
        const { toHomePage } = this.state;
        const IsDisabled = this.state.optionOneText !== '' && this.state.optionTwoText !== '';

        if(toHomePage) 
            return <Redirect to='/' />


        return (
            
            <Segment>
            <h2>Would You Rather:</h2>
              <Form onSubmit={this.handleSubmit} style={{maxWidth: '450px', margin: '0 auto'}}>
                <Form.Input 
                  label='First Option' 
                  name='optionOneText'
                  placeholder='Do this' 
                  onChange={this.handleChange}
                  value={this.state.optionOneText}
                 />
                <Form.Input 
                label='Second Option'
                name='optionTwoText'
                placeholder='Do that'
                onChange={this.handleChange}
                value={this.state.optionTwoText}
                />
                <Form.Button color='green' disabled={!IsDisabled}>Submit Question</Form.Button>
              </Form>
              </Segment>
        
        )
    }
}

export default connect()(AddNewQuestion);