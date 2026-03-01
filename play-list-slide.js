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
export class PlayListSlide extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-slide";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--play-list-project-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}:</span> ${this.title}</h3>
        <slot></slot>
      </div>
      <div>
        <h4>TOP LINE HEADING</h4>
        <h3>Slide 1, sub-heading</h3>
        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non gravida neque. Quisque vulputate velit eu mauris mattis, at ultricies nisl varius. Nulla facilisi. Nulla dignissim diam in dui blandit lacinia. Nulla nec viverra magna. Ut felis odio, ullamcorper eget mattis vel, ultricies sit amet purus. In massa tortor, auctor cursus dignissim et, dictum eu est. Etiam metus est, mattis ut tempor eget, aliquam aliquet massa. Duis in hendrerit tellus, id viverra odio. Cras bibendum consequat erat, id condimentum metus lobortis vitae. Duis id dictum lectus, vitae ullamcorper mi. Duis ex massa, posuere vel sapien at, pulvinar tempus turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce finibus orci nec odio venenatis, eget blandit eros vehicula.</h5>
      </div>
      `;
  }
}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);