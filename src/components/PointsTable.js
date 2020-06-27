import React from 'react'
import { Table } from 'semantic-ui-react'
import Avatar from '@material-ui/core/Avatar';


export default function PointsTable(props) {
  const {  name, avatarURL, numberAnswers, numberQuestions, score } = props.data
  return (
  
    <div >
                    <Avatar alt={name} src={avatarURL} />
                        {name} | {' '}
                        <div>Question created : {numberQuestions} </div>
                        <div>Answered Questions: {numberAnswers} </div>
                        <div> total Score : {score}</div>

                    
                </div>
  )
}