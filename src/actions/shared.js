import { showLoading, hideLoading } from 'react-redux-loading';
import { getInitialData } from '../utils/api';
import { getUsers } from './RecieveUsers';
import { receiveQuestions } from './QuestionAction';

export function InitialData () {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(getUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading());
            })
    }
}
