import './style.css'

import { InputEffect, INPUT_EFFECT_FOCUSED_CLASSNAME } from '@calm-ui/input'
import { Ripple } from '@calm-ui/ripple'
import { useThemeContext } from '@calm-ui/theme'
import { CSSProperties, forwardRef, HTMLAttributes, InputHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
  useTypeahead,
} from '@floating-ui/react'
import { TinyColor } from '@ctrl/tinycolor'

type InputAttrs = InputHTMLAttributes<HTMLInputElement>

type SelectProps = {
  options?: ({ name?: string; value: any; })[]
  inputAttrs?: InputAttrs
  zIndex?: number
  inputId?: InputAttrs['id']
  name?: InputAttrs['name']
  placeholder?: InputAttrs['placeholder']
  value?: InputAttrs['value']
  onValueChange?: (value: string) => void
  disabled?: InputAttrs['disabled']
}

export const Select = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLDivElement> & SelectProps
>(({
  options,
  zIndex = 50,
  inputId,
  name,
  placeholder,
  value,
  onValueChange,
  disabled,
  inputAttrs,
  ...props
}, ref) => {
  const { palette: { primary, default: defaultColor } } = useThemeContext()

  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number|null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null)

  const listRef = useRef<(HTMLElement|null)[]>([])
  const listContentRef = useRef<string[]>([])
  const isTypingRef = useRef(false)

  const styleCssVar = useMemo(() => {
    const { r, g, b } = new TinyColor(primary).toRgb()
    const { r: dr, g: dg, b: db } = new TinyColor(defaultColor).toRgb()

    return {
      '--cm-select-color': defaultColor,
      '--cm-select-selected-bg-color': `rgba(${r}, ${g}, ${b}, .1)`,
      '--cm-select-selected-actived-color': `rgba(${r}, ${g}, ${b}, .2)`,
      '--cm-select-selected-color': primary,
      '--cm-select-hover-color': `rgba(${dr}, ${dg}, ${db}, .1)`,
    }
  }, [primary, defaultColor])

  const optionList = useMemo(() => {
    if(!options) return []

    return options.map((option) => {
      if(!Object.prototype.hasOwnProperty.call(option, 'value')) {
        return {
          name: `${option}`,
          value: option,
          key: `${option}`,
        }
      }
      return {
        name: option.name ?? `${option.value}`,
        value: option.value,
        key: option.name ?? `${option.value}`,
      }
    })
  }, [options])

  useEffect(() => {
    if(!isOpen) return
    const inputValue = inputAttrs?.value ?? value
    setSelectedIndex(optionList.findIndex((o) => o.value === inputValue) ?? null)
  }, [optionList, value, inputAttrs?.value, isOpen])

  const valueLabel = useMemo(() => {
    const inputValue = inputAttrs?.value ?? value
    if(inputValue === undefined) return undefined

    return optionList.find((o) => o.value === inputValue)?.name ?? `${inputValue}`
  }, [optionList, value, inputAttrs?.value])

  const { x, y, strategy, refs, context } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      size({
        // @ts-ignore
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.min(Math.max(250, availableHeight), 340)}px`,
            minWidth: `${rects.reference.width}px`,
          } as CSSProperties)
        },
        padding: 12,
      }),
      flip({
        padding: 4,
      }),
    ],
  })

  const click = useClick(context, {
    event: 'click',
  })
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    role: 'listbox',
  })
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
  })
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: isOpen ? (index) => setActiveIndex(index) : (index) => setSelectedIndex(index),
    onTypingChange: (isTyping) => isTypingRef.current = isTyping,
  })

  const transition = useTransitionStyles(context, {
    duration: 150,
    initial: ({ side }) => {
      let transform = ''

      if(side === 'top') {
        transform = 'translateY(0.5rem)'
      } else {
        transform = 'translateY(-0.5rem)'
      }
      return {
        opacity: 0,
        transform,
      }
    },
    close: {
      opacity: 0,
      transform: 'scale(.95)'
    },
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNav,
    typeahead,
  ])

  const handleSelect = (optionValue: any) => {
    setIsOpen(false)
    const inputValue = inputAttrs?.value ?? value
    if(optionValue === inputValue) return
    onValueChange?.(optionValue)
  }

  return <>
    <InputEffect
      ref={refs.setReference}
      aria-labelledby='select-label'
      aria-autocomplete='none'
      data-open={isOpen ? '' : undefined}
      disabled={disabled}
      {...getReferenceProps({
        ...props,
        className: clsx('cm-select', isOpen && INPUT_EFFECT_FOCUSED_CLASSNAME, props?.className),
        tabIndex: 0,
      })}
    >
      <input
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        disabled={disabled}
        {...inputAttrs}
        ref={ref}
        type='text'
        className={clsx('cm-select-input', inputAttrs?.className)}
        readOnly
        tabIndex={-1}
      />
      <svg className='cm-select-arrow' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="currentColor" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"></path></svg>
      <p className='cm-select-value' aria-hidden aria-label={valueLabel}>{valueLabel}</p>
    </InputEffect>

    {
      transition.isMounted && <FloatingPortal>
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            {...getFloatingProps({
              className: 'cm-select-list',
              style: {
                ...transition.styles,
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                zIndex,
                ...styleCssVar,
              } as CSSProperties,
            })}
          >
            {
              optionList.map((option, i) => (
                <Ripple
                  as='div'
                  key={option.key}
                  ref={(node) => {
                    listRef.current[i] = node
                  }}
                  aria-selected={i === selectedIndex && i === activeIndex}
                  {...getItemProps({
                    role: 'option',
                    tabIndex: i === activeIndex ? 0 : -1,
                    className: clsx('cm-select-list-item', selectedIndex === i && 'cm-select-list-selected-item', activeIndex === i && 'cm-select-list-actived-item'),
                    onClick() {
                      handleSelect(option.value)
                    },
                    onKeyDown(event) {
                      if(event.key === 'Enter') {
                        event.preventDefault()
                        handleSelect(option.value)
                      }

                      if(event.key === ' ' && !isTypingRef.current) {
                        event.preventDefault()
                      }
                    },
                    onKeyUp(event) {
                      if(event.key === ' ' && !isTypingRef.current) {
                        handleSelect(option.value)
                      }
                    },
                  })}
                >
                  {option.name}
                </Ripple>
              ))
            }
            {
              options && optionList.length === 0 && <div className='cm-select-list-empty'>暂无数据</div>
            }
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    }
  </>
})
