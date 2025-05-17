type ConditionnalWrapperProps = {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
};

const ConditionnalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionnalWrapperProps) => {
  return condition ? wrapper(children) : children;
};

export default ConditionnalWrapper;
