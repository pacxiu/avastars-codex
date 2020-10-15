export const pxToRem = (px: number) => `${px / 16}rem`;

export const TRANSITIONS = {
  standard: '0.3s ease-in-out',
};

export const CUSTOM_SIZES = {
  menuHeight: pxToRem(80),
  filtersWidth: pxToRem(280),
};

// //////////////////// 0   1   2   3   4   5   6   7   8  9   10
const baseFontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 32, 37, 40, 55];
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
    text: 'rgb(69, 67, 74)',
    background: 'rgb(247, 248, 252)',
    backgroundAlt: 'rgb(247, 248, 252)',
    primary: 'rgb(91, 25, 229)',
    primaryAlt: 'rgb(242, 239, 255)',
    primaryEmphasis: 'rgb(223, 217, 250)',
    rarity: {
      common: 'rgb(0, 143, 251)',
      uncommon: 'rgb(0, 227, 150)',
      rare: 'rgb(254, 176, 25)',
      epic: 'rgb(119, 93, 208)',
      legendary: 'rgb(255, 69, 96)',
    },
  },
  fonts: {
    body: 'Inconsolata, monospace',
    heading: 'Inconsolata, monospace',
  },
  borders: {
    normal: '2px solid',
  },
  fontWeights: {
    body: 500,
    heading: 600,
    semiBold: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.35,
    // heading: 1.57,
    // tight: 1.05,
    // loose: 1.35,
    // to properly height buttons
    // buttons: 2,
    // secondaryButton: 0.8,
    // smallButton: 1.9,
  },
  // radii: {
  //   big: pxToRem(42),
  // },
  // shadows: {
  //   primary: '0px 0px 6px #00000029',
  //   faqSection: '0px 0px 3px #5858582B',
  // },
  buttons: {
    primary: {
      fontFamily: 'body',
      cursor: 'pointer',
      fontSize: 'body',
      fontWeight: 'bold',
      borderRadius: 0,
      padding: '0.5em 1.4em',
      transition: TRANSITIONS.standard,
      border: 'normal',
      borderColor: 'primary',
      '&:focus': {
        outline: '1px solid',
        outlineColor: 'primaryAlt',
      },
      '&:hover': {
        bg: 'background',
        color: 'primary',
      },
    },
  },
  //   textual: {
  //     variant: 'buttons.primary',
  //     p: 0,
  //     bg: 'transparent',
  //     fontWeight: 'bold',
  //     boxShadow: 'none',
  //     textDecoration: 'underline',
  //   },
  // },
  text: {
    body: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
      fontSize: 4,
    },
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontSize: 9,
      color: 'primary',
    },
  },
  //   // mediumHeading: {
  //   //   fontFamily: 'heading',
  //   //   lineHeight: 'heading',
  //   //   fontSize: 7,
  //   // },
  // },
  forms: {
    label: {
      cursor: 'pointer',
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
  images: {
    avastarCard: {
      display: 'block',
    },
  },
  styles: {
    root: {
      variant: 'text.body',
    },
    a: {
      color: 'primary',
    },
  },
};

export default theme;
