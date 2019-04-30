import styled, { css } from 'styled-components';

import Element from '../structure/Element';

const Button = styled(Element).attrs(({ isLoading, isDisabled }) => ({
  as: 'button',
  disabled: isLoading || isDisabled,
}))`
  border: none;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: all 0.2s ease;

  &:enabled {
    ${({ isRaised }) =>
      isRaised &&
      css`
        box-shadow: var(--z2);

        &:hover {
          transform: translateY(-2px);
          box-shadow: var(--z3);
        }
      `}

    &:hover {
      opacity: 0.9;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  bg: 'light',
  c: 'dark',
  isRaised: true,
};

export default Button;
