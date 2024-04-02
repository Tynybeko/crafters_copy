'use client';

import React, { useState } from 'react';
import Box from "@/components/ui/Box";

const CompanyStage2 = ({setIsCheckedPolicy} : any) => {
    const [ isChecked, setIsChecked ] = useState(false)
    const handleStage = () => {
        setIsChecked(!isChecked)
        setIsCheckedPolicy(!isChecked)
    }
    return (
      <Box className={'add-company-stage2'}>
        <h1>
            <img src="/svg/piggy-bank.svg" alt="Image"/>
            <span>Agreements for a monthly subscription fee</span>
        </h1>
          <p>
              This Privacy Policy describes how we collect, use, and protect the information you provide when using our website, applications, or services. We value your privacy and are committed to safeguarding your personal data. Information Collection. We may collect various types of information, including. This Privacy Policy describes how we collect, use, and protect the information you provide when using our website, applications, or services.  This Privacy Policy describes how we collect, use, and protect the information you provide when using our website, applications, or services. We value your privacy and are committed to safeguarding your personal data. Information Collection. We may collect various types of information, including. This Privacy Policy describes how we collect, use, and protect the information you provide when using our website, applications, or services.  This Privacy Policy describes how we collect, use, and protect the information you provide when using our website, applications, or services. We value your privacy and are committed to safeguarding your personal data. Information Collection. We may collect various types of information, including. This Privacy Policy describes how we collect, use, and protect the information you provide when using our website, applications, or services.  This Privacy Policy describes how we collect, use, and protect the information you provide when using our website, applications, or services. We value your privacy and are committed to safeguarding your personal data. Information Collection. We may collect various types of information, including. This Privacy Policy describes how we collect, use, and protect the information you provide when using our website, applications, or services.
          </p>
          <label className={'add-company-checkbox-wrapper !m-0'}>
              <input className={ isChecked ? "checked" : "" }
                     onChange={handleStage} type="checkbox"
                     checked={ isChecked } hidden />
              { isChecked ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.9987 7.99967L6.9987 9.99967L10.9987 5.99967M14.6654 7.99967C14.6654 11.6816 11.6806 14.6663 7.9987 14.6663C4.3168 14.6663 1.33203 11.6816 1.33203 7.99967C1.33203 4.31778 4.3168 1.33301 7.9987 1.33301C11.6806 1.33301 14.6654 4.31778 14.6654 7.99967Z" stroke="#1DBE60" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ):(
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.9987 14.6663C11.6806 14.6663 14.6654 11.6816 14.6654 7.99967C14.6654 4.31778 11.6806 1.33301 7.9987 1.33301C4.3168 1.33301 1.33203 4.31778 1.33203 7.99967C1.33203 11.6816 4.3168 14.6663 7.9987 14.6663Z" stroke="#262D29" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              <span>I accept the terms and conditions</span>
          </label>
      </Box>
    );
};

export default CompanyStage2;
