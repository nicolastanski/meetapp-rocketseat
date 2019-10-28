import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;

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
      padding: 0 0 10px;
    }

    hr {
      border: 1px solid #999;
      margin: 10px 0 ;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-around;
      align-self: flex-end;

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
`;

