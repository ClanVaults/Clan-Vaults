import { ReactNode } from "react";

const Title = (props: { children: ReactNode }) => {
  const { children } = props;
  return <h2 className="homepage__title">{children}</h2>;
};

export default Title;
