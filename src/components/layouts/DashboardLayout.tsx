import { Typography } from '@material-ui/core';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const DashboardLayout = (): React.ReactElement => {
  return (
    <>
      <Typography>Dashboard</Typography>
      <Route path="/" render={() => <Redirect to="/dashboard" />} />
    </>
  );
};

export default DashboardLayout;
