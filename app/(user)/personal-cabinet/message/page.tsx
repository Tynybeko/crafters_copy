import React from 'react'


//styles
import './message.css'
import Box from "@/components/ui/Box";
import { InputSearch } from "@/components/ui/input";

function Message() {
    return (
      <Box className='message'>
          <div className='message-wrapper'>
              <div className='message-people'>
                <div className='message-people-title'>
                    <p>Продавцы</p>
                </div>
                  <span className='message-separator-horizontal'/>
                  <div className='message-people-lists'>
                    <div className='message-people-list'>
                        <div className='message-people-list-img'>
                            <img src="/images/avatar.jpeg" alt="Avatar"/>
                        </div>
                        <div className='message-people-list-info'>
                            <h3>Ivan Ivanov Ivanovich</h3>
                            <p>Заказ №352352435</p>
                        </div>
                        <div className='message-people-list-date'>
                            <div>0</div>
                            <span>22/01/24</span>
                        </div>
                    </div>
                      <div className='message-people-list'>
                          <div className='message-people-list-img'>
                              <img src="/images/avatar.jpeg" alt="Avatar"/>
                          </div>
                          <div className='message-people-list-info'>
                              <h3>Ivan Ivanov Ivanovich</h3>
                              <p>Заказ №352352435</p>
                          </div>
                          <div className='message-people-list-date'>
                              <div>0</div>
                              <span>22/01/24</span>
                          </div>
                      </div>
                      <div className='message-people-list'>
                          <div className='message-people-list-img'>
                              <img src="/images/avatar.jpeg" alt="Avatar"/>
                          </div>
                          <div className='message-people-list-info'>
                              <h3>Ivan Ivanov Ivanovich</h3>
                              <p>Заказ №352352435</p>
                          </div>
                          <div className='message-people-list-date'>
                              <div>0</div>
                              <span>22/01/24</span>
                          </div>
                      </div>
                      <div className='message-people-list'>
                          <div className='message-people-list-img'>
                              <img src="/images/avatar.jpeg" alt="Avatar"/>
                          </div>
                          <div className='message-people-list-info'>
                              <h3>Ivan Ivanov Ivanovich</h3>
                              <p>Заказ №352352435</p>
                          </div>
                          <div className='message-people-list-date'>
                              <div>0</div>
                              <span>22/01/24</span>
                          </div>
                      </div>
                      <div className='message-people-list'>
                          <div className='message-people-list-img'>
                              <img src="/images/avatar.jpeg" alt="Avatar"/>
                          </div>
                          <div className='message-people-list-info'>
                              <h3>Ivan Ivanov Ivanovich</h3>
                              <p>Заказ №352352435</p>
                          </div>
                          <div className='message-people-list-date'>
                              <div>0</div>
                              <span>22/01/24</span>
                          </div>
                      </div>
                      <div className='message-people-list'>
                          <div className='message-people-list-img'>
                              <img src="/images/avatar.jpeg" alt="Avatar"/>
                          </div>
                          <div className='message-people-list-info'>
                              <h3>Ivan Ivanov Ivanovich</h3>
                              <p>Заказ №352352435</p>
                          </div>
                          <div className='message-people-list-date'>
                              <div>0</div>
                              <span>22/01/24</span>
                          </div>
                      </div>
                      <div className='message-people-list'>
                          <div className='message-people-list-img'>
                              <img src="/images/avatar.jpeg" alt="Avatar"/>
                          </div>
                          <div className='message-people-list-info'>
                              <h3>Ivan Ivanov Ivanovich</h3>
                              <p>Заказ №352352435</p>
                          </div>
                          <div className='message-people-list-date'>
                              <div>0</div>
                              <span>22/01/24</span>
                          </div>
                      </div>
                      <div className='message-people-list'>
                          <div className='message-people-list-img'>
                              <img src="/images/avatar.jpeg" alt="Avatar"/>
                          </div>
                          <div className='message-people-list-info'>
                              <h3>Ivan Ivanov Ivanovich</h3>
                              <p>Заказ №352352435</p>
                          </div>
                          <div className='message-people-list-date'>
                              <div>0</div>
                              <span>22/01/24</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='message-separator-vertical'></div>
              <div className='message-screen'>
                  <div className='message-screen-title'>
                      <p>Продавец: Ivan Ivanov Ivanovich</p>
                  </div>
                  <span className='message-separator-horizontal'/>
                  <div className='message-screen-lists'>
                  
                  </div>
                  <div className='flex items-center gap-[24px]'>
                      <label htmlFor="file" className='cursor-pointer'>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g opacity="0.6">
                                  <path d="M17.5 5.25581V16.5C17.5 19.5376 15.0376 22 12 22C8.96243 22 6.5 19.5376 6.5 16.5V5.66667C6.5 3.64162 8.14162 2 10.1667 2C12.1917 2 13.8333 3.64162 13.8333 5.66667V16.4457C13.8333 17.4583 13.0125 18.2791 12 18.2791C10.9875 18.2791 10.1667 17.4583 10.1667 16.4457V6.65116" stroke="#262D29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </g>
                          </svg>
                          <input type="file" id="file" hidden/>
                      </label>
                      <div className='w-full'>
                          <InputSearch className='w-full' type="text" placeholder='Напишите сообщение' >
                              <img className='cursor-pointer' src="/svg/send.svg" alt="Image"/>
                          </InputSearch>
                      </div>
                     
                  </div>
              </div>
          </div>
      </Box>
    )
}

export default Message
