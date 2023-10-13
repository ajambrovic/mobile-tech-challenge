import theme from 'src/theme';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  padding-top: ${theme.spacing(6)};
  background: ${theme.palette.background.body};
  flex: 1;
`;

export default Container;
