
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input, InputPassword } from '../ui/input';
import { useAppDispatch } from "@/redux/hooks";
import { api } from "@/axios";
import { RegisterUser } from "@/redux/slices/user";
import MiniLoading from "@/components/mini-loading/MiniLoading";

interface userType {
    email: string,
    password: string,
    confirmPassword: string,
}

const Register = ({ setIsLogin, setIsRegister }: any) => {
    const dispatch = useAppDispatch()
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
    const [userPassword, setUserPassword] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<userType>({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handle__ConfPassword = (e: any) => {
        const { name, value } = e.target
        setUserPassword(prev => {
            return { ...prev, [name]: value }
        })

        if (name == "confirmPassword") {
            if (!value) {
                setError(prev => ({ ...prev, confirmPassword: "Please enter Confirm Password." }))
            } else if (userPassword.password && value !== userPassword.password) {
                setError(prev => ({ ...prev, confirmPassword: "Password and Confirm Password does not match." }))
            } else {
                setError(prev => ({ ...prev, confirmPassword: "" }))
            }
        }
    }

    const handleSubmit = (e: any) => {
        setIsLoading(true)
        e.preventDefault()

        let a1 = new FormData(e.target)
        let a2 = Object.fromEntries(a1.entries())

        api.post('/accounts/register/', a2)
            .then(res => {
                dispatch(RegisterUser(res.data))
                localStorage.setItem('token', res.data.token)
                setIsRegister(false)
                setIsLogin(false);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
                setError(prev => ({
                    ...prev,
                    password: err?.response?.data?.password?.[0],
                    email: err?.response?.data?.email?.[0]
                }))
            })
    }

    return (
        <div className='auth'>
            <div onClick={() => {
                setIsLogin(false);
                setIsRegister(false);
            }} className='auth-modal' />
            <div className='auth-modal-item'>
                <div className="auth-carousel">
                    <div className="auth_title">
                        <h3>Welcome</h3>
                        <p>Let's do a couple of shoggoths and start looking for art</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="login-input">
                            <Input
                                className={(error.confirmPassword || error.password || error.email) && "border-[red]"}
                                type="email"
                                required
                                name="email"
                                placeholder="Email" />
                        </div>
                        <div className="login-input">
                            <InputPassword
                                visible={showPassword}
                                hidden={setShowPassword}
                                className={(error.confirmPassword || error.password || error.email) && "border-[red]"}
                                onChange={handle__ConfPassword}
                                required
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="login-input !mb-[40px]">
                            <InputPassword
                                className={(error.confirmPassword || error.password || error.email) && "border-[red]"}
                                visible={showPasswordConfirm}
                                hidden={setShowPasswordConfirm}
                                required
                                onChange={handle__ConfPassword}
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                            />
                            <span className='err text-[14px] leading-[16px] mt-[10px] text-[#F83427] font-[300] block'>{error.email}</span>
                            <span className='err text-[14px] leading-[16px] mt-[10px] text-[#F83427] font-[300] block'>{error.password}</span>
                            <span className='err text-[14px] leading-[16px] mt-[10px] text-[#F83427] font-[300] block'>{error.confirmPassword}</span>
                        </div>
                        <div className="checkbox-wrapper mb-[13px]">
                            <label>
                                <input className={isChecked ? "checked" : ""}
                                    onChange={() => setIsChecked(prev => !prev)} type="checkbox"
                                    checked={isChecked} hidden />
                                {isChecked ? (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.9987 7.99967L6.9987 9.99967L10.9987 5.99967M14.6654 7.99967C14.6654 11.6816 11.6806 14.6663 7.9987 14.6663C4.3168 14.6663 1.33203 11.6816 1.33203 7.99967C1.33203 4.31778 4.3168 1.33301 7.9987 1.33301C11.6806 1.33301 14.6654 4.31778 14.6654 7.99967Z" stroke="#1DBE60" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.9987 14.6663C11.6806 14.6663 14.6654 11.6816 14.6654 7.99967C14.6654 4.31778 11.6806 1.33301 7.9987 1.33301C4.3168 1.33301 1.33203 4.31778 1.33203 7.99967C1.33203 11.6816 4.3168 14.6663 7.9987 14.6663Z" stroke="#262D29" stroke-opacity="0.4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                )}
                                <span>Confidentiality policy</span>
                            </label>
                        </div>
                        <div className="mb-[12px]">
                            <Button variant={isChecked ? 'default' : 'outline'} type={'submit'} disabled={!isChecked} size='full'>
                                {isLoading ? <MiniLoading /> : 'Registration'}
                            </Button>
                        </div>
                        <div className="auth-links">
                            <span>
                                Do you already have <br /> an account?
                            </span>
                            <p onClick={() => {
                                setIsRegister(false);
                                setIsLogin(true);
                            }}>
                                Sign in to your account
                            </p>
                        </div>
                        <div className="auth-decor">
                            <p>or</p>
                        </div>
                        <div className="flex items-center gap-[12px]">
                            <Button variant={'outline'} type="button" className="flex items-center gap-[4px]">
                                <img src="/svg/google.svg" alt="Google" />
                                Google
                            </Button>
                            <Button className="flex items-center gap-[4px]" type='button'>
                                <img src="/svg/facebook.svg" alt="Google" />
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
