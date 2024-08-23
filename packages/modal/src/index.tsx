import './style.css'

import { ComponentProps, FC } from 'react'
import {
  Modal,
  ModalClose,
  ModalHeading,
  ModalDescription,
  ModalAutoFocus,
} from './modal'
import clsx from 'clsx'


export const Dialog: FC<Omit<ComponentProps<typeof Modal>, 'contentTransition'>> = (props) => {
  return <Modal {...props} classes={{
    ...props.classes,
    wrapper: clsx('cm-dialog', props.classes?.wrapper),
    content: clsx('cm-dialog-content', props.classes?.content),
  }} contentTransition={{
    initial: {
      opacity: 0,
      transform: 'translateY(0.25rem)',
    },
    close: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
  }} />
}

export const Drawer: FC<Omit<ComponentProps<typeof Modal>, 'contentTransition'>> = (props) => {
  return <Modal {...props} classes={{
    ...props.classes,
    wrapper: clsx('cm-drawer', props.classes?.wrapper),
    content: clsx('cm-drawer-content', props.classes?.content),
  }} contentTransition={{
    initial: {
      opacity: 0,
      transform: 'translateX(100%)',
    },
    close: {
      opacity: 0,
      transform: 'translateX(100%)',
    },
  }} />
}

export const DialogClose = ModalClose
export const DialogHeading = ModalHeading
export const DialogDescription = ModalDescription
export const DialogAutoFocus = ModalAutoFocus

export const DrawerClose = ModalClose
export const DrawerHeading = ModalHeading
export const DrawerDescription = ModalDescription
export const DrawerAutoFocus = ModalAutoFocus
