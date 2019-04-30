function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 24px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { Field as FormikField, ErrorMessage } from 'formik';
import styled from 'styled-components';
import Message from './ErrorMessage';
import Label from './Label';
var Container = styled.div(_templateObject());

var Field = function Field(_ref) {
  var label = _ref.label,
      name = _ref.name,
      children = _ref.children,
      validate = _ref.validate,
      getValueFromEvent = _ref.getValueFromEvent,
      props = _objectWithoutProperties(_ref, ["label", "name", "children", "validate", "getValueFromEvent"]);

  return React.createElement(Container, null, label && React.createElement(Label, null, label), React.createElement(FormikField, _extends({
    name: name,
    validate: validate
  }, props), function (_ref2) {
    var field = _ref2.field,
        form = _ref2.form;
    return React.cloneElement(children, Object.assign({}, props, field, {
      onBlur: function onBlur() {
        return form.setFieldTouched(name, true);
      },
      onChange: function onChange(event) {
        return form.setFieldValue(name, getValueFromEvent && getValueFromEvent(event) || event.target ? event.target.value : event);
      }
    }));
  }), React.createElement(ErrorMessage, {
    component: Message,
    name: name
  }));
};

export default Field;