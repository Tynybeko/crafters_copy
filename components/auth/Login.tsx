import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";


//styles
import './auth.css'
const Login = ({ setIsForgotPassword, setIsLogin, setIsRegister }: any) => {
  return (
    <div className='auth'>
      <div onClick={() => setIsLogin(false)} className='auth-modal' />
      <div className='auth-modal-item'>
        <div className="auth-carousel">
          <div className="auth_title">
            <h3>Welcome</h3>
            <p>Let's do a couple of hoggish and start looking for art</p>
          </div>
          <form>
            <div className="login-input">
              <Input type="email" name="email" placeholder="Email" />
            </div>
            <div className="login-input">
              <Input type="password" name="email" placeholder="Password" />
            </div>
            <div className="text-end forgot-password">
              <p onClick={() => { setIsForgotPassword(true); setIsLogin(false); setIsRegister(false) }} className="p-0 mb-[40px] w-max">Forgot password</p>
            </div>
            <div className="mb-[12px]">
              <Button size='full'>
                Sign in
              </Button>
            </div>
            <div className="auth-links" >
              <span>
                You haven't registered yet?
              </span>
              <p onClick={() => { setIsRegister(true); setIsLogin(false) }} >
                Create an account
              </p>
            </div>
            <div className="auth-decor">
              <p>or</p>
            </div>
            <div className="flex items-center gap-[12px]">
              <Button variant={'outline'} className="flex items-center gap-[4px]">
                <img src="/svg/google.svg" alt="Google" />
                Google
              </Button>
              <Button className="flex items-center gap-[4px]">
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
