
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const Get_QUESTIONS = 'Get_QUESTIONS';
export const New_QUESTION = 'New_QUESTION';
export const New_QUESTION_ANSWER = 'New_QUESTION_ANSWER';


export function receiveQuestions(questions) {
    return {
        type: Get_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: New_QUESTION,
        question
    }
}

export function handleAddQuestion(optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestion({
            optionOne,
            optionTwo,
            author: authedUser
        })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}

export function newQuestion(authedUser, qid, answer) {
    return {
        type: New_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function AddQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        .then(() => dispatch(newQuestion(authedUser, qid, answer)))
        .then(() => dispatch(hideLoading()))
    }
}