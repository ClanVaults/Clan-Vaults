import { ReactNode } from "react";

const Subtitle = (props: { children: ReactNode }) => {
  const { children } = props;
  return <h2 className="homepage__subtitle">{children}</h2>;
};

export default Subtitle;
