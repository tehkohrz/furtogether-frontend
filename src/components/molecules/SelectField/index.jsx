import React from 'react';
import { Field } from 'formik';
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

const SelectField = ({
  options,
  placeHolder,
  fieldName,
  readOnly,
  validateFn,
  label,
  isRequired,
}) => {
  return (
    <Field name={fieldName} validate={validateFn}>
      {({ field, form }) => (
        <FormControl
          isReadOnly={readOnly}
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
          isRequired={isRequired}
        >
          <FormLabel>{label}</FormLabel>
          <Select {...field} placeholder={placeHolder} isReadOnly={readOnly}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default SelectField;
