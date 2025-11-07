import { Root, Item, RadioGroupItemProps } from '@radix-ui/react-radio-group'
import { FC, RefAttributes } from 'react'

declare const RadioGroup: typeof Root
declare const Radio: FC<RadioGroupItemProps & RefAttributes<HTMLButtonElement> & { size?: number }>

export {
  RadioGroup,
  Radio,
}
