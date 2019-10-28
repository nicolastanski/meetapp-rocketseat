import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 32px;
      font-weight: bold;
    }

    button {
      align-items: center;
      justify-content: space-around;
      padding: 0 20px;
      margin: 5px 10px;
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

    .edit-btn {
      background: #4DBAF9;

      &:hover {
        background: ${darken(0.03, '#4DBAF9')}
      }
    }
  }

  p {
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 32px;
  }

  img {
    background: #fff;
    margin-top: 50px;
    margin-bottom: 25px;
  }

  footer {
    display: flex;
    align-items: center;

    div {

      display: flex;
      align-items: center;
      margin-right: 20px;

      span {
        color: 000;
        opacity: 0.6;
        margin-left: 5px;
        font-size: 18px;

        display: flex;
        align-items: center;

      }
    }
  }

`;
