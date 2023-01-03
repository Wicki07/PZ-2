import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, InputGroup } from 'react-bootstrap';

function InstitutionForm(props){

  const [ errors, setErrors ] = useState({})
  const [ form, setForm ] = useState({})

  const validation = async (e) => {
    e.preventDefault();
    const { email } = form
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

    // Rejestracja
    newErrors.requestErrors = undefined
    if(formValidated){
      await fetch("http://localhost:8000/api/auth/requestErrors", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', "Accept": "application/json",},
        body: JSON.stringify({...form, 
          role: 'business',
          isBusiness: true}) 
      }).then(async (res) => {
        const data = await res.json();
        if(res.status === 400) {
          newErrors.requestErrors = data.email[0] === "Istnieje już User z tą wartością pola adres email." ? 
            "Użytkownik o podanym emailu już istnieje" : ""
        } else {
          props.setShowModal(true);
          setForm({})
        }
      })
    }

    setErrors(newErrors)

    return newErrors
  }

  return (
    <>
      <Form.Group>
        <Form.Label>Adres Email</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control 
            type='email' name="email"
            onChange={ e => setForm({...form, email: e.target.value}) }
            isInvalid={ !!errors.email }
          />
          <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Alert variant={'danger'} show={ !!errors.requestErrors } type='invalid'>{ errors.requestErrors }</Alert>
      </Form.Group>
      <Form.Group className="text-center pt-4">
        <Button className="rounded-pill col-6" type='submit' onClick={ validation }>Zapisz zmiany</Button>
      </Form.Group>
    </>
  )
}

export default InstitutionForm;