import { forwardRef, HTMLAttributes, TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'
import { InputEffect } from './effect'

type InputProps = {
  wrapperAttrs?: HTMLAttributes<HTMLDivElement>
}

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & InputProps
>(({ wrapperAttrs, ...props }, ref) => {
  return <InputEffect {...wrapperAttrs} disabled={props.disabled}>
    <textarea rows={5} {...props} className={clsx('cm-textarea', props.className)} ref={ref} />
  </InputEffect>
})
