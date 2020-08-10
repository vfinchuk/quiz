import React, {Component} from 'react'
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'


export default class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
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
    const links = [
      {to: '/', title: 'List', exact: true},
    ]

    if (this.props.isAuthenticated) {
      links.push(
          {to: '/quiz-creator', title: 'Create quiz', exact: false},
          {to: '/logout', title: 'Logout', exact: false},
      )
    } else {
      links.push(
          {to: '/auth', title: 'Login', exact: false},
      )
    }

    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {
          this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null
        }
      </React.Fragment>
    )
  }
}
