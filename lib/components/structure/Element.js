import styled from 'styled-components';

const fallback = (...options) =>
  options.reduce((acc, value) => (acc !== undefined ? acc : value));

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
    cursor,
    onClick,
    display,
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
    borderRadius: br,
    width: w,
    height: h,
    background: bg && `var(--${bg})`,
    color: c && `var(--${c})`,
    cursor: cursor || onClick ? 'pointer' : 'inherit',
    display,
    flexDirection,
  })
);

export default Element;
