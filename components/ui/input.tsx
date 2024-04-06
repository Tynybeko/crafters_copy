import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    image?: string
    types?: boolean
    visible?: boolean
    hidden?: any
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
            "flex h-10 w-full appearance-none rounded-[32px] bg-background py-[12px] px-[24px] border-primary border text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-text disabled:border-none",
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

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, image, types, visible, hidden,  children, type, ...props }, ref) => {
      return (
        <label className={ cn(
          "flex h-10 relative w-full overflow-hidden appearance-none rounded-[32px] bg-background border-primary border text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-text disabled:border-none",
          className
        ) } >
            <input className={ cn(
              "flex h-full w-full py-[12px] px-[24px] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              className
            ) }
              type={ visible ? 'text' : 'password' }
              ref={ ref }
              { ...props }
            />
            { children }
            <div onClick={() => hidden(!visible)} className={'absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'}>
                {visible ? <EyeOff color={'#1DBE60'}/> : <Eye color={'#1DBE60'}/>}
            </div>
            
        </label>
      )
  }
)
Input.displayName = "InputFile"

export { Input, InputSearch, InputPassword }
