import React from 'react';
import { Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightAddon,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react';

const InputField = ({
  placeHolder = '',
  fieldName,
  label,
  validateFn,
  readOnly,
  addOns = { left: null, right: null },
  isRequired = false,
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

          {/* INPUT COMPONENT WITH LEFT AND RIGHT ADDONS  */}
          <InputGroup>
            {addOns.left && <InputLeftAddon>{addOns.left}</InputLeftAddon>}
            <Input {...field} placeholder={placeHolder} />
            {addOns.right && <InputRightAddon>{addOns.right}</InputRightAddon>}
          </InputGroup>
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputField;
