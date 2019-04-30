import styled from 'styled-components';

var fallback = function fallback() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
    options[_key] = arguments[_key];
  }

  return options.reduce(function (acc, value) {
    return acc !== undefined ? acc : value;
  });
};

var fallbackVar = function fallbackVar(color) {
  return color && color.match(/^([a-z|-])+$/) ? "var(--".concat(color, ", ").concat(color, ")") : color;
};

var Element = styled.div(function (_ref) {
  var m = _ref.m,
      mv = _ref.mv,
      mh = _ref.mh,
      mb = _ref.mb,
      mt = _ref.mt,
      ml = _ref.ml,
      mr = _ref.mr,
      p = _ref.p,
      pv = _ref.pv,
      ph = _ref.ph,
      pb = _ref.pb,
      pt = _ref.pt,
      pl = _ref.pl,
      pr = _ref.pr,
      bg = _ref.bg,
      br = _ref.br,
      c = _ref.c,
      w = _ref.w,
      h = _ref.h,
      z = _ref.z,
      type = _ref.type,
      isCentered = _ref.isCentered,
      justifyContent = _ref.justifyContent,
      boxShadow = _ref.boxShadow,
      alignItems = _ref.alignItems,
      cursor = _ref.cursor,
      onClick = _ref.onClick,
      display = _ref.display,
      textAlign = _ref.textAlign,
      flexDirection = _ref.flexDirection;
  return {
    margin: m,
    marginBottom: fallback(mb, mv),
    marginTop: fallback(mt, mv),
    marginLeft: fallback(ml, mh),
    marginRight: fallback(mr, mh),
    padding: p,
    paddingBottom: fallback(pb, pv),
    paddingTop: fallback(pt, pv),
    paddingLeft: fallback(pl, ph),
    paddingRight: fallback(pr, ph),
    alignItems: fallback(alignItems, isCentered ? 'center' : 'inherit'),
    justifyContent: fallback(justifyContent, isCentered ? 'center' : 'inherit'),
    borderRadius: br,
    textAlign: textAlign,
    width: w,
    height: h,
    background: fallbackVar(bg),
    color: fallbackVar(c),
    cursor: cursor || onClick || type === 'submit' ? 'pointer' : 'inherit',
    display: fallback(display, isCentered ? 'flex' : 'inherit'),
    boxShadow: fallback(boxShadow, z && "var(--z".concat(z, ")")),
    flexDirection: flexDirection
  };
});
export default Element;