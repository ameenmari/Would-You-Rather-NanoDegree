import React from 'react'
import MyLeaderboard from './MyLeaderboard'
import MainPage from './MainPage'
import Details from './Details'
import AddNewQuestion from './AddNewQuestion'
import {Route } from 'react-router-dom'

class Routers extends React.Component{

    render(){
        return  <div>
        <Route path='/' exact component={MainPage} />
        <Route path='/questions/:id' component={Details} />
        <Route path='/add' component={AddNewQuestion} />
        <Route path='/leaderboard' component={MyLeaderboard} />
      </div>
    }

}
export default Routers