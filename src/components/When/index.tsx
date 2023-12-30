import { ReactElement, ReactNode } from "react";

type WhenProps = {
  children: ReactNode | (() => void);
  value: any;
};

export function When({ children, value }: Readonly<WhenProps>) {
  if (value) {
    return (typeof children === "function" ? children() : children) as ReactElement;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
