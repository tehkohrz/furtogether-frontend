import React from 'react';
import { Field } from 'formik';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  HStack,
} from '@chakra-ui/react';

export default function TimeInput({
  placeHolder = '',
  fieldName,
  label,
  validateFn,
  readOnly,
  isRequired = false,
}) {
  const time = (
    <Field name={fieldName} validate={validateFn}>
      {({ field, form }) => (
        <FormControl
          isReadOnly={readOnly}
          isRequired={isRequired}
          isInvalid={form.errors[fieldName] && form.touched[fieldName]}
        >
          <FormLabel>{label}</FormLabel>
          <Input type='time' name={fieldName} {...field}></Input>
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
  return time;
}
