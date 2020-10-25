import ReactSelect, { OptionTypeBase } from 'react-select';
import { Props } from 'react-select/src/Select';
import { Box, Flex } from 'theme-ui';

const Select = (props: Props<OptionTypeBase>) => (
  <ReactSelect
    {...props}
    components={{
      SingleValue: ({ children }) => (
        <Box sx={{ color: 'primary', fontWeight: 'bold' }}>{children}</Box>
      ),
      Control: ({ innerProps, children }) => (
        <Flex {...innerProps} variant="forms.select">
          {children}
        </Flex>
      ),
    }}
  />
);

export default Select;
