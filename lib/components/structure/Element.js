import styled from 'styled-components';

const fallback = (...options) =>
  options.reduce((acc, value) => (acc !== undefined ? acc : value));

const fallbackVar = color =>
  color && color.match(/^([a-z|-])+$/) ? `var(--${color}, ${color})` : color;

const Element = styled.div(
  ({
    m,
    mv,
    mh,
    mb,
    mt,
    ml,
    mr,
    p,
    pv,
    ph,
    pb,
    pt,
    pl,
    pr,
    bg,
    br,
    c,
    w,
    h,
    z,
    type,
    isCentered,
    justifyContent,
    boxShadow,
    alignItems,
    cursor,
    onClick,
    display,
    textAlign,
    flexDirection,
  }) => ({
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
    textAlign,
    width: w,
    height: h,
    background: fallbackVar(bg),
    color: fallbackVar(c),
    cursor: cursor || onClick || type === 'submit' ? 'pointer' : 'inherit',
    display: fallback(display, isCentered ? 'flex' : 'inherit'),
    boxShadow: fallback(boxShadow, z && `var(--z${z})`),
    flexDirection,
  })
);

export default Element;
