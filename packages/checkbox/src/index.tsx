import './style.css'

import { Root, Indicator, CheckboxProps } from '@radix-ui/react-checkbox'
import { forwardRef, useMemo } from 'react'
import { IconButton } from '@calm-ui/button'
import { TinyColor } from '@ctrl/tinycolor'
import { useThemeContext } from '@calm-ui/theme'
import clsx from 'clsx'

export const Checkbox = forwardRef<
  HTMLButtonElement,
  Omit<CheckboxProps, 'onCheckedChange'> & { onCheckedChange?: (checked: boolean) => void; }
>(({ ...props }, ref) => {
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
      <Indicator forceMount className='cm-checkbox-inner'>
        {/* {
          checked == true
          ?
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"></path>
          </svg>
          :
          checked === false
          ?
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5z"></path>
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 13h10v-2H7zm-2 8q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"></path>
          </svg>
        } */}
      </Indicator>
    </IconButton>
  </Root>
})
