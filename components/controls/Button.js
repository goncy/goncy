function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        transform: translateY(-2px);\n        box-shadow: var(--z2);\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border: none;\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  white-space: nowrap;\n  height: 40px;\n  display: inline-block;\n  line-height: 40px;\n  padding: 0 14px;\n  box-shadow: var(--z1);\n  border-radius: 4px;\n  font-size: 15px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.025em;\n  text-decoration: none;\n  transition: all 0.2s ease;\n  width: ", "\n\n  &:hover {\n    opacity: 0.8;\n    ", "\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import styled, { css } from 'styled-components';
import Element from '../structure/Element';
var Container = styled(Element)(_templateObject(), function (_ref) {
  var isFit = _ref.isFit;
  return isFit ? 'fit-content' : 'inherit';
}, function (_ref2) {
  var isRaised = _ref2.isRaised;
  return isRaised && css(_templateObject2());
});

var Button = function Button(_ref3) {
  var children = _ref3.children,
      props = _objectWithoutProperties(_ref3, ["children"]);

  return React.createElement(Container, _extends({
    as: "button"
  }, props), children);
};

Button.defaultProps = {
  bg: 'light',
  c: 'secondary',
  isRaised: true,
  isFit: true
};
export default Button;