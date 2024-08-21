import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
  useTransitionStyles,
  useId,
  useTransitionStatus,
} from '@floating-ui/react'
import {
  useState,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  forwardRef,
  HTMLProps,
  isValidElement,
  cloneElement,
  useLayoutEffect,
  ButtonHTMLAttributes,
  useRef,
  useEffect,
  FC,
  MouseEvent,
} from 'react'
import clsx from 'clsx'
import { IconButton } from '@calm-ui/button'

interface ModalOptions {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  afterClose?: () => void
  overlay?: boolean
  overlayClosable?: boolean
  keepMount?: boolean
  classes?: {
    overlay?: string
    wrapper?: string
    content?: string
  }
  contentTransition?: Parameters<typeof useTransitionStyles>['1']
  zIndex?: number
}

type ContextType = (ReturnType<typeof useModal>) | null

const useModal = ({
  open,
  onOpenChange,
  afterClose,
  overlay = true,
  overlayClosable = true,
  keepMount,
  classes,
  contentTransition: CT,
  zIndex,
}: ModalOptions) => {
  const [labelId, setLabelId] = useState<string | undefined>()
  const [descriptionId, setDescriptionId] = useState<string | undefined>()

  const initialFocus = useRef<HTMLElement>(null)

  const data = useFloating({
    open,
    onOpenChange,
  })

  const { context } = data

  const dismiss = useDismiss(context, {
    outsidePress: !overlay ? false : overlayClosable,
  })
  const role = useRole(context, {
    role: 'dialog',
  })

  const openTransitionDuration = 270
  const closeTransitionDuration = 170
  const { status: transitionStatus, isMounted } = useTransitionStatus(context, {
    duration: {
      open: openTransitionDuration,
      close: closeTransitionDuration,
    },
  })
  const overlayTransition = useTransitionStyles(context, {
    duration: {
      open: openTransitionDuration,
      close: closeTransitionDuration,
    },
  })
  const contentTransition = useTransitionStyles(context, {
    ...CT,
    duration: {
      open: openTransitionDuration,
      close: closeTransitionDuration,
    },
  })

  const interactions = useInteractions([dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen: onOpenChange,
      ...interactions,
      ...data,
      labelId,
      setLabelId,
      descriptionId,
      setDescriptionId,
      afterClose,
      initialFocus,
      overlay,
      keepMount,
      classes,
      isMounted,
      transitionStatus,
      overlayTransition,
      contentTransition,
      zIndex,
    }),
    [
      open,
      onOpenChange,
      interactions,
      data,
      labelId,
      descriptionId,
      afterClose,
      initialFocus,
      overlay,
      keepMount,
      classes,
      isMounted,
      transitionStatus,
      overlayTransition,
      contentTransition,
      zIndex,
    ],
  )
}

const ModalContext = createContext<ContextType>(null)

const useModalContext = () => {
  const context = useContext(ModalContext)

  if(context == null) {
    throw new Error('Modal components must be wrapped in <Modal />')
  }

  return context
}

export const Modal = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & ModalOptions
>(({ open, onOpenChange, afterClose, overlay, overlayClosable, keepMount, classes, contentTransition, zIndex, ...props }, ref) => {
  const modal = useModal({
    open,
    onOpenChange,
    afterClose,
    overlay,
    overlayClosable,
    keepMount,
    classes,
    contentTransition,
    zIndex,
  })

  return <ModalContext.Provider value={modal}>
    <ModalContent ref={ref} {...props} />
  </ModalContext.Provider>
})

const ModalContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>((props, propRef) => {
  const {
    context: floatingContext,
    afterClose,
    initialFocus,
    keepMount,
    overlay,
    classes,
    transitionStatus,
    isMounted,
    overlayTransition,
    contentTransition,
    zIndex = 100,
    ...context
  } = useModalContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])
  
  const prevTransitionStatus = useRef<typeof transitionStatus>(transitionStatus)
  useEffect(() => {
    if(prevTransitionStatus.current === 'close' && transitionStatus === 'unmounted') {
      setTimeout(() => afterClose?.(), 0)
    }
    prevTransitionStatus.current = transitionStatus
  }, [transitionStatus])

  return (keepMount || isMounted) && <FloatingPortal>
    <FloatingOverlay
      className={clsx('cm-modal-overlay', classes?.overlay)}
      lockScroll={isMounted}
      style={{
        ...overlayTransition.styles,
        // @ts-ignore
        display: (!overlay||!isMounted) ? 'none' : overlayTransition.styles.display,
        zIndex,
      }}
    />
    <div
      className={classes?.wrapper}
      style={{
        // @ts-ignore
        display: isMounted ? undefined : 'none',
        zIndex: zIndex + 1,
        pointerEvents: overlay ? undefined : 'none',
      }}
    >
      <FloatingFocusManager
        context={floatingContext}
        initialFocus={initialFocus.current?initialFocus:0}
        disabled={!isMounted}
      >
        <div
          {...context.getFloatingProps(props)}
          ref={ref}
          aria-labelledby={context.labelId}
          aria-describedby={context.descriptionId}
          style={{
            ...props.style,
            ...contentTransition.styles,
            pointerEvents:overlay?undefined: 'auto',
          }}
          className={clsx(classes?.content, props.className)}
        />
      </FloatingFocusManager>
    </div>
  </FloatingPortal>
})

export const ModalHeading = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement>
>(({ children, ...props }, ref) => {
  const { setLabelId } = useModalContext()
  const id = useId()

  useLayoutEffect(() => {
    setLabelId(id)
    return () => setLabelId(undefined)
  }, [id, setLabelId])

  return <h2 {...props} ref={ref} id={id}>
    {children}
  </h2>
})

export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  HTMLProps<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { setDescriptionId } = useModalContext()
  const id = useId()

  useLayoutEffect(() => {
    setDescriptionId(id)
    return () => setDescriptionId(undefined)
  }, [id, setDescriptionId])

  return  <p {...props} ref={ref} id={id}>
    {children}
  </p>
})

export const ModalClose = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ asChild, children, ...props }, propRef) => {
  const { setOpen } = useModalContext()
  const childrenRef = (children as any)?.ref
  const ref = useMergeRefs([propRef, childrenRef])

  if(asChild && isValidElement(children)) {
    return cloneElement(
      children,
      {
        ref,
        ...props,
        ...children.props,
        onClick: (e: MouseEvent<HTMLButtonElement>) => {
          setOpen?.(false)
          props.onClick?.(e)
          children.props.onClick?.(e)
        },
      },
    )
  }

  return <IconButton {...props} ref={ref} onClick={(e: MouseEvent<HTMLButtonElement>) => {
    setOpen?.(false)
    props.onClick?.(e)
  }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
    </svg>
  </IconButton>
})

export const ModalAutoFocus: FC<{ children: ReactNode }> = (({ children }) => {
  const { initialFocus } = useModalContext()

  const ref = useMergeRefs([initialFocus, (children as any)?.ref])

  if(isValidElement(children)) {
    return cloneElement(
      children,
      {
        ref,
        ...children.props,
      }
    )
  }

  return children
})
