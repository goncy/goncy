import styled from 'styled-components';

import Element from './Element';

const Card = styled(Element)`
  border-radius: 4px;
`;

Card.defaultProps = { c: 'dark-lighter', z: 1, p: 20 };

export default Card;
