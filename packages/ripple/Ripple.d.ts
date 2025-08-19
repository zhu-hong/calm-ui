import { RefAttributes } from "react";

interface OverridableTypeMap {
  props: {};
  defaultComponent: keyof JSX.IntrinsicElements;
}
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
type OverrideProps<
  M extends OverridableTypeMap,
  C extends keyof JSX.IntrinsicElements,
> = (
  & M['props']
  & DistributiveOmit<JSX.LibraryManagedAttributes<C, JSX.IntrinsicElements[C]>, keyof M['props']>
);
interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends keyof JSX.IntrinsicElements = 'button'>(
    props: {
      as?: C;
    } & OverrideProps<M, C>,
  ): JSX.Element | null;
}

type RippleProps = {
  disableRipple?: boolean;
  focusRipple?: boolean;
  centerRipple?: boolean;
  style?: React.CSSProperties;
  onFocusVisible?: React.FocusEventHandler;
}

declare const Ripple: OverridableComponent<{
  props: RippleProps;
  defaultComponent: 'button';
} & RefAttributes<HTMLButtonElement>>

export {
  Ripple,
  RippleProps,
}