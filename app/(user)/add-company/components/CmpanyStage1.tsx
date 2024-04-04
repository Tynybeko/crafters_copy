'use client';
import { Input } from "@/components/ui/input";
import Box from "@/components/ui/Box";
import { useCallback, useState } from "react";
import { InputFile } from "@/components/ui/InputFile";

const CompanyStage1 = ({handleChange, setIsChecked, dataCompany} : any) => {
    const [ isCheckedPayment, setIsCheckedPayment ] = useState(false)
   const { legal_name, phone, site_url, image, city, index, legal_address } = dataCompany
    
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };
    const handleCheck = useCallback(
        () => {
            setIsCheckedPayment(prevState => !prevState)
            setIsChecked((prev: any) => ({...prev, checkedWebsite: !isCheckedPayment}))
        },
        [isCheckedPayment],
    )
    
    return (
      <div className={'add-company-stage1'}>
            <div className={'add-company-stage1-wrapper'}>
                <div className={'add-company-stage1-boxes'}>
                    <div className={'add-company-stage1-box1'}>
                        <InputFile onChange={handleInputChange} image={''} />
                    </div>
                    <Box className={'add-company-stage1-box2'}>
                        <h2 className={'add-company-stage1-title'}>
                            <img src="/svg/shop.svg" alt="Company"/>
                            <span>Company information</span>
                        </h2>
                        <form className={'add-company-stage1-form'}>
                            <label htmlFor="">
                                <p>Legal name</p>
                                <Input value={legal_name} name={'legal_name'} onChange={handleInputChange} type="text" placeholder={'Enter company name'}/>
                            </label>
                            <label htmlFor="">
                                <p>Phone</p>
                                <Input value={phone} name={'phone'} onChange={handleInputChange} type="text" placeholder={'Enter company name'}/>
                            </label>
                            <label htmlFor="">
                                <p>Address site</p>
                                <Input name={'site_url'} value={site_url} onChange={handleInputChange} type="text" placeholder={'Enter company name'}/>
                            </label>
                            <label className={'add-company-checkbox-wrapper'}>
                                <input
                                       onChange={handleCheck}  type="checkbox"
                                       checked={ isCheckedPayment } hidden />
                                {isCheckedPayment ? (
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4.9987 7.99967L6.9987 9.99967L10.9987 5.99967M14.6654 7.99967C14.6654 11.6816 11.6806 14.6663 7.9987 14.6663C4.3168 14.6663 1.33203 11.6816 1.33203 7.99967C1.33203 4.31778 4.3168 1.33301 7.9987 1.33301C11.6806 1.33301 14.6654 4.31778 14.6654 7.99967Z" stroke="#1DBE60" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ):(
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7.9987 14.6663C11.6806 14.6663 14.6654 11.6816 14.6654 7.99967C14.6654 4.31778 11.6806 1.33301 7.9987 1.33301C4.3168 1.33301 1.33203 4.31778 1.33203 7.99967C1.33203 11.6816 4.3168 14.6663 7.9987 14.6663Z" stroke="#262D29" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                                <span>I don't have a website</span>
                            </label>
                        </form>
                    </Box>
                    <Box className={'add-company-stage1-box3'}>
                        <h2 className={'add-company-stage1-title'}>
                            <img src="/svg/phone.svg" alt="Company"/>
                            <span>Address</span>
                        </h2>
                        <form className={'add-company-stage1-form'}>
                            <label htmlFor="">
                                <p>Legal addresses</p>
                                <Input value={legal_address} name={'legal_address'} onChange={handleInputChange} type="text" placeholder={'Enter company name'}/>
                            </label>
                            <label htmlFor="">
                                <p>City</p>
                                <Input value={city} name={'city'} onChange={handleInputChange} type="text" placeholder={'Enter company name'}/>
                            </label>
                            <label htmlFor="">
                                <p>Index</p>
                                <Input value={index} name={'index'} onChange={handleInputChange} type="text" placeholder={'Enter company name'}/>
                            </label>
                        </form>
                    </Box>
                </div>
            </div>
      </div>
    );
};

export default CompanyStage1;
