import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <div className='Index'>
        <Link to={'../Login'}>User</Link><br />
        <Link to={'../Register'}>Reg</Link><br />
        <Link to={'../PoliceStationRegister'}>Police</Link><br />
        <Link to={'../LawyerRegister'}>Lawyer</Link><br />  
    </div>
  )
}

export default Index