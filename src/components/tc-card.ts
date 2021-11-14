import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('tc-card')
class TcCard extends LitElement {
  static styles = css`
    .card-item {
      margin: 4px;
      padding: 4px;
      border-bottom: 1px #424242 solid;
      cursor: pointer;
      transition: 0.4s;
    }

    .card-item:last-child {
      border-bottom: none;
    }

    .card-item:hover {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    .card-item_title {
      margin: 4px 0;
      font-size: large;
    }

    .card-item_title:after {
      float: right;
      margin-left: 4px;
      margin-right: 4px;
      color: #000;
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
  `;

  @property()
  cardTitle?: string;

  @property()
  cardContent?: string;

  @state()
  private _isHidden: boolean = true;

  protected render() {
    return html`<li class="card-item" @click=${this._changeVisibility}>
      <span class=${classMap(this._getTitleClasses())}>${this.cardTitle} </span>
      <section class=${classMap(this._getContentClasses())}>${this.cardContent}</section>
    </li>`;
  }

  private _changeVisibility() {
    this._isHidden = !this._isHidden;
    this._getTitleClasses();
    this._getContentClasses();
  }

  private _getTitleClasses() {
    return {
      'card-item_title': true,
      active: !this._isHidden,
    };
  }

  private _getContentClasses() {
    return {
      'card-item_content': true,
      hidden: this._isHidden,
      visible: !this._isHidden,
    };
  }
}
