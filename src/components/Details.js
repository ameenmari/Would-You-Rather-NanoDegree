
import React from 'react';
import { connect } from 'react-redux';
import MyQuestion from './MyQuestion';

const Details = props => (

    <div >
        <MyQuestion id={props.match.params.id} detailed/>
    </div>
)
export default connect()(Details);