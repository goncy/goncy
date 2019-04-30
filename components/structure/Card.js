function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border-radius: 4px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import Element from './Element';
var Card = styled(Element)(_templateObject());
Card.defaultProps = {
  c: 'dark-lighter',
  z: 1,
  p: 20
};
export default Card;