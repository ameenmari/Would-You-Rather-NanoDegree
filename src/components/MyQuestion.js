import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { AddQuestionAnswer } from '../actions/QuestionAction';


class MyQuestion extends Component {
    state={
        Questionselected: '' 
    }

    handleOptionSelect = (value) => { 
        this.setState(()=> ({
            Questionselected: value
        }))
    }


Submit = (e) => { 
        e.preventDefault();
        const { Questionselected } = this.state;
        const { dispatch, id } = this.props;

        dispatch(AddQuestionAnswer(id, Questionselected));
    }


    render () {
        const { CurrentQuestion, currentAuthor, userDetail, detailed,id  } = this.props;
            
        
        return (
            <Paper className='question-container'>
                
                    <Link to={`/questions/${id}`}>
                            Would you rather  <b>{CurrentQuestion.optionOne.text}</b> or <b>{CurrentQuestion.optionTwo.text}</b>                        
                    </Link>
                


                <div >
                    <Avatar alt={currentAuthor.name} src={currentAuthor.avatarURL} />
                        {currentAuthor.name} | {' '}

                        {new Date(CurrentQuestion.timestamp).toLocaleDateString()}
                    
                </div>
                
                {userDetail.answers[CurrentQuestion.id]
                    ? 
                        <div>
                            
                                Selected <b>{CurrentQuestion[userDetail.answers[CurrentQuestion.id]].text}</b>
                           
                            <br />

                            {detailed && 
                                <div>
                                    
                                        {CurrentQuestion.optionOne.text} {' '}
                                        (Votes: {CurrentQuestion.optionOne.votes.length} | 
                                        Percentage: {((CurrentQuestion.optionOne.votes.length/(CurrentQuestion.optionOne.votes.length+CurrentQuestion.optionTwo.votes.length))*100).toFixed()}%)
                                   
                                  
                                    <br />
                                    
                                        {CurrentQuestion.optionTwo.text} {' '}
                                        (Votes: {CurrentQuestion.optionTwo.votes.length} | 
                                        Percentage: {((CurrentQuestion.optionTwo.votes.length/(CurrentQuestion.optionOne.votes.length+CurrentQuestion.optionTwo.votes.length))*100).toFixed()}%)
                                   
                                   
                                </div>
                            }
                        </div>
                
                
                
                    : 
                    <span>
                        
                        {detailed && 
                            <form onSubmit={this.Submit}>
                                
                                    <RadioGroup
                                        
                                        value={this.state.Questionselected}
                                        onChange={(e)=>this.handleOptionSelect(e.currentTarget.value)}
                                    >
                                        <FormControlLabel value="optionOne" control={<Radio />} label={CurrentQuestion.optionOne.text} />
                                        <FormControlLabel value="optionTwo" control={<Radio />} label={CurrentQuestion.optionTwo.text} />
                                    </RadioGroup>
                                
                                <br />
                
                                <Button 
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        }
                    </span>
                }
            </Paper>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
   
   
    const CurrentQuestion = questions[id];
    const currentAuthor = CurrentQuestion ? users[CurrentQuestion.author] : '';
    const userDetail = users[authedUser];

    return {
        CurrentQuestion,
        currentAuthor,
        userDetail
    }
}

export default withRouter(connect(mapStateToProps)(MyQuestion));