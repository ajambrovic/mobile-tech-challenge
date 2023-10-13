import theme from 'src/theme';
import styled from 'styled-components/native';

const Input = styled.TextInput`
  background: ${theme.palette.background.base};
  padding: ${theme.spacing(2)};
  border: none;
  color: ${theme.palette.text.primary};
`;

export default Input;
