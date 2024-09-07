import './style.css'

import { IconButton } from '@calm-ui/button'
import { Root, Item, Indicator } from '@radix-ui/react-radio-group'
import { CSSProperties, forwardRef, useMemo } from 'react'
import clsx from 'clsx'
import { useThemeContext } from '@calm-ui/theme'
import { TinyColor } from '@ctrl/tinycolor'

export const RadioGroup: typeof Root = forwardRef(({ ...props }, ref) => {
  return <Root {...props} ref={ref} className={clsx('cm-radio-group', props.className)} />
})

export const Radio: typeof Item = forwardRef(({ ...props }, ref) => {
  const { palette: { primary } } = useThemeContext()

  const radioColors = useMemo(() => {
    const { r, g, b } = new TinyColor(primary).toRgb()

    return {
      '--cm-radio-checked-text-color': primary,
      '--cm-radio-checked-hover-bg-color': `rgba(${r}, ${g}, ${b}, .1)`,
    }
  }, [primary])

  return <Item {...props} ref={ref} asChild>
    <IconButton
      style={{
        padding: '6px',
        ...radioColors,
      } as CSSProperties}
      className='cm-radio'
      theme='#666666'
    >
      <Indicator asChild forceMount>
        <span className='cm-radio-inner'></span>
      </Indicator>
    </IconButton>
  </Item>
})
