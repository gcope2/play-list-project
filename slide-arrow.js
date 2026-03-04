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
export class SlideArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "slide-arrow";
  }

  constructor() {
    super();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--ddd-spacing-2);
      }
      button {
        background-color: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-beaverBlue);
        border-color: var(--ddd-theme-default-beaverBlue);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-rounded);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-black);
      }
      button:hover {
        opacity: 0.8;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
      <button class="back" @click=${() => this.dispatchEvent(new CustomEvent('prev-clicked', {bubbles: true, composed: true }))}><</button>
      <button class="next" @click=${() => this.dispatchEvent(new CustomEvent('next-clicked', {bubbles: true, composed: true}))}>></button>
    </div>`;
  }
}

globalThis.customElements.define(SlideArrow.tag, SlideArrow);