/**
 * Copyright 2026 Gabby Cope
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./play-list-slide.js";
import "./slide-arrow.js";
import "./slide-indicator.js";

/**
 * `play-list-project`
 * 
 * @demo index.html
 * @element play-list-project
 */
export class PlayListProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-project";
  }

  constructor() {
    super();
    this.curIndex = 0;
    this.topHeading = "";
    this.secondHeading = "";
    this.slides = Array.from(this.querySelectorAll("play-list-slide"));
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      curIndex: { type: Number, reflect: true },
      topHeading: { type: String},
      secondHeading: { type: String},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-slateMaxLight);
        font-family: var(--ddd-font-navigation);
        width: 800px;
        margin: var(--ddd-spacing-2) var(--ddd-spacing-2) var(--ddd-spacing-2) 25px !important;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        margin-left: var(--ddd-spacing-10);
      }
      .title-top {
        color: var(--ddd-theme-default-skyBlue);
        font-size: var(--ddd-font-size-s);
      }
      .slide-title {
        margin-top: var(--ddd-spacing-2);
        margin-bottom: var(--ddd-spacing-10);
        color: var(--ddd-theme-default-beaverBlue);
        font-size: var(--ddd-font-size-xl);
        font-weight: var(--ddd-font-weight-bold);
      }
      .slide-content {
        margin-bottom: var(--ddd-spacing-4);
        font-size: var(--ddd-font-size-xs);
        width: 400px;
        height: 150px;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .line {
        margin-top: var(--ddd-spacing-10);
        border: none;
        border-top: 3px solid var(--ddd-theme-default-skyBlue);
        justify-self: left;
        width: 100px;
        margin-left: 0;
        padding-bottom: 0;
      }
      .arrow-wrapper {
        position: relative;
        top: -200px;
      }
      @media (prefers-color-scheme: dark) {
        .slide-content {
          color: black;
        }
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        
        <h5 class="title-top">${this.topHeading}</h5>
        <h1 class="slide-title">${this.secondHeading}</h1>

        <hr class="line">

        <div class="slide-content">
          <slot></slot>
        </div>

        <slide-indicator
          .total="${this.slides.length}"
          .curIndex="${this.curIndex}"
          @play-list-index-changed="${this._handleIndexChange}">
        </slide-indicator>
      </div>
      <div class="arrow-wrapper">
        <slide-arrow
          @prev-clicked="${this.back}"
          @next-clicked="${this.next}">
        </slide-arrow>
      </div>
      `;
  }

  firstUpdated() {  
    this._updateSlides();
  }

  updated(changedProperties) {
    if (changedProperties.has('curIndex')) {
      this._updateSlides();
    }
  }

  _updateSlides() {
    this.slides.forEach((slide, i) => {
      slide.active = (i === this.curIndex)
    });

    const curSlide = this.slides[this.curIndex];
    if (curSlide) {
      this.topHeading = curSlide.getAttribute("topHeading");
      this.secondHeading = curSlide.getAttribute("secondHeading");
    } 
  }

  next() {
    if (this.curIndex < this.slides.length - 1) {
      this.curIndex++;
    }
  }

  back() {
    if (this.curIndex > 0) {
      this.curIndex--;
    }
  }

  _handleIndexChange(e) {
    const newIndex = e.detail.index;
    
    if (newIndex >= 0 && newIndex < this.slides.length) {
      this.curIndex = newIndex;
    }
  }
}

globalThis.customElements.define(PlayListProject.tag, PlayListProject);