import { CssBaseline } from '@material-ui/core';
import {
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Components } from '@material-ui/core/styles/components';
import { ReactElement, ReactNode, useMemo } from 'react';

import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import shape from './shape';
import typography from './typography';

declare module '@material-ui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

interface ThemeConfigPros {
  children: ReactNode;
}

export default function ThemeConfig({
  children,
}: ThemeConfigPros): ReactElement {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    [],
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme) as Components;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
