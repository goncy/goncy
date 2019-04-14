import styled from 'styled-components';

const TextField = styled(Element).attrs({ as: 'input' })`
  color: var(--dark);
  cursor: text;
  word-break: keep-all;
  user-select: auto;
  white-space: nowrap;
  border: 0;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 28px;
  box-shadow: var(--z1);
`;

export default TextField;
