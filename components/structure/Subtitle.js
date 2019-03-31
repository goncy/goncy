function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: var(--primary);\n  font-size: 20px;\n  line-height: 32px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.025em;\n"]);

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