import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap';

function Login(){

  const form = {}
  const rememberme = false
  const [ errors, setErrors ] = useState({})
  const user = useSelector((state) => state.user.user)

  // document.cookie = "csrftoken="+data.token

  const validation = (login) => {
    const { username, password } = form
    const newErrors = {}

    let formValidated = true

    if ( !username || username === '' ) {
      formValidated = false
      newErrors.username = 'Podaj adres email!'
    } else if(!/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(username)) {
      formValidated = false 
      newErrors.username = 'Podano zły format! \'example@mail.com\''
    }

    if ( !password || password === '' ){
      formValidated = false  
      newErrors.password = 'Podaj hasło!'
    } else if(password.length < 8){
      formValidated = false  
      newErrors.password = 'Podano zakrótkie hasło!'
    }

    if (formValidated){
      // Sprawdzić czy konto aktywne
      // newErrors.login = 'Twoje konto nie zostało jeszcze aktywowane!'
      // Sprawdzić czy poprawne dane logowania
      // newErrors.login = 'Nazwa użytkownika lub hasło nie zgadzają się. Sprawdź jeszcze raz i spróbuj ponownie.'
    }

    return newErrors
  }

    // Metoda wykonywania po przycisnięciu 'Zaloguj'
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      // Logowanie
      
    
      // Ponowna weryfikacja błędów
      const newErrors = validation()
      setErrors(newErrors)
    }
  
  return (
    <>
      <div className="container h-100">
        {user.name}
        <div className="row h-100 justify-content-center align-items-center">
          <Form className="col-md-6">
            <Form.Group>
              <Form.Label>Adres Email</Form.Label>
              <Form.Control 
                type='text' name="username"
                onChange={ e => form.username = e.target.value }
                isInvalid={ !!errors.username }
              />
              <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <Form.Control 
                type='password' name="password"
                onChange={ e => form.password = e.target.value }
                isInvalid={ !!errors.password }
              />
              <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Alert variant={'danger'} show={ !!errors.login } type='invalid'>{ errors.login }</Alert>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Check type="checkbox" label="Zapamiętaj mnie!" onChange={ e => !rememberme }/>
            </Form.Group>
            <Form.Group className="text-center mt-3">
              <Button className="rounded-pill col-6" type='submit' onClick={ handleSubmit }>Zaloguj</Button>
            </Form.Group>
            <Form.Group className="text-center">
              Nie posiadasz konta? <a href="../register" id="signup">Zarejestruj się</a>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login;
