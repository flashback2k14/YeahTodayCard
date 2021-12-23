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

  header svg:hover {
    color: var(--focus-color);
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

  footer button {
    position: absolute;
    bottom: 48px;
    left: 0;
    right: 0;
    margin: auto;

    width: 60px;
    height: 60px;

    border-radius: 50%;
    border: none;

    box-shadow: var(--shadow-2);
    transition: all 0.1s ease-in-out;

    background-image: linear-gradient(45deg, rgb(83, 109, 254) 0%, rgb(106, 61, 232) 100%);
    color: white;

    cursor: pointer;
  }

  footer button svg {
    margin-top: 2px;
  }

  footer button:hover,
  footer button:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--focus-color);
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
    border: 1px solid var(--border-input);
    border-radius: 2px;
    font-size: medium;

    background: var(--background);
    color: var(--color);
  }

  form button {
    font-size: medium;
    padding: 0.5em;
    background-image: linear-gradient(45deg, rgb(83, 109, 254) 0%, rgb(106, 61, 232) 100%);
    border: none;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
  }

  form input:focus,
  form button:focus,
  form input:hover,
  form button:hover {
    outline: none;
    box-shadow: 0 0 0 3px var(--focus-color);
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
    padding: var(--size-fluid-3) var(--size-fluid-3) 16px var(--size-fluid-3);

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
    flex-direction: column;
    margin: 4px 0;
  }

  .card-item_buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  .card-item_buttons svg {
    margin-top: 4px;
    cursor: pointer;
    color: var(--color);
  }

  .card-item_buttons svg:hover {
    color: var(--focus-color);
  }

  .card-item_buttons svg:nth-child(1),
  .card-item_buttons-right {
    margin-right: 14px;
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

  .flex-grow {
    flex-grow: 1;
  }

  .flex-none {
    flex: none;
  }

  .border-top {
    border-top: 1px solid var(--border-table);
  }

  .border-right {
    border-right: 1px solid var(--border-table);
  }

  .border-bottom {
    border-bottom: 1px solid var(--border-table);
  }

  .column-width {
    width: 48px;
  }

  .column-left {
    padding-left: 8px;
  }

  .text-center {
    text-align: center;
  }

  .text-bold {
    font-weight: bold;
  }

  .text-strike-through {
    text-decoration: line-through;
  }
`;
