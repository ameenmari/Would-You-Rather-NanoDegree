
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyQuestion from './MyQuestion';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class MainPage extends Component {

    Change = (event, currentValue) => { 
        this.setState({ currentValue });
    }

    state = {
        currentValue: 0, 
    }
    
    render () {
        const { currentValue } = this.state;

        return (
            <div >
                 <Tabs value={currentValue} onChange={this.Change} left>
                        <Tab label="Answer This Question" />
                        <Tab label="Already Answered" />
                    </Tabs>
                
                {currentValue === 0 && 
                    <div>
                            {this.props.unanswQuestion.map(id => (
                                    <MyQuestion id={id} />
                             ) )}
                    </div>
                }
     
                {currentValue === 1 &&  
                    <div>
                            {this.props.ansQuestion.map(id => (
                                    <MyQuestion id={id} />
                           
                                     ))}
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps ({ questions, authedUser, users }) {
    const ansQuestion = Object.keys(users[authedUser].answers).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);
    const unanswQuestion = Object.keys(questions).filter(q => !ansQuestion.includes(q)).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);

    return {
        ansQuestion,
        unanswQuestion
    }
}

export default connect(mapStateToProps)(MainPage);