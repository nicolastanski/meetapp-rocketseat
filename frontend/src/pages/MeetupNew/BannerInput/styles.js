import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: #000;
  align-items: center;
  margin: 20px 0;
  padding: 50px 0;

  label {
    margin: 0 auto;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      padding: 20px 0;
    }

    input {
      display: none;
    }
  }
`;
