import { Box, TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ name, value, label, readOnly = false }) => {
  return (
    <>
      <Box display='flex' flexDirection={'row'} ml={2} mt={3}>
        <TextField
          id={name}
          label={label}
          variant='outlined'
          inputProps={{ readOnly }}
          defaultValue={value}
        />
      </Box>
    </>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

export default InputField;
