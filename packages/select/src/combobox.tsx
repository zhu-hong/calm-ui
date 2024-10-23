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

  useEffect(() => {
    if(isOpen) {
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
    const value = e.target.value
    setInputValue(value)
  }

  const ref = useMergeRefs([propRef, refs.setReference])

  const items = useMemo(() => {
    if(!options) return []

    return options.map((option) => {
      return {
        ...option,
        name: `${option.name}`,
        value: `${option.value}`,
      }
    }).filter(({ name }) => name.includes(inputValue))
  }, [options, inputValue])

  const onBlur = () => {
    setInputValue(inputText)
  }

  const selectOption = (option: Option) => {
    onSelectOption?.(option)
    setIsOpen(false)
    setActiveIndex(null)
  }

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
          className={clsx('cm-select-input cm-combobox-input', inputAttrs?.className)}
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
      </InputEffect>
      {isOpen && (
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
                  ref={(node) => {
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
