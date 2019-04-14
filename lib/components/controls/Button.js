import styled, { css } from 'styled-components';

import Element from '../structure/Element';

const Button = styled(Element).attrs({
  as: 'button',
  disabled: ({ isLoading, isDisabled }) => isLoading || isDisabled,
})`
  border: none;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  padding: 0 14px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: all 0.2s ease;

  &:enabled {
    box-shadow: var(--z2);

    &:hover {
      opacity: 0.9;
      ${({ isRaised }) =>
        isRaised &&
        css`
          transform: translateY(-2px);
          box-shadow: var(--z3);
        `}
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  bg: 'light',
  c: 'secondary',
  isRaised: true,
};

export default Button;
