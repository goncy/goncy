import styled from 'styled-components';

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
    c,
    cursor,
    onClick,
  }) => ({
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
    backgroundColor: `var(--${bg})`,
    color: `var(--${c})`,
    cursor: cursor || onClick ? 'pointer' : 'inherit',
  })
);

export default Element;
