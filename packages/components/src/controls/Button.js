import React from 'react';
import styled, { css } from 'styled-components';

import Element from '../structure/Element';

const Container = styled(Element)`
  border: none;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: var(--z1);
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: all 0.2s ease;
  width: ${({ isFit }) => (isFit ? 'fit-content' : 'inherit')}

  &:hover {
    opacity: 0.8;
    ${({ isRaised }) =>
      isRaised &&
      css`
        transform: translateY(-2px);
        box-shadow: var(--z2);
      `}
  }
`;

const Button = ({ children, ...props }) => (
  <Container as="button" {...props}>
    {children}
  </Container>
);

Button.defaultProps = {
  bg: 'light',
  c: 'secondary',
  isRaised: true,
  isFit: true,
};

export default Button;
