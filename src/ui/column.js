/**
 * Build styles
 */
import css from "../styles/column.css";
import { make, cutFrom, isLatinString } from "@groupher/editor-utils";

import ArrowIcon from "../icon/arrow.svg";
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
export default class ColumnCollapse {
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
      wrapper: "cdx-column-collapse",
      collapseWrapper: "cdx-column-collapse-wrapper",
      titleInput: "cdx-column-collapse-title",
      labelToggle: "cdx-column-collapse-toggle",
      content: "cdx-column-collapse-content",
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

    const CollapseWrapperEl = make("div", this.CSS.collapseWrapper);

    this.TitleInput = make("div", this.CSS.titleInput, {
      contentEditable: true,
      "data-skip-plus-button": true,
    });
    this.TitleInput.setAttribute("placeholder", "折叠块标题");

    this.TitleInput.value = this.data.title;
    this.TitleInput.placeholder = "折叠块标题 column";

    // const LabelEl = make("label", this.CSS.labelToggle);
    // LabelEl.appendChild(this.TitleInput);

    const CollapseContentWrapper = make("div", this.CSS.content);
    // const tmp =
    //   "These methods allow you to show Tooltip helper near own elements. Parameters, are the same as in CodeX Tooltips libraryare the same as in CodeX Tooltips library";
    // const tmp =
    //   "主打轻快无边界的在、动效和声效体验构建上精雕细琢，效率功能和系统优化上的优化也是可圈可点。主打轻快无边界的在、动效和声效体验构建上精雕细琢，效率功能和系统优化上的优化也是可圈可点。效率功能和系统优化上的优化也是可圈可点。";
    const tmp =
      "主打「轻快无边界」的 ColorOS 7 在 UI、动效和声效体验构建上精雕细琢，效率功能和系统优化上的优化也是可圈可点。主打「轻快无边界」的 ColorOS 7 在 UI、动效和声效体验构建上精雕细琢，效率功能和系统优化上的优化也是可圈可点。";

    this.CollapseContent = make("div", this.CSS.contentInner, {
      contentEditable: true,
      "data-skip-plus-button": true,
      innerHTML: cutFrom(tmp, isLatinString(tmp) ? 140 : 50),
    });
    // this.CollapseContent.innerHTML = this.data.content;
    this.CollapseContent.setAttribute("placeholder", "折叠块内容");

    const LabelEl = make("label", this.CSS.labelToggle, {
      innerHTML: `${ArrowIcon} 展开`,
      contentEditable: false,
    });
    this.CollapseContent.appendChild(LabelEl);
    // 插入空标签防止 Label 被 focus
    this.CollapseContent.appendChild(make("div"));

    CollapseContentWrapper.appendChild(this.CollapseContent);

    CollapseWrapperEl.appendChild(this.TitleInput);
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
