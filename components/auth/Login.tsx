'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

//styles
import './auth.css'
import { signIn } from "next-auth/react";
import { api, apiToken } from "@/axios";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUser, LoginUser } from "@/redux/slices/user";

const Login = ({ setIsForgotPassword, setIsLogin, setIsRegister } : any) => {
    const dispatch = useAppDispatch()
    const [ userData, setUserData ] = useState({})
    const [ error, setError ] = useState({
        detail: ""
    })
    
    const forgotPassword = () => {
        setIsForgotPassword(true);
        setIsLogin(false);
        setIsRegister(false)
    }
    
    const handleChange = (e : any) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        onfocus(e)
    }
    
    const handleSubmit = (e : any) => {
        e.preventDefault();
        api.post('/accounts/login/', userData)
          .then(res => {
              localStorage.setItem('token', res.data.token)
              dispatch(LoginUser(res.data))
              setError({
                  detail: ""
              })
              dispatch(fetchUser())
              setIsLogin(false)
          })
          .catch(err => {
              setError(err?.response?.data)
          })
    }
    
    
    const onfocus = (e : any) => {
        if ( e.target.value ) {
            setError({
                detail: ""
            })
        }
    }
    
    return (
      <div className='auth'>
          <div onClick={ () => setIsLogin(false) } className='auth-modal'/>
          <div className='auth-modal-item'>
              <div className="auth-carousel">
                  <div className="auth_title">
                      <h3>Welcome</h3>
                      <p>Let's do a couple of hoggish and start looking for art</p>
                  </div>
                  <form onSubmit={ handleSubmit }>
                      <div className="login-input">
                          <Input onFocus={ onfocus } onChange={ handleChange } type="email" name="login"
                                 placeholder="Email"/>
                      </div>
                      <div className="login-input">
                          <Input onFocus={ onfocus } onChange={ handleChange } type="password" name="password"
                                 placeholder="Password"/>
                      </div>
                      <div className="forgot-password mb-[40px]">
                          <span className='error m-0'>{ error ? error?.detail : '' }</span>
                          <p onClick={ forgotPassword } className="p-0  w-max">Forgot password</p>
                      </div>
                      <div className="mb-[12px]">
                          <Button type="submit" size='full'>
                              Sign in
                          </Button>
                      </div>
                      <div className="auth-links">
                          <span>
                            You haven't registered yet?
                          </span>
                          <p onClick={ () => {
                              setIsRegister(true);
                              setIsLogin(false)
                          } }>
                              Create an account
                          </p>
                      </div>
                      <div className="auth-decor">
                          <p>or</p>
                      </div>
                      <div className="flex items-center gap-[12px]">
                          <Button onClick={ () => signIn('google') } variant={ 'outline' }
                                  className="flex items-center gap-[4px]">
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

export default Login;
