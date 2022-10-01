import React from 'react';
import { Formik, Form } from 'formik';
import InputField from '../../molecules/InputField';
import SelectField from '../../molecules/SelectField';

// Fields that are to be in the form
const formArray = [
  {
    label: 'Name',
    fieldName: 'name',
    placeHolder: '',
    validateFn: null,
    type: 'input',
  },
  {
    label: 'Gender',
    fieldName: 'gender',
    placeHolder: '',
    validateFn: null,
    type: 'select',
    options: [
      { value: 'D', label: 'Dog' },
      { value: 'M', label: 'Male' },
      { value: 'F', label: 'Female' },
    ],
  },
  {
    label: 'Email',
    fieldName: 'email',
    placeHolder: '',
    validateFn: null,
    type: 'input',
  },
  {
    label: 'Postal',
    fieldName: 'postal',
    placeHolder: '',
    validateFn: null,
    type: 'input',
  },
  {
    label: 'Address',
    fieldName: 'address',
    placeHolder: '',
    validateFn: null,
    type: 'input',
  },
];

export default function HumanForm({ userProfile, formReadOnly }) {
  // Initalise the initial values for formik
  const initialValues = {};
  formArray.forEach(
    (x) => (initialValues[x.fieldName] = userProfile[x.fieldName])
  );
  // Genertate the form fields
  const FormFields = formArray.map((x) => {
    if (x.type == 'input') {
      return (
        <InputField
          readOnly={formReadOnly}
          key={x.label}
          placeHolder={x.placeHolder}
          validateFn={x.validateFn}
          fieldName={x.fieldName}
          label={x.label}
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
        />
      );
    }
  });

  return (
    <Formik initialValues={initialValues} onSubmit={null}>
      <Form>{FormFields}</Form>
    </Formik>
  );
}
