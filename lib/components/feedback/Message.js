import styled from 'styled-components';

import Element from '../structure/Element';

const Message = styled(Element)`
  font-size: 18px;
  padding: 20px;
  width: fit-content;
  color: rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

Message.defaultProps = { bg: 'light' };

export default Message;
