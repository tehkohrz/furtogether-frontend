import React from 'react';
import InputField from '../../molecules/InputField';
import SelectField from '../../molecules/SelectField';
// Fields that are to be in the form
export const formArray = [
  {
    label: 'Name',
    fieldName: 'dog',
    placeHolder: 'Dog Name',
    validateFn: null,
    type: 'input',
    isRequired: true,
  },
  {
    label: 'Gender',
    fieldName: 'gender',
    placeHolder: 'Select Gender',
    validateFn: null,
    type: 'select',
    options: [
      { value: 'M', label: 'Male' },
      { value: 'F', label: 'Female' },
    ],
    isRequired: true,
  },
  {
    label: 'Breed',
    fieldName: 'breed',
    placeHolder: 'Breed',
    validateFn: null,
    type: 'input',
    isRequired: true,
  },
  {
    label: 'Age',
    fieldName: 'age',
    placeHolder: 'Age',
    validateFn: null,
    type: 'input',
    addOns: {
      right: 'Years',
    },
  },
  {
    label: 'Weight',
    fieldName: 'weight',
    placeHolder: 'Weight',
    validateFn: null,
    type: 'input',
    addOns: {
      right: 'KG',
    },
  },
];

export function generateEmptyForm() {
  const emptyForm = {};
  formArray.forEach((x) => {
    emptyForm[x.fieldName] = '';
  });
  return emptyForm;
}

export function generateFields(array, formReadOnly) {
  const fields = array.map((x) => {
    if (x.type == 'input') {
      return (
        <InputField
          readOnly={formReadOnly}
          key={x.label}
          placeHolder={x.placeHolder}
          validateFn={x.validateFn}
          fieldName={x.fieldName}
          label={x.label}
          addOns={x.addOns ? x.addOns : {}}
          isRequired={x.isRequired}
        />
      );
    }
    if (x.type == 'select') {
      return (
        <SelectField
          readOnly={formReadOnly}
          key={x.label}
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
