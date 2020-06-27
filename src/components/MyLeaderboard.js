

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PointsTable from './PointsTable.js';
import {  List } from 'semantic-ui-react'

class MyLeaderboard extends Component {
  
  render() {
    const { Data } = this.props;

    return (
      <div className='container'>
        <List celled padded unstackable>  
          {Data.map(data => {
            return <PointsTable key={data.id} data={data} />
          })}
        </List>
      
      </div>
    )
  }
}

function Props({users}) {
  const Data = Object.keys(users).map((user) => {
    let numberAnswers = Object.keys(users[user].answers).length;
    let numberQuestions = Object.keys(users[user].questions).length;
    let data = {
      'numberAnswers': numberAnswers,
      'numberQuestions': numberQuestions,
      'score' : numberAnswers + numberQuestions
    }
    return Object.assign( users[user], data)
    }).sort((a,b) => b.total - a.total);

  return {
    'Data': Data
  }
}

export default connect(Props)(MyLeaderboard)


