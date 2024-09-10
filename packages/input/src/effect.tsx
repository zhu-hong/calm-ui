import { CSSProperties, forwardRef, HTMLAttributes } from 'react'
import clsx from 'clsx'
import { useThemeContext } from '@calm-ui/theme'

export const INPUT_EFFECT_FOCUSED_CLASSNAME = 'cm-input-effect-focused'

export const InputEffect = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { disabled?: boolean; }
>(({ disabled, ...props }, ref) => {
  const { palette: { primary } } = useThemeContext()

  return <div
    {...props}
    className={clsx('cm-input-effect', props.className)}
    data-disabled={disabled?true:undefined}
    style={{
      '--cm-input-effect-underline-color': primary,
      ...props.style,
    } as CSSProperties}
    ref={ref}
  >
  </div>
})
