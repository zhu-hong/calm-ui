import { forwardRef, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { InputEffect } from './effect'
import clsx from 'clsx'

type InputProps = {
  wrapperAttrs?: HTMLAttributes<HTMLDivElement>
  prefix?: ReactNode
  suffix?: ReactNode
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & InputProps
>(({ prefix, suffix, wrapperAttrs, ...props }, ref) => {
  return <InputEffect {...wrapperAttrs} disabled={props.disabled} className={clsx('cm-input', wrapperAttrs?.className)}>
    {prefix}
    <input {...props} className={clsx('cm-input-inner', props.className)} ref={ref} />
    {suffix}
  </InputEffect>
})
