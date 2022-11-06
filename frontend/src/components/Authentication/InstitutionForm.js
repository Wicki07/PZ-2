import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, InputGroup } from 'react-bootstrap';

function InstitutionForm(props){

  const form = {}
  const [ errors, setErrors ] = useState({})


  // Walidacja formularza
  const validation = async () => {
    const { firstname, lastname, email, password, repassword, phone } = form
    const newErrors = {}

    let formValidated = true

    // FirstName errory
    // Zły format nazwiska
    //eslint-disable-next-line
    if( !/^[A-ZĘÓŁŚĄŻŹĆŃ]+[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]{3,}$/.test(firstname)){
      formValidated = false
      newErrors.firstname = 'Podano błędne imie! Powinno zaczynać się z wielkiej litery i nie zawierac cyfr.'
    }
    // Nie podano imienia
    if ( !firstname || firstname === '' ) {
      formValidated = false
      newErrors.firstname = 'Podaj imię!'
    }
    
    // LastName errory
    // Zły format nazwiska
    //eslint-disable-next-line
    if( !/^([A-ZĘÓŁŚĄŻŹĆŃ]+[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ][a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ\'\-\s]+){1,}$/.test(lastname)){
      formValidated = false
      newErrors.lastname = 'Podano błędne nazwisko! Powinno zaczynać się z wielkiej litery i nie zawierac cyfr.'
    }
    // Nie podano nazwiska
    if ( !lastname || lastname === '' ) {
      formValidated = false
      newErrors.lastname = 'Podaj nazwisko!'
    }

    // Email errory
    // Zły format/pattern email'a
    //eslint-disable-next-line
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formValidated = false
      newErrors.email = 'Podano zły format! \'example@mail.com\''
    }
    // Nie podano email'a
    if ( !email || email === '' ) {
      formValidated = false
      newErrors.email = 'Podaj adres email!'
    }

    // Password errory
    // Nie podano hasła
    if ( !password || password === '' ) {
      formValidated = false
      newErrors.password = ['Podaj hasło!']
    }
    else{
      const passwordRegexValidations = []
      // Hasło zakrótkie (min. 8 znaków)
      if(password.length < 8) {
        passwordRegexValidations.push('Hasło musi zkładać się z 8-u znaków!')
      }
      // Brak wielkiej litery
      //eslint-disable-next-line
      if(!/\w*[A-ZĘÓŁŚĄŻŹĆŃ]\w*/g.test(password)) {
        passwordRegexValidations.push('Hasło musi zawierać przynajmniej jedną dużą literę!')
      }
      // Brak cyfry
      //eslint-disable-next-line
      if(!/\w*[0-9]\w*/g.test(password)) {
        passwordRegexValidations.push('Hasło musi zawierać przynajmniej jedną cyfrę!')
      }
      // Jeżeli cokolwiek dodano do passwordRegexValidations - ustawiamy jako error
      if(passwordRegexValidations.length > 0){
        formValidated = false
        newErrors.password = passwordRegexValidations
      }
    }

    // RePassword errory
    // Hasła się nie zgadzają
    if ( password !== repassword ) {
      formValidated = false
      newErrors.repassword = 'Hasła się nie zgadzają!'
    }
    // Nie powtórzono hasła
    if ( !repassword || repassword === '' ) {
      formValidated = false
      newErrors.repassword = 'Powtórz hasło!'
    }

    // Phone errory
    // Jeżeli podamy numer telefonu to nalezy sprawdzić jego format
    //eslint-disable-next-line
    if((phone && phone !== '' ) && !/^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/gm.test(phone)){
      // Obsługiwane formaty:
      // (123) 456-7890
      // (123)456-7890
      // 123-456-7890
      // 1234567890
      // +31636363634
      // +3(123) 123-12-12
      // +3(123)123-12-12
      // +3(123)1231212
      // +3(123) 12312123
      // +3(123) 123 12 12
      // 075-63546725
      // +7910 120 54 54
      // 910 120 54 54
      // 8 999 999 99 99
      formValidated = false
      newErrors.phone = 'Zły format telefonu!'
    }

    // Rejestracja
    newErrors.register = undefined
    if(formValidated){
      // Zwracanie odpowiedzi z zapytania do api
      // const registerReceive = await register()
      // if(registerReceive !== undefined){
      //   // Wystąpił błąd
      //   // Ustawiamy error do wyświetlenia
      //   newErrors.register = registerReceive
      // }else{
      //   // Nie wystąpił błąd
      //   // Pokazanie modal'u
      //   setShowModal(true)
      // }
    }
    setErrors(newErrors)

    return newErrors
  }
  
  // Logo nad formularzem
  //<Form.Group className="text-center pb-4 container-fluid">
  //  <Image src={Logo} style={{width:'50%', padding:'1rem'}}/>
  //</Form.Group>

  return (
    <>
<Form.Group>
              <Form.Label>Podaj nazwę</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control 
                  type='text' name="username"
                  onChange={ e => form.lastname = e.target.value }
                  isInvalid={ !!errors.username }
                />
                <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Adres Email</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control 
                  type='email' name="email"
                  onChange={ e => form.lastname = e.target.value }
                  isInvalid={ !!errors.email }
                />
                <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control 
                  type='password' name="password"
                  onChange={ e => form.lastname = e.target.value }
                  isInvalid={ !!errors.password }
                  data-toggle="password"
                />
                <Form.Control.Feedback style={{color:'gray', display:'block'}}>Hasło musi składać się z 8-miu znaków i zawierac wielką literę oraz cyfrę.</Form.Control.Feedback>
                {
                  errors.password?.map((suberror,index) => (
                    <Form.Control.Feedback key={index} type='invalid'>{ suberror }</Form.Control.Feedback>
                  ))
                }
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Powtórz hasło</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control 
                  type='password' name="repassword"
                  onChange={ e => form.lastname = e.target.value }
                  isInvalid={ !!errors.repassword }
                  data-toggle="repassword"
                />
                <Form.Control.Feedback type='invalid'>{ errors.repassword }</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Numer telefonu <i style={{color:'gray'}}>(opcjonalnie)</i></Form.Label>
              <InputGroup className="mb-3">
                <Form.Control 
                  type='tel' name="phone"
                  onChange={ e => form.lastname = e.target.value }
                  isInvalid={ !!errors.phone }
                />
                <Form.Control.Feedback type='invalid'>{ errors.phone }</Form.Control.Feedback>
             </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Kategoria</Form.Label>
              <Form.Control as="select" custom 
                  type='select' name="category"
                  onChange={ e => form.lastname = e.target.value }
                  isInvalid={ !!errors.category }
                >
                <option disabled selected hidden>Wybierz z listy...</option>
								<option value="Szkoła języków obych">Szkoła języków obych</option>
								<option value="Fitness">Fitness</option>
								<option value="Siłownia">Siłownia</option>
								<option value="Szkoła muzyczna">Szkoła muzyczna</option>
								<option value="Inna">Inna</option>
              </Form.Control>
              <Form.Control.Feedback type='invalid'>{ errors.category }</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Alert variant={'danger'} show={ !!errors.register } type='invalid'>{ errors.register }</Alert>
            </Form.Group>
            <Form.Group className="text-center pt-4">
              <Button className="rounded-pill col-6" type='submit' onClick={ validation }>Dołącz za darmo</Button>
            </Form.Group>
            <Form.Group className="text-center">
              Posiadasz juz konto? <a href="../../login" id="signup">Zaloguj się</a>
            </Form.Group>
    </>
  )
}

export default InstitutionForm;