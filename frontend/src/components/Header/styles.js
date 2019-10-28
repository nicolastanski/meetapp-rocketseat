import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #000000;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      border-right: 1px solid red;
      width: 32px;
    }

    a {
      font-weight: bold;
      color: red;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #FFF;
      font-weight: bold;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
      text-decoration: none;
    }
  }

  button {
    margin-left: 30px;
    padding: 0 10px;
    height: 42px;
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
`;
