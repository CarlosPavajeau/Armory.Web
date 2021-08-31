import { CustomShadows } from './shadows';

declare module '@material-ui/core/styles/createPalette' {
  export interface TypeBackground {
    neutral?: string;
  }
}

declare module '@material-ui/core/styles/createTheme' {
  export interface DeprecatedThemeOptions {
    customShadows?: CustomShadows;
  }
}

declare module '@material-ui/system/createTheme/shape' {
  export interface Shape {
    borderRadiusSm: number | string;
    borderRadiusMd: number | string;
  }
}

declare module '@material-ui/core' {
  export interface Color {
    0: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }

  export interface Theme {
    customShadows: CustomShadows;
  }
}

declare module '@material-ui/core/styles' {
  export interface PaletteColor {
    darker?: string;
    lighter?: string;
  }

  export interface SimplePaletteColorOptions {
    darker?: string;
    lighter?: string;
  }
}
