"use client";
import Box from "@/components/ui/Box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PersonalCabinet() {
    const [ isDisabledUserData, setIsDisabledUserData ] = useState<boolean>(false)
    const [ isDisabledPassword, setIsDisabledPassword ] = useState<boolean>(false)
    const [ isDisabledContact, setIsDisabledContact ] = useState<boolean>(false)
    
    const handleChangeUserData = () => {
        setIsDisabledUserData(!isDisabledUserData)
    }
    
    const handleChangePassword = () => {
        setIsDisabledPassword(!isDisabledPassword)
    }
    
    const handleChangeContact = () => {
        setIsDisabledContact(!isDisabledContact)
    }
    
    return (
      <div className='personal-cabinet'>
          <Box className='user'>
              <div className='user-header'>
                  <div className='user-item'>
                      <div className='user-title'>
                          <img src="/svg/user.svg" alt="User"/>
                          User data
                      </div>
                      {!isDisabledUserData && <Button onClick={ handleChangeUserData } variant={ 'ghost' } className='user-edit_btn'>
                          <span>Edit</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_4107_12207)">
                                  <path
                                    d="M7.33203 2.66714H4.53203C3.41193 2.66714 2.85187 2.66714 2.42405 2.88513C2.04773 3.07688 1.74176 3.38284 1.55002 3.75916C1.33203 4.18699 1.33203 4.74704 1.33203 5.86714V11.4671C1.33203 12.5872 1.33203 13.1473 1.55002 13.5751C1.74176 13.9514 2.04773 14.2574 2.42405 14.4492C2.85187 14.6671 3.41193 14.6671 4.53203 14.6671H10.132C11.2521 14.6671 11.8122 14.6671 12.24 14.4492C12.6163 14.2574 12.9223 13.9514 13.114 13.5751C13.332 13.1473 13.332 12.5872 13.332 11.4671V8.66714M5.33201 10.6671H6.44838C6.7745 10.6671 6.93756 10.6671 7.09101 10.6303C7.22706 10.5976 7.35711 10.5438 7.47641 10.4707C7.61097 10.3882 7.72627 10.2729 7.95687 10.0423L14.332 3.66714C14.8843 3.11486 14.8843 2.21943 14.332 1.66714C13.7797 1.11486 12.8843 1.11486 12.332 1.66714L5.95685 8.04231C5.72625 8.27291 5.61095 8.38821 5.52849 8.52276C5.45539 8.64206 5.40152 8.77212 5.36885 8.90817C5.33201 9.06162 5.33201 9.22468 5.33201 9.5508V10.6671Z"
                                    stroke="#262D2966" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                              </g>
                              <defs>
                                  <clipPath id="clip0_4107_12207">
                                      <rect width="16" height="16" fill="white"/>
                                  </clipPath>
                              </defs>
                          </svg>
                      </Button>}
                  </div>
              </div>
              <div className='user-info'>
                  <div className='user-info-item'>
                      <p>First name</p>
                      <Input value={ 'Ivan' } disabled={ !isDisabledUserData }/>
                  </div>
                  <div className='user-info-item'>
                      <p>Surname</p>
                      <Input value={ 'Ivan' } disabled={ !isDisabledUserData }/>
                  </div>
                  <div className='user-info-item'>
                      <p>By middle name</p>
                      <Input value={ 'Ivan' } disabled={ !isDisabledUserData }/>
                  </div>
              </div>
              { isDisabledUserData && <Button className='mt-4'>Save</Button> }
          </Box>
          <Box className='user'>
              <div className='user-header'>
                  <div className='user-item'>
                      <div className='user-title'>
                          <img src="/svg/phone.svg" alt="User"/>
                          Contact
                      </div>
                      {!isDisabledContact && <Button onClick={ handleChangeContact } variant={ 'ghost' } className='user-edit_btn'>
                          <span>Edit</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_4107_12207)">
                                  <path
                                    d="M7.33203 2.66714H4.53203C3.41193 2.66714 2.85187 2.66714 2.42405 2.88513C2.04773 3.07688 1.74176 3.38284 1.55002 3.75916C1.33203 4.18699 1.33203 4.74704 1.33203 5.86714V11.4671C1.33203 12.5872 1.33203 13.1473 1.55002 13.5751C1.74176 13.9514 2.04773 14.2574 2.42405 14.4492C2.85187 14.6671 3.41193 14.6671 4.53203 14.6671H10.132C11.2521 14.6671 11.8122 14.6671 12.24 14.4492C12.6163 14.2574 12.9223 13.9514 13.114 13.5751C13.332 13.1473 13.332 12.5872 13.332 11.4671V8.66714M5.33201 10.6671H6.44838C6.7745 10.6671 6.93756 10.6671 7.09101 10.6303C7.22706 10.5976 7.35711 10.5438 7.47641 10.4707C7.61097 10.3882 7.72627 10.2729 7.95687 10.0423L14.332 3.66714C14.8843 3.11486 14.8843 2.21943 14.332 1.66714C13.7797 1.11486 12.8843 1.11486 12.332 1.66714L5.95685 8.04231C5.72625 8.27291 5.61095 8.38821 5.52849 8.52276C5.45539 8.64206 5.40152 8.77212 5.36885 8.90817C5.33201 9.06162 5.33201 9.22468 5.33201 9.5508V10.6671Z"
                                    stroke="#262D2966" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                              </g>
                              <defs>
                                  <clipPath id="clip0_4107_12207">
                                      <rect width="16" height="16" fill="white"/>
                                  </clipPath>
                              </defs>
                          </svg>
                      </Button>}
                  </div>
              </div>
              <div className='user-contact'>
                  <div className='user-info-item'>
                      <p>Email</p>
                      <Input value={ 'PROlab@gmail.com' } disabled={ !isDisabledContact }/>
                  </div>
                  <div className='user-info-item'>
                      <p>Phone</p>
                      <Input value={ '+996 (000) 000 000' } disabled={ !isDisabledContact }/>
                  </div>
              </div>
              { isDisabledContact && <Button className='mt-4'>Save</Button> }
          </Box>
          <Box className='user'>
              <div className='user-header'>
                  <div className='user-item'>
                      <div className='user-title'>
                          <img src="/svg/phone.svg" alt="User"/>
                          Contact
                      </div>
                      {!isDisabledPassword && <Button onClick={ handleChangePassword } variant={ 'ghost' } className='user-edit_btn'>
                          <span>Edit</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_4107_12207)">
                                  <path
                                    d="M7.33203 2.66714H4.53203C3.41193 2.66714 2.85187 2.66714 2.42405 2.88513C2.04773 3.07688 1.74176 3.38284 1.55002 3.75916C1.33203 4.18699 1.33203 4.74704 1.33203 5.86714V11.4671C1.33203 12.5872 1.33203 13.1473 1.55002 13.5751C1.74176 13.9514 2.04773 14.2574 2.42405 14.4492C2.85187 14.6671 3.41193 14.6671 4.53203 14.6671H10.132C11.2521 14.6671 11.8122 14.6671 12.24 14.4492C12.6163 14.2574 12.9223 13.9514 13.114 13.5751C13.332 13.1473 13.332 12.5872 13.332 11.4671V8.66714M5.33201 10.6671H6.44838C6.7745 10.6671 6.93756 10.6671 7.09101 10.6303C7.22706 10.5976 7.35711 10.5438 7.47641 10.4707C7.61097 10.3882 7.72627 10.2729 7.95687 10.0423L14.332 3.66714C14.8843 3.11486 14.8843 2.21943 14.332 1.66714C13.7797 1.11486 12.8843 1.11486 12.332 1.66714L5.95685 8.04231C5.72625 8.27291 5.61095 8.38821 5.52849 8.52276C5.45539 8.64206 5.40152 8.77212 5.36885 8.90817C5.33201 9.06162 5.33201 9.22468 5.33201 9.5508V10.6671Z"
                                    stroke="#262D2966" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                              </g>
                              <defs>
                                  <clipPath id="clip0_4107_12207">
                                      <rect width="16" height="16" fill="white"/>
                                  </clipPath>
                              </defs>
                          </svg>
                      </Button>}
                  </div>
              </div>
              <div className='user-contact'>
                  <div className='user-info-item'>
                      <p>Password</p>
                      <Input type={'password'} value={ '+996 (000) 000 000' } disabled={ !isDisabledPassword }/>
                  </div>
                  <div className='user-info-item'>
                      <p>Password</p>
                      <Input type={'password'} value={ '+996 (000) 000 000' } disabled={ !isDisabledPassword }/>
                  </div>
              </div>
              { isDisabledPassword && <Button className='mt-4'>Save</Button> }
          </Box>
      </div>
    );
}
