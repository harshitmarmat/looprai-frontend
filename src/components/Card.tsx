import React, { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  styles?: string;
}

const Card: FC<CardProps> = ({ children, styles = '' }) => {
  return (
    <div className={`bg-primary_la rounded-lg p-4 ${styles}`}>
      {children}
    </div>
  );
};

export default Card;
