import { ReactElement } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink, Route } from 'react-router-dom';

const breadcrumbNameMap: { [key: string]: string } = {
  '/dashboard': 'Panel de control',
  '/dashboard/people': 'Personas',
  '/dashboard/people/register': 'Registrar',
  '/dashboard/squadrons': 'Escuadrillas',
  '/dashboard/squadrons/register': 'Registrar',
  '/dashboard/squads': 'Escuadras',
  '/dashboard/squads/register': 'Registrar',
  '/dashboard/ranks': 'Rangos',
  '/dashboard/ranks/register': 'Registrar',
  '/dashboard/degrees': 'Grados',
  '/dashboard/degrees/register': 'Registrar',
};

const Breadcrumb = (): ReactElement => {
  return (
    <>
      <Route>
        {({ location }) => {
          const pathNames = location.pathname.split('/').filter(x => x);

          return (
            <Breadcrumbs color="inherit" maxItems={4} aria-label="breadcrumb">
              {pathNames.map((value, index) => {
                const last = index === pathNames.length - 1;
                const to = `/${pathNames.slice(0, index + 1).join('/')}`;

                return last ? (
                  <Typography key={to} color="inherit">
                    {breadcrumbNameMap[to]}
                  </Typography>
                ) : (
                  <Link key={to} component={RouterLink} color="inherit" to={to}>
                    {breadcrumbNameMap[to]}
                  </Link>
                );
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    </>
  );
};

export default Breadcrumb;
