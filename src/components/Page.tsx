import React, { FC, forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  title?: string;
}

const Page = forwardRef<PageProps, any>(
  ({ children, title = '', ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Helmet>
          <title>Juno Chatbot - {title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);

export default Page;
