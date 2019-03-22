import styled from 'styled-components';
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
      c = _ref.c,
      cursor = _ref.cursor,
      onClick = _ref.onClick;
  return {
    margin: m,
    marginBottom: mb || mv,
    marginTop: mt || mv,
    marginLeft: ml || mh,
    marginRight: mr || mh,
    padding: p,
    paddingBottom: pb || pv,
    paddingTop: pt || pv,
    paddingLeft: pl || ph,
    paddingRight: pr || ph,
    backgroundColor: "var(--".concat(bg, ")"),
    color: "var(--".concat(c, ")"),
    cursor: cursor || onClick ? 'pointer' : 'inherit'
  };
});
export default Element;