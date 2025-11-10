import './style.css'

import { IconButton } from '@calm-ui/button'
import { Root, Item, Indicator } from '@radix-ui/react-radio-group'
import { ComponentProps, CSSProperties, FC, useMemo } from 'react'
import clsx from 'clsx'
import { useThemeContext } from '@calm-ui/theme'
import { TinyColor } from '@ctrl/tinycolor'

export const RadioGroup: FC<
  ComponentProps<typeof Root>
> = ({ ...props }) => {
  return <Root {...props} className={clsx('cm-radio-group', props.className)} />
}

export const Radio: FC<
  ComponentProps<typeof Item>
  &
  { size?: number }
> = ({ size = 24, ...props }) => {
  const themeContext = useThemeContext()

  const radioColors = useMemo(() => {
    const { r, g, b } = new TinyColor(themeContext.palette.primary).toRgb()

    return {
      '--cm-radio-checked-text-color': themeContext.palette.primary,
      '--cm-radio-checked-hover-bg-color': `rgba(${r}, ${g}, ${b}, .1)`,
    }
  }, [themeContext])

  return <Item {...props} asChild>
    <IconButton
      style={{
        padding: '6px',
        ...radioColors,
      } as CSSProperties}
      className='cm-radio'
      theme='#666666'
    >
      <Indicator asChild forceMount>
        <span className='cm-radio-inner' style={{ width: size, height: size }}></span>
      </Indicator>
    </IconButton>
  </Item>
}
