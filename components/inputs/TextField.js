function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: var(--light);\n  color: var(--dark);\n  cursor: text;\n  word-break: keep-all;\n  user-select: auto;\n  white-space: nowrap;\n  border: 1px solid var(--light-darker);\n  border-radius: 4px;\n  padding: 8px 16px;\n  font-size: 16px;\n  line-height: 28px;\n  box-shadow: var(--z1);\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
var TextField = styled(Element).attrs({
  as: 'input'
})(_templateObject());
export default TextField;