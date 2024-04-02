import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    image?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
        className,
        type,
        value,
        ...props
    }, ref) => {
      return (
        <input
          type={ type }
          className={ cn(
            "flex h-10 w-full rounded-[32px] bg-background py-[12px] px-[24px] border-primary border text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-text disabled:border-none",
            className
          ) }
          ref={ ref }
          value={ value }
          { ...props }
        />
      )
  }
)
Input.displayName = "Input"

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, type, ...props }, ref) => {
      return (
        <div className='border h-10  border-input px-[24px] py-[12px] rounded-[32px] flex items-center gap-[12px]'>
            <input
              type={ type }
              className={ cn(
                "flex w-full rounded-md bg-background text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
              ) }
              ref={ ref }
              { ...props }
            />
            { children }
        </div>
      
      )
  }
)
Input.displayName = "InputSearch"

const InputFile = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, image, children, type, ...props }, ref) => {
      return (
        <label style={ {
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: image ? `url(${ image })` : 'url("/images/no-photo.png")',
        }} className={ cn(
          "border w-[100%] h-[100%] border-input rounded-[32px] flex items-center gap-[12px]",
          className
        ) }>
            <input
              type={ "file" }
              hidden
              ref={ ref }
              { ...props }
            />
            { children }
        </label>
      
      )
  }
)
Input.displayName = "InputFile"

export { Input, InputSearch, InputFile }
