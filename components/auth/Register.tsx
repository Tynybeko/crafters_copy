'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input, InputPassword } from '../ui/input';
import { useAppDispatch } from "@/redux/hooks";
import { api } from "@/axios";
import { RegisterUser } from "@/redux/slices/user";
import MiniLoading from "@/components/mini-loading/MiniLoading";

interface userType {
  email: string
  password: string
  confirmPassword: string
}

const Register = ({ setIsLogin, setIsRegister } : any) => {
    const dispatch = useAppDispatch()
    const [ isChecked, setIsChecked ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showPassword, setShowPassword ] = useState<boolean>(false)
    const [ showPasswordConfirm, setShowPasswordConfirm ] = useState<boolean>(false)
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
        setIsLoading(true)
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
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
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
                          <InputPassword
                            visible={showPassword}
                            hidden={setShowPassword}
                            value={ userData.password }
                            onChange={ onInputChange }
                            onBlur={ validateInput }
                            type="password"
                            name="password"
                            placeholder="Password"
                          />
                          {error.password && <span className='err'>{error.password}</span>}
                      </div>
                      <div className="login-input !mb-[40px]">
                          <InputPassword
                            visible={showPasswordConfirm}
                            hidden={setShowPasswordConfirm}
                            value={ userData.confirmPassword }
                            onChange={ onInputChange }
                            onBlur={ validateInput }
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                          />
                          {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                      </div>
                      <div className="checkbox-wrapper mb-[13px]">
                          <label>
                              <input className={ isChecked ? "checked" : "" }
                                     onChange={ () => setIsChecked(prev => !prev) } type="checkbox"
                                     checked={ isChecked } hidden />
                              {isChecked ? (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.9987 7.99967L6.9987 9.99967L10.9987 5.99967M14.6654 7.99967C14.6654 11.6816 11.6806 14.6663 7.9987 14.6663C4.3168 14.6663 1.33203 11.6816 1.33203 7.99967C1.33203 4.31778 4.3168 1.33301 7.9987 1.33301C11.6806 1.33301 14.6654 4.31778 14.6654 7.99967Z" stroke="#1DBE60" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                              ):(
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.9987 14.6663C11.6806 14.6663 14.6654 11.6816 14.6654 7.99967C14.6654 4.31778 11.6806 1.33301 7.9987 1.33301C4.3168 1.33301 1.33203 4.31778 1.33203 7.99967C1.33203 11.6816 4.3168 14.6663 7.9987 14.6663Z" stroke="#262D29" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                              )}
                              <span>Confidentiality policy</span>
                          </label>
                      </div>
                      <div className="mb-[12px]">
                          <Button variant={isChecked ? 'default' : 'outline'} type={'submit'} disabled={ !isChecked } size='full'>
                              { isLoading ? <MiniLoading /> : 'Registration'}
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
