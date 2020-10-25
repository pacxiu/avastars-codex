import { Range } from 'rc-slider';
import { RangeProps } from 'rc-slider/lib/Range';
import themeApp from 'theme';

import 'rc-slider/assets/index.css';
import { useThemeUI } from 'theme-ui';
import { CSSProperties } from 'react';

const customStyles = (
  theme: typeof themeApp
): {
  handleStyle: CSSProperties;
  railStyle: CSSProperties;
  trackStyle: CSSProperties;
} => ({
  handleStyle: {
    border: 'none',
    backgroundColor: theme.colors?.primary,
  },
  railStyle: {
    backgroundColor: theme.colors.text,
  },
  trackStyle: {
    backgroundColor: theme.colors.primary,
  },
});

const RangeSlider = (props: RangeProps) => {
  const { theme } = useThemeUI();
  // @ts-ignore
  const { handleStyle, railStyle, trackStyle } = customStyles(theme);

  return (
    <Range
      {...{
        ...props,
        handleStyle: [handleStyle, handleStyle],
        railStyle,
        trackStyle: [trackStyle, trackStyle],
      }}
    />
  );
};

export default RangeSlider;
