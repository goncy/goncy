function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n          transform: translateY(-2px);\n          box-shadow: var(--z3);\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border: none;\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  white-space: nowrap;\n  height: 40px;\n  display: inline-block;\n  line-height: 40px;\n  padding: 0 14px;\n  border-radius: 4px;\n  font-size: 15px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.025em;\n  text-decoration: none;\n  transition: all 0.2s ease;\n\n  &:enabled {\n    box-shadow: var(--z2);\n\n    &:hover {\n      opacity: 0.9;\n      ", "\n    }\n  }\n\n  &:disabled {\n    opacity: 0.7;\n    cursor: not-allowed;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled, { css } from 'styled-components';
import Element from '../structure/Element';
var Button = styled(Element).attrs({
  as: 'button',
  disabled: function disabled(_ref) {
    var isLoading = _ref.isLoading,
        isDisabled = _ref.isDisabled;
    return isLoading || isDisabled;
  }
})(_templateObject(), function (_ref2) {
  var isRaised = _ref2.isRaised;
  return isRaised && css(_templateObject2());
});
Button.defaultProps = {
  bg: 'light',
  c: 'secondary',
  isRaised: true
};
export default Button;