import { InputEffect, INPUT_EFFECT_FOCUSED_CLASSNAME } from '@calm-ui/input'
import { Ripple } from '@calm-ui/ripple'
import { useThemeContext } from '@calm-ui/theme'
import { CSSProperties, FocusEvent, forwardRef, HTMLAttributes, InputHTMLAttributes, KeyboardEvent, MouseEvent, TouchEvent, useEffect, useMemo, useRef, useState } from 'react'
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
} from '@floating-ui/react'
import { TinyColor } from '@ctrl/tinycolor'
import { DFSOptions, Option } from './util'

type InputAttrs = InputHTMLAttributes<HTMLInputElement>

type SelectProps = {
  options?: Option[] | undefined | null
  inputAttrs?: InputAttrs
  zIndex?: number
  name?: InputAttrs['name']
  placeholder?: InputAttrs['placeholder']
  autoFocus?: InputAttrs['autoFocus']
  value?: InputAttrs['value']
  onValueChange?: (value: string) => void
  disabled?: InputAttrs['disabled']
  wrapperId?: HTMLAttributes<HTMLDivElement>['id']
  onOpen?: () => void
}

export const TreeSelect = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLDivElement> & SelectProps
>(({
  options,
  zIndex = 150,
  id,
  name,
  placeholder,
  autoFocus,
  value,
  onValueChange,
  disabled,
  inputAttrs,
  wrapperId,
  onOpen,
  ...props
}, ref) => {
  const { palette: { primary, default: defaultColor } } = useThemeContext()

  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number|null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null)

  useEffect(() => {
    if(isOpen) {
      onOpen?.()
    }
  }, [isOpen])

  const listRef = useRef<(HTMLElement|null)[]>([])

  const styleCssVar = useMemo(() => {
    const { r, g, b } = new TinyColor(primary).toRgb()
    const { r: dr, g: dg, b: db } = new TinyColor(defaultColor).toRgb()

    return {
      '--cm-select-color': defaultColor,
      '--cm-select-selected-color': primary,
      '--cm-select-hover-color': `rgba(${dr}, ${dg}, ${db}, .1)`,
      '--cm-select-selected-actived-color': `rgba(${r}, ${g}, ${b}, .2)`,
      '--cm-select-selected-bg-color': `rgba(${r}, ${g}, ${b}, .1)`,
    }
  }, [primary, defaultColor])

  const inputValue = useMemo(() => {
    return inputAttrs?.value ?? value
  }, [value, inputAttrs?.value])
  
  const [unExpandKeys, setUnExpandKeys] = useState<string[]>([])
  const optionList = useMemo(() => {
    if(!options) return []

    return DFSOptions(options, unExpandKeys).map((option) => {
      return {
        ...option,
        name: option.name ?? `${option.value}`,
        key: option.name ?? `${option.value}`,
      }
    })
  }, [options, unExpandKeys])
  const valueLabel = useMemo(() => {
    if(inputValue === undefined) return

    return optionList.find((o) => o.value === inputValue)?.name ?? `${inputValue}`
  }, [optionList, inputValue])

  useEffect(() => {
    if(!isOpen) return
    setSelectedIndex(optionList.filter((o) => o.show).findIndex((o) => o.value === inputValue) ?? null)
  }, [optionList, inputValue, isOpen])

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
            maxHeight: `${Math.min(Math.max(250, availableHeight), 520)}px`,
            width: `${rects.reference.width}px`,
          } as CSSProperties)
        },
        padding: 12,
      }),
      flip({
        padding: 4,
      }),
    ],
  })

  const toggleShow = (key: string) => {
    if(unExpandKeys.includes(key)) {
      setUnExpandKeys(unExpandKeys.filter((k) => k !== key))
      return
    }
    setUnExpandKeys([...unExpandKeys, key])
  }

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
  ])
  const handleSelect = (optionValue: any) => {
    setIsOpen(false)
    if(optionValue === inputValue) return
    onValueChange?.(optionValue)
  }

  return <>
    <InputEffect
      ref={refs.setReference}
      aria-autocomplete='none'
      data-state={isOpen ? 'open' : 'closed'}
      disabled={disabled}
      tabIndex={0}
      {...getReferenceProps({
        ...props,
        className: clsx('cm-select', isOpen && INPUT_EFFECT_FOCUSED_CLASSNAME, props?.className),
        id: wrapperId,
      })}
    >
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        value={value}
        disabled={disabled}
        {...inputAttrs}
        ref={ref}
        type='text'
        className={clsx('cm-select-input', inputAttrs?.className)}
        readOnly
        tabIndex={-1}
      />
      <svg className='cm-select-arrow' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17"></path></svg>
      <span className='cm-select-label'>{valueLabel}</span>
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
              onClick: (e: MouseEvent) => e.stopPropagation(),
              onMouseDown: (e: MouseEvent) => e.stopPropagation(),
              onTouchStart: (e: TouchEvent) => e.stopPropagation(),
              onKeyDown: (e: KeyboardEvent) => e.stopPropagation(),
              onFocus: (e: FocusEvent) => e.stopPropagation(),
            })}
          >
            {
              optionList.filter((o) => o.show).map((option, i) => (
                <Ripple
                  as='div'
                  key={option.key}
                  ref={(node) => {
                    listRef.current[i] = node
                  }}
                  aria-selected={i === selectedIndex}
                  aria-disabled={option.disabled??undefined}
                  disableRipple={option.disabled}
                  {...getItemProps({
                    role: 'option',
                    tabIndex: i === activeIndex ? 0 : -1,
                    className: clsx('cm-select-list-item cm-select-treelist-item', selectedIndex === i && 'cm-select-list-selected-item', activeIndex === i && 'cm-select-list-actived-item', option.disabled && 'cm-select-list-item-disabled'),
                    onClick: () => {
                      if(option.disabled) return
                      handleSelect(option.value)
                    },
                    onKeyDown(event) {
                      if(event.key === 'Enter') {
                        event.preventDefault()
                        handleSelect(option.value)
                      }

                      if(event.key === ' ') {
                        event.preventDefault()
                      }
                    },
                    onKeyUp(event) {
                      if(event.key === ' ') {
                        handleSelect(option.value)
                      }
                    },
                    style: {
                      paddingLeft: option.level * 12 + 12,
                    },
                  })}
                >
                  <svg onClick={(e) => {
                    e.stopPropagation()
                    toggleShow(option.value)
                  }} xmlns="http://www.w3.org/2000/svg" className={clsx('cm-select-treelist-item-expand', option.canExpand && 'cm-select-treelist-item-canexpan', option.expand && 'cm-select-treelist-item-expaned')} width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M4.94 5.333 8 8.387l3.06-3.054.94.94-4 4-4-4z"></path></svg>
                  <span className='cm-select-treelist-item-value'>
                    {
                      option.name
                    }
                  </span>
                </Ripple>
              ))
            }
            {
              (!options || options.length === 0) && <div className='cm-select-list-empty'>暂无数据</div>
            }
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    }
  </>
})

