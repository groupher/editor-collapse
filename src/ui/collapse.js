/**
 * Build styles
 */
import css from "../styles/collapse.css";
import { make, clazz } from "@groupher/editor-utils";

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
  constructor({ data, config, api, setData }) {
    this.api = api;

    this.data = data;

    this.nodes = {
      title: make("div", this.CSS.titleInput, {
        contentEditable: true,
        placeholder: "折叠块标题",
        "data-skip-plus-button": true,
      }),
      content: make("div", this.CSS.contentInner, {
        contentEditable: true,
        placeholder: "折叠块内容",
        "data-skip-plus-button": true,
      }),
    };

    this._assignData(data);

    this.api.listeners.on(this.nodes.title, "input", () => {
      const title = this.nodes.title.innerHTML;
      setData({ title });
    });

    this.api.listeners.on(this.nodes.content, "input", () => {
      const content = this.nodes.content.innerHTML;
      setData({ content });
    });

    this.isFolded = true;
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
      header: "cdx-collapse-header",
      titleInput: "cdx-collapse-title-input",
      labelToggle: "cdx-collapse-toggle",
      inputToggle: "cdx-collapse-input-toggle",
      content: "cdx-collapse-content",
      contentInner: "content-inner",

      contentChecked: "cdx-collapse-content-checked",
      labelChecked: "cdx-collapse-toggle-checked",
    };
  }

  /**
   * assign data to current title/content input
   *
   * @param {ToolData} data
   * @memberof ColumnCollapse
   */
  _assignData(data) {
    this._data = data;
    const { title, content } = this._data;

    this.nodes.title.innerHTML = title;
    this.nodes.content.innerHTML = content;
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView(data) {
    this._assignData(data);
    const WrapperEl = make("div", [this.CSS.block, this.CSS.wrapper]);

    this.nodes.content.innerHTML = this.data.content;

    const CollapseWrapperEl = make("div", this.CSS.collapseWrapper);
    const HeaderEl = make("div", this.CSS.header);

    const LabelEl = make("label", this.CSS.labelToggle, {
      "data-skip-plus-button": true,
    });

    const CollapseContentWrapper = make("div", this.CSS.content);

    this.api.listeners.on(LabelEl, "click", () => {
      if (this.isFolded) {
        clazz.add(CollapseContentWrapper, this.CSS.contentChecked);
        clazz.add(LabelEl, this.CSS.labelChecked);
        this.isFolded = false;
        // can not set innerHTML when the element is invisible
        this.nodes.content.innerHTML = this._data.content;
      } else {
        clazz.remove(CollapseContentWrapper, this.CSS.contentChecked);
        clazz.remove(LabelEl, this.CSS.labelChecked);
        this.isFolded = true;
      }
    });

    HeaderEl.appendChild(LabelEl);
    HeaderEl.appendChild(this.nodes.title);

    CollapseContentWrapper.appendChild(this.nodes.content);

    CollapseWrapperEl.appendChild(HeaderEl);
    CollapseWrapperEl.appendChild(CollapseContentWrapper);

    WrapperEl.appendChild(CollapseWrapperEl);

    return WrapperEl;
  }

  // setData() {
  // }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {DelimiterData} - saved data
   * @public
   */
  save(toolsContent) {
    return {
      title: this.nodes.title.innerHTML,
      content: this.nodes.content.innerHTML,
    };
  }
}
