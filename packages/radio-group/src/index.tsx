import { Root, Item, Indicator } from '@radix-ui/react-radio-group'
import { forwardRef } from 'react'

export const RadioGroup: typeof Root = forwardRef(({ ...props }, ref) => {
  return <Root {...props} ref={ref} />
})

export const Radio: typeof Item = forwardRef(({ ...props }, ref) => {
  return <Item {...props} ref={ref}>
    <Indicator asChild forceMount></Indicator>
  </Item>
})
