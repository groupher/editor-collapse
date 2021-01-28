/**
 * Build styles
 */
import css from "./index.css";
import { make } from "@groupher/editor-utils";

import { randomStr } from "./helper";

/**
 * Collapse Block for the Editor.js.
 *
 * @author CodeX (team@ifmo.su)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 */

/**
 * @typedef {Object} DelimiterData
 * @description Tool's input and output data format
 */
export default class Collapse {
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: DelimiterData, config: object, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */
  constructor({ data, config, api }) {
    this.api = api;

    this.data = {
      title: data.title || "",
      content: data.content || "",
    };

    this.TitleInput = null;
    this.CollapseContent = null;

    this._element = this.drawView();
    this.data = data;
  }

  /**
   * @return {object} - Collapse Tool styles
   * @constructor
   */
  get CSS() {
    return {
      block: this.api.styles.block,
      wrapper: "cdx-collapse",
      collapseWrapper: "wrap-collabsible",
      titleInput: "cdx-collapse-title-input",
      labelToggle: "cdx-collapse-toggle",
      inputToggle: "cdx-collapse-input-toggle",
      content: "collapsible-content",
      contentInner: "content-inner",
    };
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    const WrapperEl = make("div", [this.CSS.block, this.CSS.wrapper]);
    const uid = randomStr(4);

    const CollapseWrapperEl = make("div", this.collapseWrapper);
    const CheckEl = make("input", this.CSS.inputToggle, {
      type: "checkbox",
      id: uid,
    });

    this.TitleInput = make("input", this.CSS.titleInput);
    this.TitleInput.value = this.data.title;
    this.TitleInput.placeholder = "折叠块标题";

    const LabelEl = make("label", this.CSS.labelToggle);
    LabelEl.setAttribute("for", uid);
    LabelEl.appendChild(this.TitleInput);

    const CollapseContentWrapper = make("div", this.CSS.content);
    this.CollapseContent = make("div", this.CSS.contentInner, {
      contentEditable: true,
    });
    this.CollapseContent.innerHTML = this.data.content;
    this.CollapseContent.setAttribute("placeholder", "折叠块内容");

    CollapseContentWrapper.appendChild(this.CollapseContent);

    CollapseWrapperEl.appendChild(CheckEl);
    CollapseWrapperEl.appendChild(LabelEl);
    CollapseWrapperEl.appendChild(CollapseContentWrapper);

    WrapperEl.appendChild(CollapseWrapperEl);

    return WrapperEl;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    return this._element;
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {DelimiterData} - saved data
   * @public
   */
  save(toolsContent) {
    return {
      title: this.TitleInput.value,
      content: this.CollapseContent.innerHTML,
    };
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: `<svg width="19" t="1575117780012" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4865" width="200" height="200"><path d="M512 576l192 192H576v192H448v-192H320l192-192z m192-384H576V0H448v192H320l192 192 192-192z m256 128c0-35.2-28.8-64-64-64h-160l-64 64h192l-128 128h-448l-128-128h192l-64-64H128c-35.2 0-64 28.8-64 64l160 160L64 640c0 35.2 28.8 64 64 64h160l64-64h-192l128-128h448l128 128h-192l64 64H896c35.2 0 64-28.8 64-64l-160-160L960 320z" p-id="4866"></path></svg>`,
      title: "折叠块",
    };
  }
}
