import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 30px;
      font-weight: bold;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-around;

      margin: 5px 0 0;
      width: 162px;
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

  }

  ul {
    margin-top: 30px;
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;

      margin: 20px 0;
      padding: 20px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);

      strong {
        display: block;
        font-size: 20px;
        font-weight: bold;
        width: 70%;
      }

      span {
        display: block;
        margin: 3px;
        color: #fff;
        opacity: 0.6;
      }
    }

    a {
      color: #fff;
    }
  }
`;
