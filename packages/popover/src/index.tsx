import { cloneElement, createContext, FC, forwardRef, HTMLAttributes, isValidElement, MouseEvent, ReactNode, useContext, useMemo, useState } from 'react'
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react'

type PopoverOptions = {
  initialOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  zIndex?: number
  triggerType?: 'click'|'hover'
  children: ReactNode
  content: ReactNode
}

type ContextType = (ReturnType<typeof usePopover>) | null

const usePopover = ({
  initialOpen = false,
  placement = 'bottom',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  zIndex = 50,
  triggerType,
  children: trigger,
  content,
}: PopoverOptions) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift(),
    ],
  })

  const { context } = data
  const click = useClick(context, {
    enabled: controlledOpen === undefined && triggerType === 'click',
  })
  const hover = useHover(context, {
    enabled: controlledOpen === undefined && triggerType === 'hover',
    restMs: 150,
    handleClose: safePolygon(),
  })
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    role: 'dialog',
  })

  const interactions = useInteractions([click, hover, dismiss, role])

  const transition = useTransitionStyles(context, {
    duration: 150,
    initial: ({ side }) => {
      let transform = ''

      if(side === 'top') {
        transform = 'translateY(0.5rem)'
      } else if(side === 'right') {
        transform = 'translateX(-0.5rem)'
      } else if(side === 'bottom') {
        transform = 'translateY(-0.5rem)'
      } else if(side === 'left') {
        transform = 'translateX(0.5rem)'
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

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      transition,
      zIndex,
      trigger,
      content,
    }),
    [
      open,
      setOpen,
      interactions,
      data,
      transition,
      zIndex,
      trigger,
      content,
    ]
  )
}

const PopoverContext = createContext<ContextType>(null)

const usePopoverContext = () => {
  const context = useContext(PopoverContext)

  if(context === null) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }

  return context
}

export const Popover: FC<PopoverOptions & { children: ReactNode; content: ReactNode; }> = ({
  initialOpen,
  open,
  onOpenChange,
  placement,
  zIndex,
  triggerType = 'click',
  children,
  content,
}) => {
  const popover = usePopover({
    initialOpen,
    open,
    onOpenChange,
    placement,
    zIndex,
    triggerType,
    children,
    content,
  })

  return <PopoverContext.Provider value={popover}>
    <PopoverTrigger />
    <PopoverContent />
  </PopoverContext.Provider>
}

const PopoverTrigger = () => {
  const { open, setOpen, trigger, ...context } = usePopoverContext()

  const childrenRef = (trigger as any)?.ref
  const ref = useMergeRefs([childrenRef, context.refs.setReference])

  if(isValidElement(trigger)) {
    return cloneElement(
      trigger,
      context.getReferenceProps({
        ref,
        ...(trigger.props as any),
        'data-state': open ? 'open' : 'closed',
        onClick: (e: MouseEvent<HTMLElement>) => {
          (trigger.props as any).onClick?.(e)
          setOpen?.(!open)
        },
      }),
    )
  }

  return trigger
}

const PopoverContent = () => {
  const { transition, content, context: floatingContext, zIndex, ...context } = usePopoverContext()

  return transition.isMounted && <FloatingPortal>
    <FloatingFocusManager context={floatingContext} modal={false}>
      <div
        ref={floatingContext.refs.setFloating}
        {...context.getFloatingProps({
          className: 'cm-popover',
          style: {
            position: context.strategy,
            top: context.y ?? 0,
            left: context.x ?? 0,
            width: 'max-content',
            zIndex,
            ...transition.styles,
          }
        })}
      >
        {content}
      </div>
    </FloatingFocusManager>
  </FloatingPortal>
}

export const PopoverClose = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ asChild, children, ...props }, propRef) => {
  const { setOpen } = usePopoverContext()
  const childrenRef = (children as any)?.ref
  const ref = useMergeRefs([propRef, childrenRef])

  if(asChild && isValidElement(children)) {
    return cloneElement(
      children,
      {
        ref,
        ...props,
        ...children.props,
        onClick: (e: MouseEvent<HTMLDivElement>) => {
          setOpen?.(false)
          props.onClick?.(e)
          children.props.onClick?.(e)
        },
      },
    )
  }

  return <div {...props} ref={ref} onClick={(e: MouseEvent<HTMLDivElement>) => {
    setOpen?.(false)
    props.onClick?.(e)
  }}>
    {children}
  </div>
})
