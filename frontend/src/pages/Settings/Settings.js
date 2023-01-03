import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InstitutionDataSettings from "../../components/Settings/InstitutionDataSettings"
import EmailSettigns from "../../components/Settings/EmailSettigns"
import PasswordSettings from "../../components/Settings/PasswordSettings"
import UserDataSettings from "../../components/Settings/UserDataSettings"

function Settings(props){

  const [key, setKey] = useState('data');
  const [ user, setUser ] = useState({})
  
  useEffect(() => {
    const userData = localStorage.getItem("user") === "undefined" ? "{}" : localStorage.getItem("user");
    setUser(JSON.parse(userData))
  }, [])

  return (
    <>
       <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="data" title="Dane">
      {user.role === 'business' &&
        <InstitutionDataSettings />
      }
      {user.role !== 'business' &&
        <UserDataSettings />
      }
      </Tab>
      <Tab eventKey="email" title="E-mail">
        <EmailSettigns />
      </Tab>
      <Tab eventKey="passowrd" title="Hasło">
        <PasswordSettings />
      </Tab>
    </Tabs>
    </>
  )
}

export default Settings;