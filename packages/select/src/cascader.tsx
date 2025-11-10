import { ComponentProps, CSSProperties, FC, useMemo } from 'react'
import RCCascader from 'rc-cascader/es'
import { InputEffect } from '@calm-ui/input'
import { Ripple } from '@calm-ui/ripple'
import { useThemeContext } from '@calm-ui/theme'
import { TinyColor } from '@ctrl/tinycolor'
import { IconButton } from '@calm-ui/button'

export const Cascader: FC<ComponentProps<typeof RCCascader>> = ({ ...props }) => {
  const themeContext = useThemeContext()

  const hoverColor = useMemo<string>(() => {
    const { r, g, b } = new TinyColor(themeContext.palette.default).toRgb()
    return `rgba(${r},${g},${b}, .1)`
  }, [themeContext.palette.default])

  const activeColor = useMemo<string>(() => {
    const { r, g, b } = new TinyColor(themeContext.palette.primary).toRgb()
    return `rgba(${r},${g},${b}, .2)`
  }, [themeContext])

  const activeHoverColor = useMemo<string>(() => {
    const { r, g, b } = new TinyColor(themeContext.palette.primary).toRgb()
    return `rgba(${r},${g},${b}, .3)`
  }, [themeContext])

  return (
    <InputEffect disabled={props.disabled}>
      <RCCascader
        {...props}
        prefixCls='cm-cascader'
        animation='slide'
        optionRender={(option) => (
          <Ripple tabIndex={-1} as='div' className='cm-cascader-menu-item-render' style={{
            '--cm-cascader-hover-color': hoverColor,
            '--cm-cascader-active-color': activeColor,
            '--cm-cascader-active-text-color': themeContext.palette.primary,
            '--cm-cascader-active-hover-color': activeHoverColor,
          } as CSSProperties}>
            <div className='cm-cascader-menu-item-render-label'>{props.optionRender ? props.optionRender(option) : option.label}</div>
            {
              !!option.children?.length
              &&
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='cm-cascader-menu-item-render-icon'>
                <path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z" />
              </svg>
            }
          </Ripple>
        )}
        expandIcon={null}
        removeIcon={<IconButton tabIndex={-1} style={{ flex: 'none', padding: 4 }}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path fill="#7F848B" fillRule="evenodd" d="M3.948.896a5.5 5.5 0 0 1 5.94 1.216 5.49 5.49 0 0 1 1.194 5.995A5.49 5.49 0 0 1 6 11.5a5.5 5.5 0 0 1-3.889-1.606A5.5 5.5 0 0 1 .5 6v-.11A5.5 5.5 0 0 1 3.948.896m3.347 3.105L6 5.296 4.705 4 4 4.706 5.295 6 4 7.296 4.705 8 6 6.706 7.295 8 8 7.296 6.705 6 8 4.706z" /></svg></IconButton>}
        allowClear={props.allowClear ? {
          clearIcon: <IconButton tabIndex={-1} style={{ flex: 'none', padding: 4 }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"></path></svg></IconButton>,
        } : false}
        suffixIcon={props.loading ? <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" > <g stroke="currentColor" strokeWidth={1}> <circle cx={12} cy={12} r={9.5} fill="none" strokeLinecap="round" strokeWidth={3} > <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150" ></animate> <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59" ></animate> </circle> <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" ></animateTransform> </g> </svg> : null}
      />
    </InputEffect>
  )
}
