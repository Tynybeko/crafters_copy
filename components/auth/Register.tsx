import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';

const Register = ({ setIsLogin, setisRegister }: any) => {

  const [isChecked, setIsChecked] = useState(false);


  return (
    <div className='auth'>
      <div onClick={() => { setIsLogin(false); setisRegister(false) }} className='auth-modal' />
      <div className='auth-modal-item'>
        <div className="auth-carousel">
          <div className="auth_title">
            <h3>Welcome</h3>
            <p>Let's do a couple of shoggoths and start looking for art</p>
          </div>
          <form>
            <div className="login-input">
              <Input type="email" name="email" placeholder="Email" />
            </div>
            <div className="login-input">
              <Input type="password" name="password" placeholder="Password" />
            </div>
            <div className="login-input mb-[33px]">
              <Input type="password" name="password" placeholder="Password" />
            </div>
            <div className="checkbox-wrapper mb-[13px]">
              <label>
                <input className={isChecked ? "checked" : ""} onChange={() => setIsChecked((prev) => !prev)} type="checkbox" checked={isChecked} />
                <span>Confidentiality policy</span>
              </label>
            </div>
            <div className="mb-[12px]">
              <Button disabled={!isChecked} size='full'>
                Sign in
              </Button>
            </div>
            <div className="auth-links" >
              <span>
                Do you already have <br /> an account?
              </span>
              <p onClick={() => { setisRegister(false); setIsLogin(true) }} >
                Sign in to your account
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

export default Register;
