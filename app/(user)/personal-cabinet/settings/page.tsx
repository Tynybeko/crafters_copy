import React from 'react'

function Settings() {
  return (
    <div>
      <div className=' shadow-[0px_0px_12px_0px_#0000000A] border border-solid border-[#262D291A] rounded-[24px] p-[24px]'>
        <div className='flex items-center justify-between mb-[24px]'>
          <div className='flex items-center gap-[8px]'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_4127_14082)">
                <path d="M10.0013 13.3327V9.99935M10.0013 6.66602H10.0096M18.3346 9.99935C18.3346 14.6017 14.6037 18.3327 10.0013 18.3327C5.39893 18.3327 1.66797 14.6017 1.66797 9.99935C1.66797 5.39698 5.39893 1.66602 10.0013 1.66602C14.6037 1.66602 18.3346 5.39698 18.3346 9.99935Z" stroke="#262D29" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_4127_14082">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className='text-[#262D2999] font-[400] text-[16px] leading-[18px]'>Additional information</p>
          </div>
          <button className='flex items-center gap-[5px]'>
            <p className='text-[#262D2966] font-[400] text-[16px] leading-[18px]'>Edit</p>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33203 2.66617H4.53203C3.41193 2.66617 2.85187 2.66617 2.42405 2.88415C2.04773 3.0759 1.74176 3.38186 1.55002 3.75819C1.33203 4.18601 1.33203 4.74606 1.33203 5.86617V11.4662C1.33203 12.5863 1.33203 13.1463 1.55002 13.5741C1.74176 13.9505 2.04773 14.2564 2.42405 14.4482C2.85187 14.6662 3.41193 14.6662 4.53203 14.6662H10.132C11.2521 14.6662 11.8122 14.6662 12.24 14.4482C12.6163 14.2564 12.9223 13.9505 13.114 13.5741C13.332 13.1463 13.332 12.5863 13.332 11.4662V8.66617M5.33201 10.6662H6.44838C6.7745 10.6662 6.93756 10.6662 7.09101 10.6293C7.22706 10.5967 7.35711 10.5428 7.47641 10.4697C7.61097 10.3872 7.72627 10.2719 7.95687 10.0413L14.332 3.66617C14.8843 3.11388 14.8843 2.21845 14.332 1.66617C13.7797 1.11388 12.8843 1.11388 12.332 1.66617L5.95685 8.04133C5.72625 8.27193 5.61095 8.38723 5.52849 8.52179C5.45539 8.64108 5.40152 8.77114 5.36885 8.90719C5.33201 9.06064 5.33201 9.2237 5.33201 9.54982V10.6662Z" stroke="#262D29" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div className='flex'>
          <div className='w-[50%]'>
            <h3 className='text-[#262D2999] font-[400] text-[16px] leading-[18px] mb-[12px]'>Payment</h3>
            <p className='text-[#262D29] font-[400] text-[16px] leading-[18px]'>This Privacy Policy describes how we collect, use, and protect the information you provide when using our website...</p>
          </div>
          <div className='w-[50%]'>
            <h3 className='text-[#262D2999] font-[400] text-[16px] leading-[18px] mb-[12px]'>Delivery</h3>
            <p className='text-[#262D29] font-[400] text-[16px] leading-[18px]'>This Privacy Policy describes how we collect, use, and protect the information you provide when using our website describes how we collect, use, and protect the information you provide when using our website how we collect, use, and protect the information you provide when using our website.</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-[8px] mt-[24px]'>
        <p className='text-[#262D2999] font-[400] text-[16px] leading-[18px]'>Mbank details connections</p>
        <button className='text-[white] font-[400] text-[16px] leading-[18px] py-[12px] w-[312px] border border-solid bg-[#1DBE60] border-[#1DBE60] shadow-[4px_4px_12px_0px_#00000033] rounded-[32px]'>Connections</button>
        <button className='text-[#F83427] font-[400] text-[16px] leading-[18px] py-[12px] w-[312px] border border-solid border-[#F83427] shadow-[4px_4px_12px_0px_#00000033] rounded-[32px]'>Delete account</button>
      </div>
    </div>
  )
}

export default Settings
