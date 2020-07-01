import React from 'react';


export interface TabItemProps {
  index?: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { children } = props;

  return <div className='ae-tab-panel'>{children}</div>;
};

export default TabItem;
