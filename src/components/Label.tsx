import { alpha, styled } from '@mui/material/styles';
import { ReactElement, ReactNode } from 'react';

interface RootLabelStyleProps {
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  variant: 'filled' | 'outlined' | 'ghost';
}

const RootLabelStyle = styled('span', {
  shouldForwardProp: props => props !== 'color' && props !== 'variant',
  name: 'RootLabelStyle',
  slot: 'root',
  overridesResolver: (props, styles) => [styles.root],
})<RootLabelStyleProps>(({ theme, color, variant }) => {
  const styleFilled = (rootColor: string) => ({
    color: theme.palette[rootColor].contrastText,
    backgroundColor: theme.palette[rootColor].main,
  });

  const styleOutlined = (rootColor: string) => ({
    color: theme.palette[rootColor].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[rootColor].main}`,
  });

  const styleGhost = (rootColor: string) => ({
    color: theme.palette[rootColor].dark,
    backgroundColor: alpha(theme.palette[rootColor].main, 0.16),
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'default'
      ? {
          ...(variant === 'filled' && { ...styleFilled(color) }),
          ...(variant === 'outlined' && { ...styleOutlined(color) }),
          ...(variant === 'ghost' && { ...styleGhost(color) }),
        }
      : {
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[500_32]}`,
          }),
          ...(variant === 'ghost' && {
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.grey[500_16],
          }),
        }),
  };
});

interface LabelProps {
  children: ReactNode;
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  variant: 'filled' | 'outlined' | 'ghost';
}

const Label = (props: LabelProps): ReactElement => {
  const { color, variant, children, ...other } = props;

  return (
    <RootLabelStyle color={color} variant={variant} {...other}>
      {children}
    </RootLabelStyle>
  );
};

export default Label;
