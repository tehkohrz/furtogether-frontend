import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  // COLORS GO HERE
  colors: {
    // Class or naming to call the color bg=brand.100
    brand: {
      100: '#FFF',
    },
  },
  components: {
    Input: {
      defaultProps: {
        size: 'lg',
      },
    },
  },
});

export default theme;
