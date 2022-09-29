import React from 'react';
import { Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

const InputField = ({
  placeHolder = '',
  fieldName,
  label,
  validateFn,
  readOnly,
}) => {
  return (
    <Field name={fieldName} validate={validateFn}>
      {({ field, form }) => (
        <FormControl
          isReadOnly={readOnly}
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <FormLabel>{label}</FormLabel>
          <Input {...field} placeholder={placeHolder} />
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputField;
