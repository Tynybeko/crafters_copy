import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";


//styles
import './auth.css'
const ForgotPassword = ({ setIsForgotPassword, setIsLogin, setIsRegister }: any) => {
    return (
        <div className='auth'>
            <div onClick={() => {
                setIsLogin(false)
                setIsForgotPassword(false)
                setIsRegister(false)
            }} className='auth-modal' />
            <div className='auth-modal-item'>
                <div className="auth-carousel">
                    <div className="auth_title">
                        <h3>Forgot your password?</h3>
                        <p>Log in with the confirmation code </p>
                    </div>
                    <form>
                        <div className="login-input mb-[40px]">
                            <Input type="email" name="email" placeholder="Email" />
                        </div>
                        <div className="mb-[12px]">
                            <Button size='full'>
                                Sign in
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

export default ForgotPassword;
