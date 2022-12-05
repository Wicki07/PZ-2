import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch  } from 'react-redux'
import { redirect } from "react-router-dom";
import { setUser } from '../../store/userSlice'
import { Alert } from 'react-bootstrap';
import {axiosApi} from '../../axios'

function Login(){

  const rememberme = false
  const [ errors, setErrors ] = useState({})
  const [ form, setForm ] = useState({})
  const dispatch = useDispatch()

  // document.cookie = "csrftoken="+data.token

  const validation = async () => {
    const { email, password } = form
    const newErrors = {}

    let formValidated = true

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formValidated = false
      newErrors.email = 'Podano zły format! \'example@mail.com\''
    }
    if ( !email || email === '' ) {
      formValidated = false
      newErrors.email = 'Podaj adres email!'
    }

    if ( !password || password === '' ){
      formValidated = false  
      newErrors.password = 'Podaj hasło!'
    } else if(password.length < 8){
      formValidated = false  
      newErrors.password = 'Podano zakrótkie hasło!'
    }

    if (formValidated){
      // await axiosApi.post("/api/auth/login", {
      //   ...form
      // }).then((res) => {
      //   console.log(res)
      //   localStorage.setItem("user", JSON.stringify(res.data));
      //   console.log(res.data)
      //   redirect("/");
      // }).catch(({response}) => {
      //   newErrors.login = response.data.non_field_errors[0]
      // })
      await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', "Accept": "application/json",},
        body: JSON.stringify(form) 
      }).then((res) => {
        console.log(res)
      })

    }

    return newErrors
  }

    // Metoda wykonywania po przycisnięciu 'Zaloguj'
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      // Logowanie
      
    
      // Ponowna weryfikacja błędów
      const newErrors = await validation()
      setErrors(newErrors)
      console.log(errors)
    }
  
  return (
    <>
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <Form className="col-md-6">
            <Form.Group>
              <Form.Label>Adres Email</Form.Label>
              <Form.Control 
                type='text' name="email"
                onChange={ e => setForm({...form, email: e.target.value })}
                isInvalid={ !!errors.username }
              />
              <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <Form.Control 
                type='password' name="password"
                onChange={ e => setForm({...form, password: e.target.value })}
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
