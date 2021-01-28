/**
 * Build styles
 */
import css from "../styles/collapse.css";
import { make } from "@groupher/editor-utils";

import { randomStr } from "../helper";

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
      collapseWrapper: "cdx-collapse-wrapper",
      titleInput: "cdx-collapse-title-input",
      labelToggle: "cdx-collapse-toggle",
      inputToggle: "cdx-collapse-input-toggle",
      content: "cdx-collapse-content",
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
}
