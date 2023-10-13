import theme from 'src/theme';
import styled from 'styled-components/native';

const H4 = styled.Text`
  ${theme.typography.h4};
  margin: 0;
  margin-bottom: ${theme.spacing(6)};
  color: ${theme.palette.text.primary};
`;

export default H4;
