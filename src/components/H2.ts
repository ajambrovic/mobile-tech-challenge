import theme from 'src/theme';
import styled from 'styled-components/native';

const H2 = styled.Text`
  ${theme.typography.h2};
  margin: 0;
  margin-bottom: ${theme.spacing(4)};
  color: ${theme.palette.text.primary};
  padding: 0px ${theme.spacing(theme.contentPadding)};
`;

export default H2;
