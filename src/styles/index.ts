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
    letter-spacing: 0.025em;
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

  footer a {
    margin-left: 6px;
  }

  .footer-anchor {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--color);
    outline: none;
  }

  .footer-anchor:hover,
  .footer-anchor:focus {
    text-decoration: underline;
    cursor: pointer;
  }

  .footer-anchor:visited {
    color: var(--color);
  }

  .footer-anchor span {
    font-size: small;
  }

  .footer-icon {
    margin-left: 8px;
    margin-right: 12px;
  }

  footer button {
    position: absolute;
    bottom: 40px;
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

  .show {
    display: block;
  }

  .hide {
    display: none;
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

  form button.close {
    background-image: conic-gradient(from 0.5turn at bottom left, deeppink, rebeccapurple);
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
    padding: 24px 24px 16px 24px;

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
    text-decoration: underline;
    text-decoration-style: solid;
    text-decoration-thickness: 2.5px;
    text-decoration-line: underline;
    text-decoration-color: var(--focus-color);
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

  .card-item_buttons svg:first-child {
    margin-left: 14px;
  }

  .card-item_buttons svg:nth-child(1),
  .card-item_buttons svg:nth-child(2),
  .card-item_buttons-right {
    margin-right: 16px;
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

  .icon {
    padding-top: 4px;

    cursor: pointer;
    color: var(--color);
  }

  .icon:hover {
    color: var(--focus-color);
  }

  .entry-detail_input {
    border: none;
    border-bottom: 1px solid var(--border-input);
    font-size: medium;

    background: var(--background);
    color: var(--color);
  }

  .entry-detail_input:focus,
  .entry-detail_input:hover {
    outline: none;
    box-shadow: 0 0 0 3px var(--focus-color);
  }

  .input_text {
    width: 98%;
  }

  .input_number {
    width: 48px;
    text-align: center;
  }
`;

/**
 * MODAL STYLING
 */

export const modalStyles = css`
  .tc-dialog-container {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(75, 75, 75, 0.1);
    backdrop-filter: blur(0.05em);
  }

  .tc-dialog {
    width: 30vw;

    border: none;
    border-radius: var(--radius-2);
    box-shadow: var(--shadow-2);

    background: var(--background);
    color: var(--color);

    z-index: 5;
  }

  .tc-dialog_content {
    display: flex;
    flex-direction: column;
    padding: 12px 24px;
  }

  .tc-dialog_content h3 {
    margin-top: 0;
  }

  .tc-dialog_content form {
    display: contents;
  }

  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    .tc-dialog {
      width: 90vw;
    }
  }
`;

export const newModalStyles = css`
  input[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(var(--calender-icon-color));
    opacity: 1;
  }

  button {
    margin-top: 8px;
  }
`;

export const copyModalStyles = css`
  input[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(var(--calender-icon-color));
    opacity: 1;
  }

  .tasks-container {
    display: flex;
    flex-direction: column;
  }

  .align-items {
    align-items: center;
  }

  .word-break {
    width: 80%;
    word-break: break-all;
  }

  .margin-top {
    margin-top: 8px;
  }
`;
