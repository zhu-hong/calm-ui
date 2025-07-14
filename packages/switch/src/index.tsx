import './style.css'

import { ComponentProps, CSSProperties, FC, useMemo } from 'react'
import { useThemeContext } from '@calm-ui/theme'
import { TinyColor } from '@ctrl/tinycolor'
import clsx from 'clsx'
import { Root, Thumb } from '@radix-ui/react-switch'

export const Switch: FC<
  ComponentProps<typeof Root>
> = ({ ref, ...props }) => {
  const { palette: { primary } } = useThemeContext()
  
  const trackColor = useMemo(() => {
    const { r, g, b } = new TinyColor(primary).toRgb()
    return `rgba(${r},${g},${b},${.38})`
  }, [primary])

  return <Root
    {...props}
    ref={ref}
    className={clsx('cm-switch', props.className)}
  >
    <Thumb
      className='cm-switch-track'
      style={{
        '--cm-switch-track-bg-color': trackColor,
        '--cm-switch-thumb-bg-color': primary,
      } as CSSProperties}
    >
      <i className='cm-switch-thumb'></i>
    </Thumb>
  </Root>
}
