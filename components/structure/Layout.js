function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  overflow: auto;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  &:not(:last-child) {\n    margin-right: ", "px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  z-index: 1;\n  display: flex;\n  justify-content: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100vw;\n  height: 100vh;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import Element from '../structure/Element';
var Layout = styled(Element)(_templateObject());
var Header = styled(Element).attrs({
  as: 'ul'
})(_templateObject2(), function (_ref) {
  var _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'flex-start' : _ref$align;
  return align;
});
var HeaderItem = styled(Element).attrs({
  as: 'li'
})(_templateObject3(), function (_ref2) {
  var _ref2$spacing = _ref2.spacing,
      spacing = _ref2$spacing === void 0 ? 24 : _ref2$spacing;
  return spacing;
});
var Body = styled(Element)(_templateObject4());
Layout.Header = Header;
Layout.Header.Item = HeaderItem;
Layout.Body = Body;
export default Layout;