import { Box, BoxProps } from '@material-ui/core';
import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface PagePros extends BoxProps {
  children: ReactNode;
  title?: string;
}

const Page = forwardRef(({ children, title, ...other }: PagePros, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
));

Page.defaultProps = {
  title: 'Armería',
};

export default Page;
