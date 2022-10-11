import React from 'react';
import { InputField, SelectField, CheckField, TimeInput } from '../../molecules';

// Genertate the form fields
export function generateRoutineFields(form, formReadOnly = false) {
  const fields = [];
  // eslint-disable-next-line no-debugger
  for (const [key, x] of Object.entries(form)) {
    switch (x.type) {
      case 'input':
        fields.push(
          <InputField
            readOnly={formReadOnly}
            key={x.fieldName}
            placeHolder={x.placeHolder}
            validateFn={x.validateFn}
            fieldName={x.fieldName}
            label={x.label}
            isRequired={x.isRequired}
            hidden={x.hidden}
          />
        );
        break;
      case 'select':
        fields.push(
          <SelectField
            readOnly={formReadOnly}
            key={x.fieldName}
            fieldName={x.fieldName}
            options={x.options}
            label={x.label}
            placeHolder={x.placeHolder}
            isRequired={x.isRequired}
          />
        );
        break;
      case 'time':
        fields.push(
          <TimeInput
            readOnly={formReadOnly}
            key={x.fieldName}
            fieldName={x.fieldName}
            label={x.label}
            placeHolder={x.placeHolder}
          />
        );
        break;
      case 'checkbox':
        fields.push(
          <CheckField
            readOnly={formReadOnly}
            key={x.fieldName}
            fieldName={x.fieldName}
            options={x.options}
            checked={x.checked}
            isRequired={x.isRequired}
            label={x.label}
          />
        );
        break;
    }
  }
  return fields;
}

// Fields that are to be in the form
export const formTemplate = {
  name: {
    label: 'Name of Routine',
    fieldName: 'name',
    placeHolder: 'Routine Name',
    validateFn: null,
    type: 'input',
    isRequired: true,
  },
  routineDogs: {
    label: 'Dogs',
    fieldName: 'routineDogs',
    placeHolder: 'Routine of which dogs',
    validateFn: null,
    type: 'checkbox',
    options: [],
    checked: [],
    isRequired: true,
  },
  days: {
    label: 'Days',
    fieldName: 'days',
    placeHolder: '',
    checked: [],
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
  start_time: {
    label: 'Start Time',
    fieldName: 'start_time',
    placeHolder: '',
    validateFn: null,
    type: 'time',
  },
  end_time: {
    label: 'End Time',
    fieldName: 'end_time',
    placeHolder: '',
    validateFn: null,
    type: 'time',
  },
  locationId: {
    label: 'Location',
    fieldName: 'locationId',
    placeHolder: 'Location',
    validateFn: null,
    type: 'input',
    isRequired: true,
    hidden: true,
  },
};
