'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { api, apiToken } from "@/axios";
import { RegisterUser } from "@/redux/slices/user";

interface userType {
  email: string
  password: string
  confirmPassword: string
}

const Register = ({ setIsLogin, setIsRegister } : any) => {
    const dispatch = useAppDispatch()
    const [ isChecked, setIsChecked ] = useState(false);
    const [ userData, setUserData ] = useState<userType>({
        email          : '',
        password       : '',
        confirmPassword: ''
    });
    const [error, setError] = useState<userType>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const onInputChange = (e: any) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }
    
    const validateInput = (e: any) => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
            switch (name) {
                case "email":
                    if (!value) {
                        stateObj.email = "Please enter Email.";
                    }
                    break;
                case "confirmPassword":
                    if (!value) {
                        stateObj.confirmPassword = "Please enter Confirm Password.";
                    } else if (userData.password && value !== userData.password) {
                        stateObj.confirmPassword = "Password and Confirm Password does not match.";
                    }
                    break;
                default:
                    break;
            }
            return stateObj;
        });
    }
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        api.post('/accounts/register/', {
            email          : userData.email,
            password       : userData.password,
        })
            .then(res => {
                dispatch(RegisterUser(res.data))
                localStorage.setItem('token', res.data.token)
                setIsRegister(false);
                setIsLogin(false);
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    return (
      <div className='auth'>
          <div onClick={ () => {
              setIsLogin(false);
              setIsRegister(false);
          } } className='auth-modal'/>
          <div className='auth-modal-item'>
              <div className="auth-carousel">
                  <div className="auth_title">
                      <h3>Welcome</h3>
                      <p>Let's do a couple of shoggoths and start looking for art</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                      <div className="login-input">
                          <Input
                            value={ userData.email }
                            onChange={ onInputChange }
                            onBlur={ validateInput }
                            type="email"
                            name="email"
                            placeholder="Email"/>
                          {error.email && <span className='err'>{error.email}</span>}
                      </div>
                      <div className="login-input">
                          <Input
                            value={ userData.password }
                            onChange={ onInputChange }
                            onBlur={ validateInput }
                            type="password"
                            name="password"
                            placeholder="Password"/>
                          {error.password && <span className='err'>{error.password}</span>}
                      </div>
                      <div className="login-input mb-[33px]">
                          <Input
                            value={ userData.confirmPassword }
                            onChange={ onInputChange }
                            onBlur={ validateInput }
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"/>
                          {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                      </div>
                      <div className="checkbox-wrapper mb-[13px]">
                          <label>
                              <input className={ isChecked ? "checked" : "" }
                                     onChange={ () => setIsChecked(prev => !prev) } type="checkbox"
                                     checked={ isChecked }/>
                              <span>Confidentiality policy</span>
                          </label>
                      </div>
                      <div className="mb-[12px]">
                          <Button type={'submit'} disabled={ !isChecked } size='full'>
                              Registration
                          </Button>
                      </div>
                      <div className="auth-links">
                            <span>
                                Do you already have <br/> an account?
                            </span>
                          <p onClick={ () => {
                              setIsRegister(false);
                              setIsLogin(true);
                          } }>
                              Sign in to your account
                          </p>
                      </div>
                      <div className="auth-decor">
                          <p>or</p>
                      </div>
                      <div className="flex items-center gap-[12px]">
                          <Button variant={ 'outline' } className="flex items-center gap-[4px]">
                              <img src="/svg/google.svg" alt="Google"/>
                              Google
                          </Button>
                          <Button className="flex items-center gap-[4px]">
                              <img src="/svg/facebook.svg" alt="Google"/>
                              Facebook
                          </Button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    );
};


export default Register;
