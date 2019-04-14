import styled from 'styled-components';

var fallback = function fallback() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
    options[_key] = arguments[_key];
  }

  return options.reduce(function (acc, value) {
    return acc !== undefined ? acc : value;
  });
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
      cursor = _ref.cursor,
      onClick = _ref.onClick,
      display = _ref.display,
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
    borderRadius: br,
    width: w,
    height: h,
    background: bg && "var(--".concat(bg, ")"),
    color: c && "var(--".concat(c, ")"),
    cursor: cursor || onClick ? 'pointer' : 'inherit',
    display: display,
    flexDirection: flexDirection
  };
});
export default Element;