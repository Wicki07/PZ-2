import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, InputGroup } from 'react-bootstrap';

function UserForm(props){

  const [ errors, setErrors ] = useState({})
  const [ form, setForm ] = useState({})

  const validation = async (e) => {
    e.preventDefault();
    const { first_name, last_name, phone } = form
    const newErrors = {}

    let formValidated = true

    if( !/^[A-ZĘÓŁŚĄŻŹĆŃ]+[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]{3,}$/.test(first_name)){
      formValidated = false
      newErrors.first_name = 'Podano błędne imie! Powinno zaczynać się z wielkiej litery i nie zawierac cyfr.'
    }
    if ( !first_name || first_name === '' ) {
      formValidated = false
      newErrors.first_name = 'Podaj imię!'
    }
    
    if( !/^([A-ZĘÓŁŚĄŻŹĆŃ]+[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ][a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ\-\s]+){1,}$/.test(last_name)){
      formValidated = false
      newErrors.last_name = 'Podano błędne nazwisko! Powinno zaczynać się z wielkiej litery i nie zawierac cyfr.'
    }
    if ( !last_name || last_name === '' ) {
      formValidated = false
      newErrors.last_name = 'Podaj nazwisko!'
    }

    if((phone && phone !== '' ) && !/^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/gm.test(phone)){
      formValidated = false
      newErrors.phone = 'Zły format telefonu!'
    }

    // Rejestracja
    newErrors.requestErrors = undefined
    if(formValidated){
      await fetch("http://localhost:8000/api/auth/requestErrors", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', "Accept": "application/json",},
        body: JSON.stringify({...form, 
          role: 'user',
          isBusiness: false}) 
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
        <Form.Label>Imię</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control 
            type='text' name="first_name"
            onChange={ e => setForm({...form, first_name: e.target.value}) }
            isInvalid={ !!errors.first_name }
          />
          <Form.Control.Feedback type='invalid'>{ errors.first_name }</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>Nazwisko</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control 
            type='text' name="last_name"
            onChange={ e => setForm({...form, last_name: e.target.value}) }
            isInvalid={ !!errors.last_name }
          />
          <Form.Control.Feedback type='invalid'>{ errors.last_name }</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>Numer telefonu</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control 
            type='tel' name="phone"
            onChange={ e => setForm({...form, phone: e.target.value}) }
            isInvalid={ !!errors.phone }
          />
          <Form.Control.Feedback type='invalid'>{ errors.phone }</Form.Control.Feedback>
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

export default UserForm;