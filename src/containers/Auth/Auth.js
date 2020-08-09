import React from 'react'
import classes from './Auth.module.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios'

export default class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Input correct Email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Input correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      },
    }
  }

  loginHandler = async () => {
    try {
      const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
        returnSecureToken: true
      }
      const response = await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8lljDYHMQPopvNbPKfQfLbaYeCizVkUw',
          authData
      )
      console.log(response)
    } catch (e) {
      console.log(e);
    }
  }

   registerHandler = async () => {
     try {
       const authData = {
         email: this.state.formControls.email.value,
         password: this.state.formControls.password.value,
         returnSecureToken: true
       }
       const response = await axios.post(
           'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8lljDYHMQPopvNbPKfQfLbaYeCizVkUw',
           authData
       )
       console.log(response)
     } catch (e) {
       console.log(e);
     }
   }

  onSubmit = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls)
        .map((controlName, index) => {
          const control = this.state.formControls[controlName]

          return (
            <Input
              key={controlName + index}
              type={control.type}
              value={control.value}
              valid={control.valid}
              touched={control.touched}
              label={control.label}
              errorMessage={control.errorMessage}
              shouldValidate={!!control.validation}
              onChange={event => this.onChangeHandler(event, controlName)}
            />
          )
        })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

          <form className={classes.AuthForm} onSubmit={this.onSubmit}>

            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Registration
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
