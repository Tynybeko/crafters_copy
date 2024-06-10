'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "../ui/input";

//styles
import './auth.css'
import { signIn } from "next-auth/react";
import { api } from "@/axios";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUser, LoginUser } from "@/redux/slices/user";
import MiniLoading from "../mini-loading/MiniLoading";

const Login = ({ setIsForgotPassword, setIsLogin, setIsRegister }: any) => {
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState({ detail: "" })
    const [isLoading, setIsLoading] = useState(false)

    const forgotPassword = () => {
        setIsForgotPassword(true);
        setIsLogin(false);
        setIsRegister(false)
    }

    const handleSubmit = (e: any) => {
        setIsLoading(true)
        e.preventDefault();

        let a1 = new FormData(e.target)
        let a2 = Object.fromEntries(a1.entries())

        api.post('/accounts/login/', a2)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                dispatch(LoginUser(res.data))
                setError({
                    detail: ""
                })
                dispatch(fetchUser())
                setIsLogin(false)
                setIsLoading(false)
            })
            .catch(err => {
                setError(err?.response?.data)
                setIsLoading(false)
            })
    }

    const onfocus = (e: any) => {
        if (e.target.value) {
            setError({
                detail: ""
            })
        }
    }

    return (
        <div className='auth'>
            <div onClick={() => setIsLogin(false)} className='auth-modal' />
            <div className='auth-modal-item'>
                <div className="auth-carousel">
                    <div className="auth_title">
                        <h3>Welcome</h3>
                        <p>Let's do a couple of hoggish and start looking for art</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="login-input">
                            <Input onFocus={onfocus} onChange={onfocus} type="email" name="login"
                                placeholder="Email" />
                        </div>
                        <div className="login-input">
                            <InputPassword visible={showPassword} hidden={setShowPassword} onFocus={onfocus} onChange={onfocus} type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="forgot-password mb-[40px]">
                            <span className='error m-0'>{error ? error?.detail : ''}</span>
                            <p onClick={forgotPassword} className="p-0  w-max">Forgot password</p>
                        </div>
                        <div className="mb-[12px]">
                            <Button type="submit" size='full'>
                                {isLoading ? <MiniLoading /> : 'Sign in'}
                            </Button>
                        </div>
                        <div className="auth-links">
                            <span>
                                You haven't registered yet?
                            </span>
                            <p onClick={() => {
                                setIsRegister(true);
                                setIsLogin(false)
                            }}>
                                Create an account
                            </p>
                        </div>
                        <div className="auth-decor">
                            <p>or</p>
                        </div>
                        <div className="flex items-center gap-[12px]">
                            <Button onClick={() => signIn('google')} type="button" variant={'outline'}
                                className="flex items-center gap-[4px]">
                                <img src="/svg/google.svg" alt="Google" />
                                Google
                            </Button>
                            <Button className="flex items-center gap-[4px]" type="button">
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

export default Login;
