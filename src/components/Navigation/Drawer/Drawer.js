import React, {Component} from 'react'
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

const links = [
  {to: '/', title: 'List', exact: true},
  {to: '/auth', title: 'Authorization', exact: false},
  {to: '/quiz-creator', title: 'Create quiz', exact: false},
]

export default class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index} >
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.title}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {
          this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null
        }
      </React.Fragment>
    )
  }
}
