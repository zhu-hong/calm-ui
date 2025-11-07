import { FC, HTMLAttributes, InputHTMLAttributes, ReactNode, RefAttributes } from 'react'
import { InputEffect } from './effect'
import clsx from 'clsx'

type InputAttrs = InputHTMLAttributes<HTMLInputElement>

type InputProps = {
  inputAttrs?: InputAttrs
  prefixNode?: ReactNode
  suffixNode?: ReactNode
  name?: InputAttrs['name']
  type?: InputAttrs['type']
  placeholder?: InputAttrs['placeholder']
  autoFocus?: InputAttrs['autoFocus']
  value?: InputAttrs['value']
  onValueChange?: (value: string) => void
  readOnly?: InputAttrs['readOnly']
  disabled?: InputAttrs['disabled']
  wrapperId?: HTMLAttributes<HTMLDivElement>['id']
}

export const Input: FC<
  HTMLAttributes<HTMLDivElement>
  & InputProps
  & RefAttributes<HTMLInputElement>
> = ({
  prefixNode,
  suffixNode,
  id,
  name,
  type,
  placeholder,
  autoFocus,
  value,
  onValueChange,
  readOnly,
  disabled,
  inputAttrs,
  wrapperId,
  ref,
  ...props
}) => {
  return <InputEffect {...props} id={wrapperId} disabled={disabled ?? inputAttrs?.disabled} className={clsx('cm-input', props.className)}>
    {prefixNode}
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      readOnly={readOnly}
      disabled={disabled}
      {...inputAttrs}
      className={clsx('cm-input-inner', inputAttrs?.className)}
      ref={ref}
    />
    {suffixNode}
  </InputEffect>
}
