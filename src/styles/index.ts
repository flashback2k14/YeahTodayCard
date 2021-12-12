import { css } from 'lit';

/**
 * BASE STYLING
 */

export const headerStyles = css`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
  }

  header span {
    margin-left: 16px;
    font-size: larger;
    letter-spacing: var(--font-letterspacing-1);
  }

  header svg {
    margin-top: 4px;
    margin-right: 16px;
    cursor: pointer;
    color: var(--color);
  }
`;

export const mainStyles = css`
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 48px - 48px);
    overflow: auto;
  }
`;

export const footerStyles = css`
  footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
  }

  footer span {
    margin-left: 16px;
  }
`;

/**
 * LOGIN STYLING
 */

export const loginStyles = css`
  form {
    display: flex;
    flex-direction: column;
    row-gap: 0.6em;
    width: 30vw;
  }

  form label {
    display: flex;
  }

  form label span {
    flex: none;
    padding: 0.25em 0.5em;
  }

  form label input {
    flex-grow: 1;
    margin-left: 16px;
    padding: 0.25em 0.5em;
    border: 1px solid #000;
    border-radius: 2px;
    font-size: medium;

    background: var(--background);
    color: var(--color);
  }

  form label input:hover {
    border: 1px solid rgb(29, 233, 182);
  }

  form label input:focus {
    border: 1px solid rgb(29, 233, 182);
    outline: 1px solid rgb(29, 233, 182);
  }

  form button {
    font-size: medium;
    padding: 0.5em;
    background-image: linear-gradient(45deg, rgb(83, 109, 254) 0%, rgb(106, 61, 232) 100%);
    border: none;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }

  form button:hover {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  }

  form button:focus {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    border: none;
  }

  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    form {
      width: 90vw;
    }
  }
`;

/**
 * CARDS STYLING
 */

export const cardsStyles = css`
  .card-list {
    display: flex;
    flex-direction: column;
    height: calc((100vh - 48px) - 48px);
    width: 90vw;
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export const cardStyles = css`
  .card-item {
    margin: 8px 4px;
    padding: var(--size-fluid-3);

    border-radius: var(--radius-2);
    box-shadow: var(--shadow-2);

    transition: 0.4s;
  }

  .card-item:last-child {
    border-bottom: none;
  }

  .card-item_title {
    margin: 4px 0;
    font-size: large;
    cursor: pointer;
  }

  .card-item_title:hover {
    border-bottom: 1px solid var(--border-table);
  }

  .card-item_title:after {
    float: right;
    margin-left: 4px;
    margin-right: 4px;
    color: var(--color);
    content: '\\002B';
  }

  .card-item_content {
    margin: 4px 0;
  }

  .active {
    font-weight: bold;
  }

  .active:after {
    content: '\\2212';
  }

  .visible {
    display: flex;
  }

  .hidden {
    display: none;
  }

  table {
    width: 100%;
    margin-top: 8px;
    border-collapse: collapse;
  }

  thead tr th:first-child {
    flex-grow: 1;
    border-bottom: 1px solid var(--border-table);
    border-right: 1px solid var(--border-table);
  }

  thead tr th:nth-child(2) {
    flex: none;
    width: 48px;
    border-bottom: 1px solid var(--border-table);
    border-right: 1px solid var(--border-table);
    text-align: center;
  }

  thead tr th:last-child {
    flex: none;
    width: 48px;
    border-bottom: 1px solid var(--border-table);
    text-align: center;
  }

  tbody tr td:first-child {
    border-right: 1px solid var(--border-table);
  }

  tbody tr td:nth-child(2) {
    border-right: 1px solid var(--border-table);
    text-align: center;
  }

  tbody tr td:last-child {
    text-align: center;
  }

  tfoot tr td:first-child {
    border-top: 1px solid var(--border-table);
    border-right: 1px solid var(--border-table);
    font-weight: bold;
  }

  tfoot tr td:nth-child(2) {
    border-top: 1px solid var(--border-table);
    border-right: 1px solid var(--border-table);
    text-align: center;
    font-weight: bold;
  }

  tfoot tr td:last-child {
    border-top: 1px solid var(--border-table);
    text-align: center;
    font-weight: bold;
  }
`;
