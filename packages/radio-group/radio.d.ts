import { Root, Item, RadioGroupItemProps } from '@radix-ui/react-radio-group'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

declare const RadioGroup: typeof Root
declare const Radio: ForwardRefExoticComponent<RadioGroupItemProps & RefAttributes<HTMLButtonElement> & { size?: number }>

export {
  RadioGroup,
  Radio,
}
