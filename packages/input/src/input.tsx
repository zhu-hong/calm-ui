import { forwardRef, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { InputEffect } from './effect'
import clsx from 'clsx'

type InputAttrs = InputHTMLAttributes<HTMLInputElement>

type InputProps = {
  inputAttrs?: InputAttrs
  prefix?: ReactNode
  suffix?: ReactNode
  inputId?: InputAttrs['id']
  name?: InputAttrs['name']
  inputType?: InputAttrs['type']
  placeholder?: InputAttrs['placeholder']
  autoFocus?: InputAttrs['autoFocus']
  maxLength?: InputAttrs['maxLength']
  value?: InputAttrs['value']
  onValueChange?: (value: string) => void
  readOnly?: InputAttrs['readOnly']
  disabled?: InputAttrs['disabled']
}

export const Input = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLDivElement> & InputProps
>(({
  prefix,
  suffix,
  inputId,
  name,
  inputType,
  placeholder,
  autoFocus,
  maxLength,
  value,
  onValueChange,
  readOnly,
  disabled,
  inputAttrs,
  ...props
}, ref) => {
  return <InputEffect {...props} disabled={disabled ?? inputAttrs?.disabled} className={clsx('cm-input', props.className)}>
    {prefix}
    <input
      id={inputId}
      name={name}
      type={inputType}
      placeholder={placeholder}
      autoFocus={autoFocus}
      maxLength={maxLength}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      readOnly={readOnly}
      disabled={disabled}
      {...inputAttrs}
      className={clsx('cm-input-inner', inputAttrs?.className)}
      ref={ref}
    />
    {suffix}
  </InputEffect>
})
