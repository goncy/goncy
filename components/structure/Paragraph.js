function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 400;\n  font-size: 17px;\n  line-height: 28px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import Element from './Element';
var Paragraph = styled(Element).attrs({
  as: 'p'
})(_templateObject());
export default Paragraph;