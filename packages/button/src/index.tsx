import { useCallback, useMemo, useState, type ButtonHTMLAttributes, type ReactNode, type MouseEventHandler, forwardRef, memo } from 'react'
import { useThemeContext } from '@calm-ui/theme'
import { Ripple, type RippleProps } from '@calm-ui/ripple'
import { TinyColor } from '@ctrl/tinycolor'
import clsx from 'clsx'

import './style.css'

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & RippleProps & {
  as?: keyof JSX.IntrinsicElements
  theme?: keyof ReturnType<typeof useThemeContext>['palette'] | (string&{});
  text?: boolean;
  outlined?: boolean;
  tag?: boolean;
  delay?: number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  loadingSize?: string;
  action?: () => Promise<unknown>;
}

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

export const Button = memo(forwardRef<
  HTMLButtonElement,
  BtnProps
>(({
  children,
  as = 'button',
  theme = 'primary',
  text = false,
  outlined = false,
  tag = false,
  delay = 500,
  startIcon,
  endIcon,
  loading = false,
  loadingSize,
  action,
  ...props
}, ref) => {
  const themeContext = useThemeContext()

  const [loadingInner, setLoadingInner] = useState(false)

  const themeColor = useMemo(() => {
    return Object.keys(themeContext.palette).includes(theme) ? themeContext.palette[theme as keyof typeof themeContext.palette] : theme
  }, [theme, themeContext])

  const bgColor = useMemo<string>(() => {
    if(text || outlined) return 'transparent'

    if(tag) {
      const { r, g, b } = new TinyColor(themeColor).toRgb()
      return `rgba(${r},${g},${b}, .1)`
    }

    return themeColor
  }, [themeColor, text, outlined, tag])

  const bgHoverColor = useMemo<string>(() => {
    if(text || outlined) {
      const { r, g, b } = new TinyColor(themeColor).toRgb()
      return `rgba(${r},${g},${b}, .1)`
    }

    if(tag) {
      const { r, g, b } = new TinyColor(themeColor).toRgb()
      return `rgba(${r},${g},${b}, .2)`
    }

    const { h, s, l, a } = new TinyColor(themeColor).toHsl()
    return new TinyColor(`hsl(${h},${s},${Math.max(l-0.05,0)},${a})`).toHexString()
  }, [themeColor, text, outlined, tag])

  const textColor = useMemo<string>(() => {
    if(text || outlined || tag) return themeColor

    return '#FFFFFF'
  }, [themeColor, text, outlined])

  const borderWidth = useMemo(() => {
    if(outlined || tag) return '1px'

    return '0px'
  }, [outlined, tag])

  const borderColor = useMemo<string>(() => {
    if(!outlined && !tag) return 'transparent'

    const { r, g, b } = new TinyColor(textColor).toRgb()
    return `rgba(${r},${g},${b},${outlined?'.2':'.5'})`
  }, [outlined, tag, textColor])

  const borderHoverColor = useMemo<string>(() => {
    if(!outlined && !tag) return 'transparent'

    const { r, g, b } = new TinyColor(textColor).toRgb()
    return `rgba(${r},${g},${b},${outlined?'.4':'1'})`
  }, [outlined, tag, textColor])

  const startIconInner = useMemo(() => {
    if(loadingInner || loading) {
      return <svg xmlns="http://www.w3.org/2000/svg" width={loadingSize??'1em'} height={loadingSize??'1em'} viewBox="0 0 24 24" style={{marginRight:'8px',flex:'none'}}>
        <g stroke="currentColor">
          <circle cx="12" cy="12" r="9.5" fill="none" strokeLinecap="round" strokeWidth="2.5">
            <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150" />
            <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59" />
          </circle>
          <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
        </g>
      </svg>
    }

    return startIcon
  }, [loading, startIcon, loadingInner, loadingSize])

  const isPrimary = useMemo(() => {
    return theme === 'primary' && !outlined && !text && !tag
  }, [theme, outlined, text, tag])

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(async (e) => {
    props.onClick?.(e)

    if(typeof action === 'function') {
      try {
        setLoadingInner(true)
        await action()
        await sleep(delay)
      } catch (error) {
        throw error
      } finally {
        setLoadingInner(false)
      }
    }
  }, [action, props.onClick])

  return <Ripple
    {...props}
    ref={ref}
    focusRipple
    as={as}
    className={clsx('cm-button', isPrimary && 'cm-primary-button', props.className)}
    disabled={props.disabled || loading || loadingInner}
    style={Object.assign({
      '--cm-button-bg-color': bgColor,
      '--cm-button-bg-hover-color': bgHoverColor,
      '--cm-button-text-color': textColor,
      '--cm-button-border-width': borderWidth,
      '--cm-button-border-color': borderColor,
      '--cm-button-border-hover-color': borderHoverColor,
    }, props.style)}
    onClick={onClick}
  >
    {startIconInner}
    {children}
    {endIcon}
  </Ripple>
}))

export const IconButton = memo(forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & RippleProps & {
    theme?: BtnProps['theme'];
    as?: BtnProps['as'];
  }
>(({ theme, ...props }, ref) => {
  return <Button
    {...props}
    ref={ref}
    text
    centerRipple
    focusRipple
    className={clsx('cm-icon-button', props.className)}
    theme={theme??'default'}
  />
}))
