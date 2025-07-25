import { forwardRef, useRef, useCallback, useState, useEffect, useImperativeHandle } from 'react'
import { styled, keyframes } from 'goober'
import { RippleAnimate } from './RippleAnimate.jsx'

const DURATION = 550
const DELAY_RIPPLE = 80

const rippleClasses = {
  'root': 'ripple-root',
  'ripple': 'ripple-wrap',
  'rippleVisible': 'ripple-wrap-visible',
  'ripplePulsate': 'ripple-wrap-pulsate',
  'child': 'ripple-child',
  'childLeaving': 'ripple-child-leaving',
  'childPulsate': 'ripple-child-pulsate',
}

const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`

const exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`

const RippleRoot = styled('span', forwardRef)`
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const RippleAnimated = styled(RippleAnimate, forwardRef)`
  opacity: 0;
  position: absolute;
  &.${rippleClasses.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation: ${DURATION}ms ${enterKeyframe} cubic-bezier(0.4, 0, 0.2, 1);
  }
  &.${rippleClasses.ripplePulsate} {
    animation-duration: 200ms;
  }

  & .${rippleClasses.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }
  & .${rippleClasses.childLeaving} {
    opacity: 0;
    animation: ${DURATION}ms ${exitKeyframe} cubic-bezier(0.4, 0, 0.2, 1);
  }

  & .${rippleClasses.childPulsate} {
    animation: 2500ms ${pulsateKeyframe} cubic-bezier(0.4, 0, 0.2, 1) infinite 200ms;
  }
`

export const TouchRipple = ({ center: centerProp = false, ref }) => {
  const [ripples, setRipples] = useState([])
  const nextKey = useRef(0)

  const ignoringMouseDown = useRef(false)
  const startTimer = useRef(null)

  const needRemoveRippleKeys = useRef([])
  const rippleToggles = useRef({})

  useEffect(() => {
    return () => {
      clearTimeout(startTimer.current)
      startTimer.current = null
    }
  }, [])

  const startTimerCommit = useRef(null)
  const container = useRef(null)

  const startCommit = useCallback(({ rippleX, rippleY, rippleSize, pulsate }) => {
    nextKey.current += 1
    needRemoveRippleKeys.current = [...new Set([...needRemoveRippleKeys.current, nextKey.current])]

    setRipples((oldRipples) => {
      return [
        ...oldRipples,
        <RippleAnimated
          key={nextKey.current}
          flag={nextKey.current}
          toggles={rippleToggles.current}
          classes={{
            ripple: rippleClasses.ripple,
            rippleVisible: rippleClasses.rippleVisible,
            child: rippleClasses.child,
            childLeaving: rippleClasses.childLeaving,
            ripplePulsate: rippleClasses.ripplePulsate,
            childPulsate: rippleClasses.childPulsate,
          }}
          timeout={DURATION}
          pulsate={pulsate}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize}
          onUnmounted={onUnmounted}
        />
      ]
    })
  }, [])

  const onUnmounted = useCallback((key) => {
    delete rippleToggles.current[key]
    setRipples((ripples) => ripples.filter((r) => +r.key !== +key))
  }, [])

  const start = useCallback((event = {}, options = {}) => {
    const {
      pulsate = false,
      center = centerProp || options.pulsate,
    } = options

    if(event.type === 'mousedown' && ignoringMouseDown.current) {
      ignoringMouseDown.current = false
      return
    }

    if(event.type === 'touchstart') {
      ignoringMouseDown.current = true
    }

    const element = container.current
    const rect = element.getBoundingClientRect()

    let rippleX = 0
    let rippleY = 0
    let rippleSize = 0

    if(center || (event.clientX === 0 && event.clientY === 0) || (!event.clientX && !event.touches)) {
      rippleX = Math.round(rect.width / 2)
      rippleY = Math.round(rect.height / 2)
    } else {
      const { clientX, clientY } = (event.touches && event.touches.length > 0) ? event.touches[0] : event
      rippleX = Math.round(clientX - rect.left)
      rippleY = Math.round(clientY - rect.top)
    }

    if(center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3)

      if(rippleSize % 2 === 0) {
        rippleSize -= 1
      }
    } else {
      const sizeX = Math.max(Math.abs(element.clientWidth - rippleX), rippleX) * 2 + 2
      const sizeY = Math.max(Math.abs(element.clientHeight - rippleY), rippleY) * 2 + 2
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2)
    }

    if(event.touches) {
      if(startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({ rippleX, rippleY, rippleSize, pulsate })
        }
        startTimer.current = setTimeout(() => {
          if(startTimerCommit.current) {
            startTimerCommit.current()
            startTimerCommit.current = null
          }
        }, DELAY_RIPPLE)
      }
    } else {
      startCommit({ rippleX, rippleY, rippleSize, pulsate })
    }
  }, [centerProp, startCommit, startTimer])

  const pulsate = useCallback(() => {
    start({}, { pulsate: true })
  }, [start])

  const stop = useCallback((event = {}, cb) => {
    clearTimeout(startTimer.current)
    startTimer.current = null

    if(event.type === 'touchend' && startTimerCommit.current) {
      startTimerCommit.current()
      startTimerCommit.current = null
      startTimer.current = setTimeout(() => {
        stop(event, cb)
      }, 0)
      return
    }

    startTimerCommit.current = null

    const key = needRemoveRippleKeys.current.pop()
    if(key !== undefined) {
      const toggle = rippleToggles.current[key]
      if(typeof toggle === 'function') {
        toggle()
      } else {
        onUnmounted(key)
      }
    }
    cb?.()
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      start,
      stop,
      pulsate,
    }),
    [start, stop, pulsate],
  )

  return <RippleRoot
    className={rippleClasses.root}
    ref={container}
  >
    {ripples}
  </RippleRoot>
}
