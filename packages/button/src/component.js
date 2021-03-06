import React from "react";
import styled from "styled-components";
import { Box } from 'grid-styled';

// white listing props passed down to children
export const MyComponent = styled(({ className, name, ...rest }) => (
  <input className={className} value={name} {...rest} />
))`
  font-size: 2.5em;
`;

// extend keyword is deprecated and has already been removed in ver 4
const extendedComponent = MyComponent.extend`
  color:'must be css prop ONLY';
`


// live coral example
const HighlightText = styled(Box).attrs({ size: 2 })`
  ${({ colored, theme }) =>
    colored &&
    css`
      color: ${theme.color.heading};
    `};
  margin: 0;
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;  /* we can replace css tilt blabla tilt with 'blalba' but we then lose the opportunity of validation */
    `};
`;


// extend can only update `className`,
// attrs can update any props
// note: all extends/attrs rely on component being wrapped passing on props (className and ...restProps)
// down to leaf DOM elements )
const Decorated = styled(MyComponent).attrs({
  type: "password", // ...resProps change;
})``; //  you need the two backticks at the end even if you don't want to override the styles


// see https://github.com/styled-components/styled-components/issues/1250#issuecomment-337181485

// btw, guys don't you think that this is not that obvious that attrs mutate given component instead cloning it?
// I have not found in documentation that attrs should be used with extend
// only exception being the component being extended is a html primitive one:

const Exception = styled.a.attrs({ target: "_blank" })``;

// you can't do YourComponent.attrs({prop: value}) as once a Component is defined and being used, it's very dangerouse to modify it
// however, you can do styled(YourComponent).attrs({prop:'value})`` , or YourComponent.extend.attrs({})``
// that's why `.extend` comes to play,

export default Decorated;
