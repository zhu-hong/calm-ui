import { cloneElement, createContext, CSSProperties, FC, FocusEvent, isValidElement, KeyboardEvent, MouseEvent, ReactNode, TouchEvent, useContext, useMemo, useRef, useState } from 'react'
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  inline,
  offset,
  Placement,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react'
import { useThemeContext } from '@calm-ui/theme'

import './style.css'

type TooltipOptions = {
  placement?: Placement
  zIndex?: number
  delay?: number
  children: ReactNode
  content: ReactNode
  enterable?: boolean
}

type ContextType = (ReturnType<typeof useTooltip>) | null

const useTooltip = ({
  placement = 'top',
  zIndex = 150,
  children: trigger,
  content,
  delay = 520,
  enterable,
}: TooltipOptions) => {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef(null)

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(12),
      inline(),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
        padding: 4,
      }),
    ],
  })

  const { context } = data

  const hover = useHover(context, {
    restMs: delay,
    handleClose: enterable ? safePolygon() : null,
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    role: 'label',
  })

  const interactions = useInteractions([hover, focus, dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      zIndex,
      trigger,
      content,
      arrowRef,
    }),
    [
      open,
      setOpen,
      interactions,
      data,
      zIndex,
      trigger,
      content,
      arrowRef,
    ]
  )
}

const TooltipContext = createContext<ContextType>(null)

const useTooltipContext = () => {
  const context = useContext(TooltipContext)

  if(context === null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />')
  }

  return context
}

export const Tooltip: FC<TooltipOptions & { children: ReactNode; content: ReactNode; }> = ({
  placement,
  zIndex,
  children,
  content,
  delay,
  enterable,
}) => {
  const tooltip = useTooltip({
    placement,
    zIndex,
    children,
    content,
    delay,
    enterable,
  })

  return <TooltipContext.Provider value={tooltip}>
    <TooltipTrigger />
    <TooltipContent />
  </TooltipContext.Provider>
}

const TooltipTrigger = () => {
  const { open, setOpen, trigger, ...context } = useTooltipContext()

  const childrenRef = (trigger as any)?.ref
  const ref = useMergeRefs([childrenRef, context.refs.setReference])

  if(isValidElement(trigger)) {
    return cloneElement(
      trigger,
      context.getReferenceProps({
        ref,
        ...(trigger.props as any),
        'data-state': open ? 'open' : 'closed',
      }),
    )
  }

  return trigger
}

const TooltipContent = () => {
  const { content, context: floatingContext, zIndex, ...context } = useTooltipContext()

  if(!content) return null

  const { palette: { default: tooltipColor } } = useThemeContext()

  const { isMounted, styles } = useTransitionStyles(floatingContext, {
    duration: 170,
    initial: ({ side }) => {
      let transform = ''

      if(side === 'top') {
        transform = 'translateY(0.25rem)'
      } else if(side === 'right') {
        transform = 'translateX(-0.25rem)'
      } else if(side === 'bottom') {
        transform = 'translateY(-0.25rem)'
      } else if(side === 'left') {
        transform = 'translateX(0.25rem)'
      }

      return {
        opacity: 0,
        transform,
      }
    },
  })

  return isMounted && <FloatingPortal>
    <div
      ref={floatingContext.refs.setFloating}
      {...context.getFloatingProps({
        className: 'cm-tooltip',
        style: {
          position: context.strategy,
          top: context.y ?? 0,
          left: context.x ?? 0,
          zIndex,
          '--cm-tooltip-bg-color': tooltipColor,
          ...styles,
        } as CSSProperties,
        onClick: (e: MouseEvent) => e.stopPropagation(),
        onMouseDown: (e: MouseEvent) => e.stopPropagation(),
        onTouchStart: (e: TouchEvent) => e.stopPropagation(),
        onKeyDown: (e: KeyboardEvent) => e.stopPropagation(),
        onFocus: (e: FocusEvent) => e.stopPropagation(),
      })}
    >
      {content}
      <FloatingArrow
        ref={context.arrowRef}
        context={floatingContext}
        fill={tooltipColor}
      />
    </div>
  </FloatingPortal>
}
