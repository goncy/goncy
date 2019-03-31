function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: 32px;\n  font-weight: 400;\n  color: var(--light);\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import Element from './Element';
var Title = styled(Element)(_templateObject());
export default Title;