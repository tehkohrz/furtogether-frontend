import React from 'react';
import {
  InputField,
  SelectField,
  CheckField,
  TimeInput,
} from '../../molecules';

// Genertate the form fields
export function generateRoutineFields(array, formReadOnly = false) {
  const fields = array.map((x, index) => {
    switch (x.type) {
      case 'input':
        return (
          <InputField
            readOnly={formReadOnly}
            key={index}
            placeHolder={x.placeHolder}
            validateFn={x.validateFn}
            fieldName={x.fieldName}
            label={x.label}
            isRequired={x.isRequired}
            hidden={x.hidden}
          />
        );
      case 'select':
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
      case 'time':
        return (
          <TimeInput
            readOnly={formReadOnly}
            key={index}
            fieldName={x.fieldName}
            label={x.label}
            placeHolder={x.placeHolder}
          />
        );
      case 'checkbox':
        return (
          <CheckField
            readOnly={formReadOnly}
            key={index}
            fieldName={x.fieldName}
            options={x.options}
            isRequired={x.isRequired}
            label={x.label}
          />
        );
    }
  });
  return fields;
}
// Fields that are to be in the form
export const formArray = [
  {
    label: 'Name of Routine',
    fieldName: 'name',
    placeHolder: 'Routine Name',
    validateFn: null,
    type: 'input',
    isRequired: true,
  },
  {
    label: 'Dogs',
    fieldName: 'dogs',
    placeHolder: 'Routine of which dogs',
    validateFn: null,
    type: 'checkbox',
    options: [],
    isRequired: true,
  },
  {
    label: 'Days',
    fieldName: 'days',
    placeHolder: '',
    options: [
      { id: 'Mon', label: 'Mon', value: 'mon' },
      { id: 'Tue', label: 'Tue', value: 'tue' },
      { id: 'Weds', label: 'Weds', value: 'weds' },
      { id: 'Thurs', label: 'Thurs', value: 'thurs' },
      { id: 'Fri', label: 'Fri', value: 'fri' },
      { id: 'Sat', label: 'Sat', value: 'sat' },
      { id: 'Sun', label: 'Sun', value: 'sun' },
    ],
    validateFn: null,
    isRequired: true,
    type: 'checkbox',
  },
  {
    label: 'Start Time',
    fieldName: 'startTime',
    placeHolder: '',
    validateFn: null,
    type: 'time',
  },
  {
    label: 'End Time',
    fieldName: 'endTime',
    placeHolder: '',
    validateFn: null,
    type: 'time',
  },
  {
    label: 'Location',
    fieldName: 'location',
    placeHolder: 'Location',
    validateFn: null,
    type: 'input',
    isRequired: true,
    hidden: true,
  },
];
