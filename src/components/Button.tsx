import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import theme from 'src/theme';
import styled from 'styled-components/native';

const ButtonContent = styled.Text<{ pressed?: boolean }>`
  background: transparent;
  border: 1px solid ${theme.palette.secondary.main};
  border-radius: ${theme.borderRadius}px;
  color: ${theme.palette.primary.main};
  padding: ${theme.spacing(2)};
  ${theme.typography.button};
  text-align: center;

  ${({ pressed }) =>
    pressed &&
    `
    background: ${theme.palette.background.base};
    border: 1px solid ${theme.palette.secondary.light};
    color: ${theme.palette.primary.light};
  `}
`;

const Button = (props: PressableProps) => {
  return (
    <Pressable {...props}>
      {({ pressed }) => (
        <ButtonContent pressed={pressed}>
          {typeof props.children === 'function'
            ? props.children({ pressed })
            : props.children}
        </ButtonContent>
      )}
    </Pressable>
  );
};

export default Button;
