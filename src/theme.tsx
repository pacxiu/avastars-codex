export const pxToRem = (px: number) => `${px / 16}rem`;

export const TRANSITIONS = {
  standard: '0.3s ease-in-out',
};

// //////////////////// 0   1   2   3  4    5   6   7   8  9   10
const baseFontSizes = [10, 12, 14, 16, 20, 22, 24, 32, 37, 40, 55];
const baseSpace = [0, 4, 8, 16, 32, 64, 128, 256, 512];
const baseSizes = [0, 4, 8, 16, 32, 64, 128, 256, 512];

const theme = {
  useBorderBox: true,
  useBodyStyles: true,
  breakpoints: ['48em', '64em', '80em'],
  fontSizes: baseFontSizes.map((size) => pxToRem(size)),
  space: baseSpace.map((size) => pxToRem(size)),
  sizes: baseSizes.map((size) => pxToRem(size)),
  colors: {
    text: '#121212',
    textAlt: '#666666',
    background: '#FFFFFF',
    backgroundAlt: '#F4F2F2',
    backgroundEmphasis: '#F8F8F8',
    primary: '#FFC629',
    primaryAlt: '#D5A932',
  },
  fonts: {
    body: 'Nunito Sans, sans-serif',
    heading: 'Nunito Sans, sans-serif',
    menu: 'Josefin Sans, sans-serif',
    abril: 'Abril Fatface, sans-serif',
  },
  fontWeights: {
    body: 400,
    bold: 700,
    extraBold: 800,
    heading: 800,
  },
  lineHeights: {
    body: 1.35,
    heading: 1.57,
    // tight: 1.05,
    // loose: 1.35,
    // to properly height buttons
    // buttons: 2,
    // secondaryButton: 0.8,
    // smallButton: 1.9,
  },
  radii: {
    big: pxToRem(42),
  },
  shadows: {
    primary: '0px 0px 6px #00000029',
    faqSection: '0px 0px 3px #5858582B',
  },
  buttons: {
    primary: {
      fontFamily: 'body',
      cursor: 'pointer',
      color: 'text',
      borderRadius: 0,
      fontSize: 5,
      fontWeight: 'extraBold',
      p: '0.82em',
      boxShadow: 'primary',
      '&:focus': {
        outline: '1px solid',
        outlineColor: 'text',
      },
    },
    textual: {
      variant: 'buttons.primary',
      p: 0,
      bg: 'transparent',
      fontWeight: 'bold',
      boxShadow: 'none',
      textDecoration: 'underline',
    },
  },
  text: {
    body: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
      fontSize: 3,
    },
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontSize: 8,
    },
    mediumHeading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontSize: 7,
    },
  },
  zIndices: {
    menu: 4,
  },
  layout: {
    container: {
      px: 3,
      maxWidth: pxToRem(1360),
    },
  },
  styles: {
    root: {
      variant: 'text.body',
    },
  },
};

export default theme;
