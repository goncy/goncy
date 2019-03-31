import React from 'react';
import { Field as FormikField, ErrorMessage } from 'formik';
import styled from 'styled-components';

import Message from './ErrorMessage';
import Label from './Label';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const Field = ({ label, name, children, getValueFromEvent, ...props }) => (
  <Container>
    {label && <Label>{label}</Label>}
    <FormikField name={name} {...props}>
      {({ field, form }) =>
        React.cloneElement(
          children,
          Object.assign({}, props, field, {
            onBlur: () => form.setFieldTouched(name, true),
            onChange: event =>
              form.setFieldValue(
                name,
                (getValueFromEvent && getValueFromEvent(event)) || event.target
                  ? event.target.value
                  : event
              ),
          })
        )
      }
    </FormikField>
    <ErrorMessage component={Message} name={name} />
  </Container>
);

export default Field;
