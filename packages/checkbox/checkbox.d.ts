import type { CheckboxProps } from '@radix-ui/react-checkbox'
import type { FC, RefAttributes } from 'react'

declare const Checkbox: FC<
  Omit<CheckboxProps, 'onCheckedChange'>
  & { onCheckedChange?: (checked: boolean) => void; size?: number }
  & RefAttributes<HTMLButtonElement>
>

export {
  Checkbox,
}
