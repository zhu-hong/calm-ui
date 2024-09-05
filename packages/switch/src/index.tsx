import './style.css'

import { CSSProperties, forwardRef, useMemo } from 'react'
import { useThemeContext } from '@calm-ui/theme'
import { TinyColor } from '@ctrl/tinycolor'
import clsx from 'clsx'
import { Root, Thumb, SwitchProps } from '@radix-ui/react-switch'

export const Switch = forwardRef<
  HTMLButtonElement,
  SwitchProps
>(({ ...props }, ref) => {
  const { palette: { primary, default: defaultColor } } = useThemeContext()

  const checked = useMemo(() => {
    return props.checked ?? props.defaultChecked ?? false
  }, [props.checked, props.defaultChecked])
  
  const thumbColor = useMemo(() => {
    return checked ? primary : '#ffffff'
  }, [checked, primary])
  
  const trackColor = useMemo(() => {
    const { r, g, b } = new TinyColor(checked?primary:defaultColor).toRgb()
    return `rgba(${r},${g},${b},${.2})`
  }, [checked, primary, defaultColor])

  return <Root
    {...props}
    ref={ref}
    className={clsx('cm-switch', props.className)}
  >
    <Thumb
      className='cm-switch-thumb'
      style={{
        '--cm-switch-track-bgcolor': trackColor,
        color: thumbColor,
      } as CSSProperties}
    >
      <i className='cm-switch-thumb-inner'></i>
    </Thumb>
  </Root>
})
