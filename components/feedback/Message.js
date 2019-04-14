function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: 18px;\n  padding: 20px;\n  width: fit-content;\n  color: rgba(0, 0, 0, 0.35);\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import Element from '../structure/Element';
var Message = styled(Element)(_templateObject());
Message.defaultProps = {
  bg: 'light'
};
export default Message;