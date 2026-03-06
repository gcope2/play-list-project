/**
 * Copyright 2026 Gabby Cope
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `play-list-project`
 * 
 * @demo index.html
 * @element play-list-project
 */
export class SlideIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "slide-indicator";
  }

  constructor() {
    super();
    this.total = 0;
    this.curIndex = 0;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      curIndex: { type: Number},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .dots {
        display: flex;
        justify-content: left;
        gap: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
      }
      .dot {
        width: 12px;
        height: 12px;
        border-radius: var(--ddd-radius-rounded);
        cursor: pointer;
        background-color: var(--ddd-theme-default-limestoneGray);
      }
      .dot.active {
        opacity: 1;
        width: 15px;
        height: 15px;
        background-color: var(--ddd-theme-default-skyBlue);
      }
    `];
  }

  // Lit render the HTML
  render() {
    let dots = [];
    for (let i = 0; i < this.total; i++) {
      dots.push(html`
        <span @click="${this._handleDotClick}" data-index="${i}" class="dot ${i === this.curIndex ? 'active' : ''}"></span>
      `);
    }

    return html`
      <div class="dots">
        ${dots}
      </div>
      `;
  }

  _handleDotClick(e) {
    const indexChange = new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: {
        index: parseInt(e.target.dataset.index)
      },
    });
    this.dispatchEvent(indexChange);
  }

}

globalThis.customElements.define(SlideIndicator.tag, SlideIndicator);