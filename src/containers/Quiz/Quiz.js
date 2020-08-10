import React, {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {
  fetchQuizById,
  quizAnswerClick,
  quizRetry
} from '../../store/actions/quiz'

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchedQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.quizRetry()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answers question</h1>

          {
            this.props.loading || !this.props.quiz
            ? <Loader />
            : this.props.isFinished
              ? <FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz}
                onRetry={this.props.quizRetry}
              />
              : <ActiveQuiz
                answers={this.props.quiz[this.props.activeQuestion].answers}
                question={this.props.quiz[this.props.activeQuestion].question}
                quizLength={this.props.quiz.length}
                activeQuestion={this.props.activeQuestion + 1}
                onAnswerClick={this.props.quizAnswerClick}
                state={this.props.answerState}
              />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchedQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    quizRetry: () => dispatch(quizRetry())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
