import './style.css'

import { Root, Indicator, CheckboxProps } from '@radix-ui/react-checkbox'
import { forwardRef, useMemo } from 'react'
import { IconButton } from '@calm-ui/button'
import { TinyColor } from '@ctrl/tinycolor'
import { useThemeContext } from '@calm-ui/theme'
import clsx from 'clsx'

export const Checkbox = forwardRef<
  HTMLButtonElement,
  Omit<CheckboxProps, 'onCheckedChange'> & { onCheckedChange?: (checked: boolean) => void; size?: number }
>(({ size = 24, ...props }, ref) => {
  const { palette: { primary } } = useThemeContext()

  const checkboxColors = useMemo(() => {
    const { r, g, b } = new TinyColor(primary).toRgb()

    return {
      '--cm-checkbox-checked-text-color': primary,
      '--cm-checkbox-checked-hover-bg-color': `rgba(${r}, ${g}, ${b}, .1)`,
    }
  }, [primary])

  return <Root {...props} asChild ref={ref} className={clsx('cm-checkbox', props.className)}>
    <IconButton theme='#666666' style={{
      padding:'6px',
      ...checkboxColors,
    }}>
      <Indicator forceMount className='cm-checkbox-inner' style={{ width: size, height: size }}></Indicator>
    </IconButton>
  </Root>
})
