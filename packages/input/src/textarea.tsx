import { FC, HTMLAttributes, RefAttributes, TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'
import { InputEffect } from './effect'

type InputAttrs = TextareaHTMLAttributes<HTMLTextAreaElement>

type InputProps = {
  inputAttrs?: TextareaHTMLAttributes<HTMLTextAreaElement>
  name?: InputAttrs['name']
  placeholder?: InputAttrs['placeholder']
  autoFocus?: InputAttrs['autoFocus']
  rows?: InputAttrs['rows']
  value?: InputAttrs['value']
  onValueChange?: (value: string) => void
  readOnly?: InputAttrs['readOnly']
  disabled?: InputAttrs['disabled']
  wrapperId?: HTMLAttributes<HTMLDivElement>['id']
}

export const Textarea: FC<
  HTMLAttributes<HTMLDivElement>
  & InputProps
  & RefAttributes<HTMLTextAreaElement>
> = ({
  id,
  name,
  placeholder,
  autoFocus,
  rows,
  value,
  onValueChange,
  readOnly,
  disabled,
  inputAttrs,
  wrapperId,
  ref,
  ...props
}) => {
  return <InputEffect {...props} id={wrapperId} disabled={inputAttrs?.disabled} className={clsx('cm-textarea', props?.className)}>
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      autoFocus={autoFocus}
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
}
