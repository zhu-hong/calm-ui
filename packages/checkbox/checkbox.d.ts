import type { CheckboxProps } from '@radix-ui/react-checkbox'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

declare const Checkbox: ForwardRefExoticComponent<Omit<CheckboxProps, 'onCheckedChange'> & { onCheckedChange?: (checked: boolean) => void; size?: number } & RefAttributes<HTMLButtonElement>>

export {
  Checkbox,
}
