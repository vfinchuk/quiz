import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" component={QuizList} exact/>
          <Route path="/auth" component={Auth}/>
          <Route path="/quiz-creator" component={QuizCreator}/>
          <Route path="/quiz/:id" component={Quiz}/>
        </Switch>
      </Layout>
    )
  }
}
