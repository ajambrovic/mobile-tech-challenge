import theme from 'src/theme';
import styled from 'styled-components/native';

const H6 = styled.Text`
  ${theme.typography.h6};
  margin: 0;
  margin-bottom: ${theme.spacing(4)};
  color: ${theme.palette.text.primary};
`;

export default H6;
