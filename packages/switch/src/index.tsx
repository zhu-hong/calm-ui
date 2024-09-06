import './style.css'

import { CSSProperties, forwardRef, useMemo } from 'react'
import { useThemeContext } from '@calm-ui/theme'
import { TinyColor } from '@ctrl/tinycolor'
import clsx from 'clsx'
import { Root, Thumb } from '@radix-ui/react-switch'

export const Switch: typeof Root = forwardRef(({ ...props }, ref) => {
  const { palette: { primary } } = useThemeContext()

  const checked = useMemo(() => {
    return props.checked ?? props.defaultChecked ?? false
  }, [props.checked, props.defaultChecked])
  
  const thumbColor = useMemo(() => {
    return checked ? primary : '#ffffff'
  }, [checked, primary])
  
  const trackColor = useMemo(() => {
    const { r, g, b } = new TinyColor(checked?primary:'#000000').toRgb()
    return `rgba(${r},${g},${b},${.3})`
  }, [checked, primary])

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
