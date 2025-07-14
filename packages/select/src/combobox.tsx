import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  size,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react'
import { InputEffect, INPUT_EFFECT_FOCUSED_CLASSNAME } from '@calm-ui/input'
import { Ripple } from '@calm-ui/ripple'
import { useThemeContext } from '@calm-ui/theme'
import { ChangeEvent, CSSProperties, FocusEvent, forwardRef, HTMLAttributes, InputHTMLAttributes, KeyboardEvent, MouseEvent, ReactNode, TouchEvent, useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { TinyColor } from '@ctrl/tinycolor'

type InputAttrs = InputHTMLAttributes<HTMLInputElement>

type Option = { name?: string; value: any; [prop: string]: any }

type SelectProps = {
  options?: Option[] | undefined | null
  inputAttrs?: InputAttrs
  zIndex?: number
  name?: InputAttrs['name']
  placeholder?: InputAttrs['placeholder']
  autoFocus?: InputAttrs['autoFocus']
  value?: InputAttrs['value']
  disabled?: InputAttrs['disabled']
  wrapperId?: HTMLAttributes<HTMLDivElement>['id']
  onSelectOption?: (value: Option) => void
  optionRender?: (option: Option) => ReactNode
  onOpen?: () => void
  allowClear?: boolean
  onClear?: () => void
  showAllWhenOpen?: boolean
  hiddenWhenNoOptions?: boolean
}

export const Combobox = forwardRef<
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
  disabled,
  inputAttrs,
  wrapperId,
  onOpen,
  onSelectOption,
  optionRender,
  allowClear = false,
  onClear,
  showAllWhenOpen = false,
  hiddenWhenNoOptions = false,
  ...props
}, propRef) => {
  const { palette: { primary, default: defaultColor } } = useThemeContext()
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

  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number|null>(null)

  useEffect(() => {
    const target = options?.find((o) => o.value === value)

    if(target) {
      setInputValue(target.name ?? '')
      return
    }

    setInputValue((value as string) ?? '')
  }, [value, options])

  const inputText = useMemo(() => {
    const target = options?.find((o) => o.value === value)

    if(target) {
      return target.name ?? ''
    }

    return (value as string) ?? ''
  }, [value, options])

  const [firstOpen, setFirstOpen] = useState(true)

  useEffect(() => {
    if(isOpen) {
      setFirstOpen(true)
      onOpen?.()
    }
  }, [isOpen])

  const [inputValue, setInputValue] = useState('')

  const listRef = useRef<(HTMLElement | null)[]>([])

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

  const role = useRole(context, {
    role: 'combobox'
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const navigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
    allowEscape: true,
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

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([role, dismiss, navigation, focus])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstOpen(false)

    const value = e.target.value
    setInputValue(value)

    setIsOpen(true)
    if(value && options?.length !== 0) {
      setActiveIndex(0)
    } else {
      setActiveIndex(null)
    }
  }

  const ref = useMergeRefs([propRef, refs.setReference])

  const items = useMemo(() => {
    if(!options) return []

    return options.map((option) => {
      return {
        ...option,
        name: `${option.name ?? option.value}`,
        value: `${option.value}`,
      }
    }).filter(({ name }) => showAllWhenOpen ? firstOpen ? true : name.includes(inputValue) : name.includes(inputValue))
  }, [options, inputValue, firstOpen])

  const onBlur = () => {
    setInputValue(inputText)
  }

  const selectOption = (option: Option) => {
    onSelectOption?.(option)
    setIsOpen(false)
    setActiveIndex(null)
  }

  const isEmptyValue = useMemo(() => {
    return value === undefined || value === null || value === ''
  }, [value])

  const shouldOpen = useMemo<boolean>(() => {
    if(!isOpen) return false

    if(hiddenWhenNoOptions) {
      return items.length > 0
    }
    return true
  }, [isOpen, items.length, hiddenWhenNoOptions])

  return (
    <>
      <InputEffect
        aria-autocomplete='none'
        data-state={isOpen ? 'open' : 'closed'}
        disabled={disabled}
        {...props}
        className={clsx('cm-select cm-combobox', isOpen && INPUT_EFFECT_FOCUSED_CLASSNAME, props?.className)}
        id={wrapperId}
      >
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
          ref={ref}
          value={inputValue}
          aria-autocomplete="list"
          disabled={disabled}
          {...inputAttrs}
          type='text'
          className={clsx('cm-select-input cm-combobox-input', allowClear && !isEmptyValue && 'cm-combobox-canclear', inputAttrs?.className)}
          {...getReferenceProps({
            onChange: onInputChange,
            onKeyDown(e) {
              if (
                e.key === 'Enter' &&
                activeIndex != null &&
                items[activeIndex]
              ) {
                selectOption(items[activeIndex])
              }
            },
            onBlur,
          })}
        />
        
        {
          allowClear && !isEmptyValue && <svg xmlns="http://www.w3.org/2000/svg" onClick={() => onClear?.()} width="14" height="14" viewBox="0 0 16 16" className='cm-combobox-clear'><path fill="currentColor" fillRule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L6.94 8L4.22 5.28a.75.75 0 0 1 0-1.06" clipRule="evenodd"></path></svg>
        }
      </InputEffect>
      {shouldOpen && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            visuallyHiddenDismiss
            returnFocus={false}
          >
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
              {items.map((option, i) => (
                <Ripple
                  as='div'
                  key={option.value}
                  ref={(node: HTMLDivElement) => {
                    listRef.current[i] = node
                  }}
                  {...getItemProps({
                    role: 'option',
                    tabIndex: i === activeIndex ? 0 : -1,
                    className: clsx('cm-select-list-item', activeIndex === i && 'cm-select-list-selected-item'),
                    onPointerDown: (e) => e.preventDefault(),
                    onClick: () => selectOption(option),
                  })}
                >
                  {optionRender ? optionRender(option) : option.name}
                </Ripple>
              ))}
              {
                (!items || items.length === 0) && <div className='cm-select-list-empty'>暂无数据</div>
              }
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
})
