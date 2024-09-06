import { CSSProperties, forwardRef, HTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { useThemeContext } from '@calm-ui/theme'

type InputProps = {
  wrapperAttrs?: HTMLAttributes<HTMLDivElement>
  prefix?: ReactNode
  suffix?: ReactNode
}

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & InputProps
>(({ prefix, suffix, wrapperAttrs, ...props }, ref) => {
  const { palette: { primary } } = useThemeContext()

  return <div {...wrapperAttrs} className={clsx('cm-input-wrapper', props.disabled && 'cm-input-disabled',  wrapperAttrs?.className)} style={{
    '--cm-input-underline-color': primary,
    ...wrapperAttrs?.style,
  } as CSSProperties}>
    {prefix}
    <textarea rows={5} {...props} className={clsx('cm-input', props.className)} ref={ref} />
    {suffix}
  </div>
})
