import {combineReducers} from 'redux'
import quizReducer from '../reducers/quiz'
import createReducer from '../reducers/create'
import authReducer from '../reducers/auth'

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer
})
