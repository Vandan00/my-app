import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Image1 from "../images/image.png"
import "./Register.css"
import {showErrMsg} from './utils/notification/Notification'
import { isEmpty, isEmail, isLength, isMatch, isValidNumber } from "./utils/Validation"


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    number: '',
    check: false,
    err: '',
}

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState(initialState)
    const { name, email, password, cf_password, number, check, err} = user
    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: ''})
    }

    function showError(errorElement) {
        const element = document.querySelector("." + errorElement)
        element.classList.add("display--error")
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(name) || isEmpty(password)) {
            return setUser({ ...user, err: "Please fill in all fields."})
        }

        if (!isEmail(email)) {
            showError("email--error")
            return setUser({ ...user, err: "Invalid emails." })
        }

        if (isLength(password)) {
            showError("password--error")
            return setUser({ ...user, err: "Password must be at least 6 characters." })
        } 
        if (!isMatch(password, cf_password)) {
            showError("cf_password--error")
            return setUser({ ...user, err: "Password did not match." })
        }
        if (!isValidNumber(number)) {
            showError("number--error")
            return setUser({ ...user, err: "Phone numbers must be of 10 digits." })
        }
        if (!check)
            return setUser({ ...user, err: "Please accepts the terms and conditions" })
        try {
            navigate("/dashboard");
        } catch (err) {
            err &&
                setUser({ ...user, err: err })
                console.log("Invalid credentials")
        }
        
    }
    console.log(Image1)
  return (
      <section className='page__container'>
          <img className="page__image" src={Image1} alt='background-img' />
          <div className="page__image__text">
              <h4 className="page__image__text__title">Choose a data range</h4>
              <p className="page__image__text__para">Ipsum laboris occaecat velit velit velit proident excepteur officia velit.
              </p>
          </div>
          <div className='page__form_container'>
              <h3 className='page__form_container_header'>Create an account</h3>
              <form className='page__form' onSubmit={handleSubmit}>

                  <label className="page__form__label" htmlFor="email">Your email address</label>
                  <input className="page__form__input" type="email" id="email" name="email" value={email} onChange={handleChangeInput} required />
                  <p className='error email--error'>{showErrMsg(err)}</p>
                  
                  <label className="page__form__label" htmlFor="password">Your password</label>
                  <input className="page__form__input" type="password" id="password" name="password" value={password} onChange={handleChangeInput} required />
                  <p className='error password--error'>{showErrMsg(err)}</p>

                  <label className="page__form__label" htmlFor="cf_password">Confirm password</label>
                  <input className="page__form__input" type="password" id="cf_password" name="cf_password" value={cf_password} onChange={handleChangeInput} required />
                  <p className='error cf_password--error'>{showErrMsg(err)}</p>

                  <label className="page__form__label" htmlFor="name">Your full name</label>
                  <input className="page__form__input" type="text" id="name" name="name" value={name} onChange={handleChangeInput} required />
                  <p className='error name--error'>{showErrMsg(err)}</p>

                  <label className="page__form__label" htmlFor="number">Your phone number</label>
                  <input className="page__form__input" type="number" id="number" name="number" value={number} onChange={handleChangeInput} required />
                  <p className='error number--error'>{showErrMsg(err)}</p>

                  <div>
                      <input type="checkbox" id="terms" name="check" value={check} onChange={handleChangeInput} required/>
                        <label className="page__form__checkbox" htmlFor="terms"><b>I read and agree Terms and Conditions</b></label>
                  </div>

                  <input className="page__form__submit" type="submit" value="Create account"/>
              </form>
          </div>
          
    </section>
  )
}

export default Register;