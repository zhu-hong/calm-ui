import { CSSProperties, FC, HTMLAttributes, RefAttributes } from 'react'
import clsx from 'clsx'
import { useThemeContext } from '@calm-ui/theme'

export const INPUT_EFFECT_FOCUSED_CLASSNAME = 'cm-input-effect-focused'

export const InputEffect: FC<
  HTMLAttributes<HTMLDivElement>
  & { disabled?: boolean; }
  & RefAttributes<HTMLDivElement>
> = ({ disabled, ref, ...props }) => {
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
}
