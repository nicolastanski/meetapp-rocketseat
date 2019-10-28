import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  /* background: linear-gradient(-180deg, #22202C, #402845); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px
  }

  input {
    background: rgba(0, 0, 0, 0.5);
    border: 0;
    height: 50px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 10px;
    border-radius: 4px;
    font-size: 16px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  span {
    color: #F94D6A;
    align-self: flex-start;
    margin: 0 0 10px;
  }

  button {
    margin: 5px 0 0;
    height: 50px;
    background: #F94D6A;
    font-weight: bold;
    border-radius: 4px;
    font-size: 15px;
    border: none;
    color: #fff;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#F94D6A')}
    }
  }

  a {
    color: #fff;
    margin-top: 15px;
    font-size: 16px;
    opacity: 0.8;
    text-decoration: none;

    &:hover {
      opacity: 1;
    }


  }

`;
