import React from 'react';
import { InputField, SelectField } from '../../molecules';

// Genertate the form fields
export function generateFields(array, formReadOnly) {
  const fields = array.map((x, index) => {
    if (x.type == 'input') {
      return (
        <InputField
          readOnly={formReadOnly}
          key={index}
          placeHolder={x.placeHolder}
          validateFn={x.validateFn}
          fieldName={x.fieldName}
          label={x.label}
          isRequired={x.isRequired}
        />
      );
    }
    if (x.type == 'select') {
      return (
        <SelectField
          readOnly={formReadOnly}
          key={index}
          fieldName={x.fieldName}
          options={x.options}
          label={x.label}
          placeHolder={x.placeHolder}
          isRequired={x.isRequired}
        />
      );
    }
  });
  return fields;
}
// Fields that are to be in the form
export const formArray = [
  {
    label: 'Name',
    fieldName: 'name',
    placeHolder: 'Name',
    validateFn: null,
    type: 'input',
    isRequired: true,
  },
  {
    label: 'Gender',
    fieldName: 'gender',
    placeHolder: 'Gender',
    validateFn: null,
    type: 'select',
    options: [
      { value: 'dog', label: 'Dog' },
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
    isRequired: true,
  },
  {
    label: 'Email',
    fieldName: 'email',
    placeHolder: 'Email',
    validateFn: null,
    type: 'input',
    isRequired: true,
  },
  {
    label: 'Postal',
    fieldName: 'postal',
    placeHolder: 'Postal',
    validateFn: null,
    type: 'input',
  },
  {
    label: 'Address',
    fieldName: 'address',
    placeHolder: 'Address',
    validateFn: null,
    type: 'input',
  },
];
