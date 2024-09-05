import { CSSProperties, forwardRef, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { useThemeContext } from '@calm-ui/theme'

type InputProps = {
  wrapperAttrs?: HTMLAttributes<HTMLDivElement>
  prefix?: ReactNode
  suffix?: ReactNode
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & InputProps
>(({ prefix, suffix, wrapperAttrs, ...props }, ref) => {
  const { palette: { primary } } = useThemeContext()

  return <div {...wrapperAttrs} className={clsx('cm-input-wrapper', props.disabled && 'cm-input-disabled',  wrapperAttrs?.className)} style={{
    '--cm-primary-color': primary,
  } as CSSProperties}>
    {prefix}
    <input {...props} className={clsx('cm-input', props.className)} ref={ref} />
    {suffix}
  </div>
})
