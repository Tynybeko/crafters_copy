import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[32px] text-[16px] font-[400] transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground ring-[(0, 0%, 0%, 0.2)] shadow-[4px_4px_12px_0px_#00000033]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        destructiveOutline:
          "bg-white text-destructive border border-destructive hover:bg-destructive/20",
        outline:
          "border border-primary bg-white text-primary ",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:text-primary",
        link: "text-primary underline-offset-4 !h-max hover:underline",
      },
      size: {
        default: "h-[40px] px-[36px] py-[12px]",
        sm: "h-[40px] px-[40px] py-[12px]",
        full: "h-[40px] w-full px-[30px] py-[12px]",
        icon: "h-10 w-10",
        small: "py-2 px-6",
        link: "p-0 underline-offset-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
