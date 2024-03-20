import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[32px] bg-background py-[12px] px-[24px] border-primary border text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
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
              type={type}
              className={cn(
                "flex w-full rounded-md bg-background text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
              ref={ref}
              {...props}
            />
            {children}
        </div>
       
      )
  }
)
Input.displayName = "InputSearch"

export { Input, InputSearch}
