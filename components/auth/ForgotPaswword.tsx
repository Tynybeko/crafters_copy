"use client";
import React, { useState } from "react";


import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { apiToken } from "@/axios";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

//styles
import './auth.css'

interface IForgotPassword {
  setIsForgotPassword: (value: boolean) => void
  setIsLogin: (value: boolean) => void
  setIsRegister: (value: boolean) => void
}
export const ForgotPassword = ({ setIsForgotPassword, setIsRegister }: IForgotPassword) => {
    const [ inputValue, setInputValue ] = useState({
        email: ''
    })
    const [ handleEnterCode, setHandleEnterCode ] = useState(false)
    
    
    const getCode =  (e: any)  => {
        e.preventDefault()
       apiToken.post(`/accounts/reset-password/get-code/${inputValue.email}`)
        .then(() => {
            setHandleEnterCode(true)
        })
    }
    
    if(handleEnterCode) {
        return <EnterCode setIsForgotPassword={setIsForgotPassword} />
    }
    return (
        <div className='auth'>
            <div onClick={() => {
                setIsForgotPassword(false)
            }} className='auth-modal' />
            <div className='auth-modal-item'>
                <div className="auth-carousel">
                    <div className="auth_title">
                        <h3>Forgot your password?</h3>
                        <p>Log in with the confirmation code </p>
                    </div>
                    <form>
                        <div className="!mb-[40px]">
                            <Input onChange={(e) => setInputValue(prev => ({ ...prev, email: e.target.value }))} type="email" name="email" placeholder="Email" />
                        </div>
                        <div className="mb-[12px]">
                            <Button onClick={getCode} size='full'>
                                Get Code
                            </Button>
                        </div>
                        <div className="mb-[12px]">
                            <Button onClick={() => { setIsRegister(true); setIsForgotPassword(false) }} size='full' variant='outline'>
                                Back to registration
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const EnterCode = ({ setIsForgotPassword}: any) => {
    
    const [ code, setCode ] = useState('')
    const [ modalNewPassword, setModalNewPassword ] = useState(false);
    
    const getCode =  (e: any)  => {
        e.preventDefault()
        apiToken.post(`/accounts/reset-password/chek-code/${code}`)
        .then(() => {
            setModalNewPassword(true)
            localStorage.setItem('code', code)
        })
    }
    
    if(modalNewPassword) {
        return <NewPassword setIsForgotPassword={setIsForgotPassword} />
    }
        return (
        <div className='auth'>
            <div onClick={() => {
                setIsForgotPassword(false)
            }} className='auth-modal' />
            <div className='auth-modal-item'>
                <div className="auth-carousel">
                    <div className="auth_title">
                        <h3>Enter the code</h3>
                        <p>Log in with the confirmation code </p>
                    </div>
                    <form>
                        <InputOTP onChange={(e) => setCode(e)} maxLength={4} className={'mb-[40px]'}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className="mb-[12px] mt-[40px]">
                            <Button onClick={getCode} size='full'>
                                Get Code
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const NewPassword = ({ setIsForgotPassword }: any) => {
    const [ newPassword, setNewPassword ] = useState({
        password: '',
        password_confirm: ''
    })
    const code = localStorage.getItem('code')
    
    const handlePassword =  (e: any)  => {
        e.preventDefault()
        apiToken.post(`/accounts/reset-password/${code}`, newPassword)
        .then(() => {
            setIsForgotPassword(false)
        })
    }

    
    return (
        <div className='auth'>
            <div onClick={() => {
                setIsForgotPassword(false)
            }} className='auth-modal' />
            <div className='auth-modal-item'>
                <div className="auth-carousel">
                    <div className="auth_title">
                        <h3>Enter the code</h3>
                        <p>Log in with the confirmation code </p>
                    </div>
                    <form>
                        <Input onChange={(e) => setNewPassword({...newPassword, password: e.target.value })} type="password" name="password" placeholder="Password" />
                        <Input onChange={(e) => setNewPassword({...newPassword, password_confirm: e.target.value })} type="password" name="confirm_password" placeholder="Confirm password" />
                        <div className="mb-[12px] mt-[40px]">
                            <Button onClick={handlePassword} size='full'>
                                Get Code
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}