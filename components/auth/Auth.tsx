import React, { useState } from 'react';
import { ForgotPassword } from "@/components/auth/ForgotPaswword";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";


interface IAuthProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void
}
const Auth = ({isLogin, setIsLogin}: IAuthProps) => {
    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    return (
      <>
          {isForgotPassword && <ForgotPassword
            setIsForgotPassword={setIsForgotPassword}
            setIsRegister={setIsRegister}
            setIsLogin={setIsLogin} />
          }
          {isLogin && <Login
            setIsForgotPassword={setIsForgotPassword}
            setIsRegister={setIsRegister}
            setIsLogin={setIsLogin} />}
          {isRegister && <Register setIsRegister={setIsRegister} setIsLogin={setIsLogin} />}
      </>
    );
};

export default Auth;
