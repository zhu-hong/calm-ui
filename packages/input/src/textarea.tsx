import { forwardRef, HTMLAttributes, TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'
import { InputEffect } from './effect'

type InputAttrs = TextareaHTMLAttributes<HTMLTextAreaElement>

type InputProps = {
  textareaAttrs?: TextareaHTMLAttributes<HTMLTextAreaElement>
  inputId?: InputAttrs['id']
  name?: InputAttrs['name']
  placeholder?: InputAttrs['placeholder']
  autoFocus?: InputAttrs['autoFocus']
  maxLength?: InputAttrs['maxLength']
  rows?: InputAttrs['rows']
  value?: InputAttrs['value']
  onValueChange?: (value: string) => void
  readOnly?: InputAttrs['readOnly']
  disabled?: InputAttrs['disabled']
}

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  HTMLAttributes<HTMLDivElement> & InputProps
>(({
  inputId,
  name,
  placeholder,
  autoFocus,
  maxLength,
  rows,
  value,
  onValueChange,
  readOnly,
  disabled,
  textareaAttrs: inputAttrs,
  ...props
}, ref) => {
  return <InputEffect {...props} disabled={inputAttrs?.disabled} className={clsx('cm-textarea', props?.className)}>
    <textarea
      id={inputId}
      name={name}
      placeholder={placeholder}
      autoFocus={autoFocus}
      maxLength={maxLength??100}
      rows={rows??5}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      readOnly={readOnly}
      disabled={disabled}
      {...inputAttrs}
      className={clsx('cm-textarea-inner', inputAttrs?.className)}
      ref={ref}
    />
  </InputEffect>
})
