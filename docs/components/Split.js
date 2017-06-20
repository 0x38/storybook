import React, { Children } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const Root = glamorous.div({
  position: 'relative',
  display: 'flex',
  marginLeft: -20,
  marginRight: -20,
  '@media(max-width: 640px)': {
    display: 'block',
  },
});

const Aside = glamorous.aside(
  {
    position: 'relative',
    padding: 30,
    background: 'rgba(0, 0, 0, .06)',
    minWidth: 320,
    boxSizing: 'border-box',
    borderRadius: 3,
    boxShadow: 'inset 2px 2px 9px 0 rgba(0,0,0,0.3)',
    margin: '0 20px',
  },
  ({ flip }) => ({
    order: flip ? -1 : 1,
  })
);
const Content = glamorous.article({
  flex: 1,
  margin: '0 20px',
});

const Split = ({ children, flip, ...rest }) => {
  const [aside, ...content] = Children.toArray(children);
  return (
    <Root {...rest}>
      <Aside {...{ flip }}>{aside}</Aside>
      <Content>{content}</Content>
    </Root>
  );
};

Split.displayName = 'Split';
Split.propTypes = {
  children: PropTypes.node.isRequired,
  flip: PropTypes.bool,
};
Split.defaultProps = {
  flip: false,
};

export default Split;
