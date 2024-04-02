import React from 'react'

interface Props {
    children?: React.ReactNode
    className?: string
}


function Box({children, className}: Props) {
    return (
      <div className={`${className} w-full shadow-[0px_0px_12px_0px_#0000000A] border border-[#262D291A] rounded-[24px]`}>
          {children}
      </div>
    )
}

export default Box

