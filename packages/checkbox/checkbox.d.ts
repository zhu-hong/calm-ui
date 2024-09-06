import type { CheckboxProps } from '@radix-ui/react-checkbox'
import type { ButtonHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react'

declare const Checkbox: ForwardRefExoticComponent<Omit<CheckboxProps, 'onCheckedChange'> & { onCheckedChange?: (checked: boolean) => void; } & RefAttributes<HTMLButtonElement>>

export {
  Checkbox,
}
