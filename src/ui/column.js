/**
 * Build styles
 */
import css from "../styles/column.css";
import { make, cutFrom, isLatinString, strLen } from "@groupher/editor-utils";

import ArrowIcon from "../icon/arrow.svg";
import ArrowUpIcon from "../icon/arrow_up.svg";

import { getCutLimitCount } from "../helper";
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

    this._data = data;

    this.nodes = {
      wrapper: make("div", [this.CSS.block, this.CSS.wrapper]),
      collapseWrapper: make("div", this.CSS.collapseWrapper),
      contentWrapper: make("div", this.CSS.content),
      toggleLabel: make("label", this.CSS.labelToggle, {
        innerHTML: `${ArrowIcon} 展开`,
        contentEditable: false,
      }),
      title: make("div", this.CSS.titleInput, {
        contentEditable: true,
        "data-skip-plus-button": true,
        innerHTML: this._data.title,
        placeholder: "折叠块标题",
      }),
      content: make("span", this.CSS.contentInner, {
        contentEditable: true,
        "data-skip-plus-button": true,
        innerHTML: cutFrom(
          this._data.content,
          getCutLimitCount(this._data.content)
        ),
        placeholder: "折叠块内容",
      }),
    };

    // not collapse at first only when empty
    this.isFolded = false;
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
    this.nodes.contentWrapper.appendChild(this.nodes.content);

    if (strLen(this._data.content) > getCutLimitCount(this._data.content)) {
      if (!this.nodes.toggleLabel) {
        this.nodes.toggleLabel = make("label", this.CSS.labelToggle, {
          contentEditable: false,
        });
      }
      // 必须展开才能编辑
      this._toggleContentEditable(false);
      this.nodes.contentWrapper.appendChild(this.nodes.toggleLabel);
      this._toggleExpandLabel(true, false);
    }

    this.api.listeners.on(this.nodes.content, "input", (e) => {
      const inputText = this.nodes.content.innerText;
      this._data.content = this.nodes.content.innerHTML;
      if (strLen(inputText) > getCutLimitCount(inputText)) {
        if (!this.nodes.toggleLabel) {
          this.nodes.toggleLabel = make("label", this.CSS.labelToggle, {
            contentEditable: false,
          });
        }
        this.nodes.contentWrapper.appendChild(this.nodes.toggleLabel);
        this._toggleExpandLabel(true, true);
      } else {
        this._toggleExpandLabel(false, true);
        this.nodes.toggleLabel.remove();
      }
    });

    this.api.listeners.on(this.nodes.toggleLabel, "click", () => {
      !this.isFolded ? this._unFoldContent() : this._foldContent();
    });

    this.nodes.collapseWrapper.appendChild(this.nodes.title);
    this.nodes.collapseWrapper.appendChild(this.nodes.contentWrapper);

    this.nodes.wrapper.appendChild(this.nodes.collapseWrapper);

    return this.nodes.wrapper;
  }

  /**
   * fold content
   *
   * @memberof ColumnCollapse
   */
  _foldContent() {
    this.nodes.content.innerHTML = cutFrom(
      this._data.content,
      getCutLimitCount(this._data.content)
    );
    this._toggleExpandLabel(true, false);
    this.nodes.content.appendChild(this.nodes.toggleLabel);
    this._toggleContentEditable(false);
  }

  /**
   * unfold content
   *
   * @memberof ColumnCollapse
   */
  _unFoldContent() {
    this.nodes.content.innerHTML = this._data.content;

    this._toggleExpandLabel(true, true);
    this.nodes.contentWrapper.appendChild(this.nodes.toggleLabel);
    this._toggleContentEditable(true);
  }

  /**
   * set label visible and up/down info
   *
   * @param {Boolean} visible
   * @param {Boolean}  collapse
   * @memberof ColumnCollapse
   */
  _toggleExpandLabel(visible, collapse) {
    const el = this.nodes.toggleLabel;
    el.style.display = visible ? "inline" : "none";

    if (collapse) {
      el.innerHTML = `${ArrowUpIcon} 收起`;
      this.isFolded = true;
    } else {
      el.innerHTML = `${ArrowIcon} 展开`;
      this.isFolded = false;
    }
  }

  /**
   * toggle content editable
   *
   * @param {Boolean} editable
   * @memberof ColumnCollapse
   */
  _toggleContentEditable(editable) {
    if (editable) {
      this.nodes.content.setAttribute("contentEditable", true);
      this.nodes.content.style.cursor = "text";
    } else {
      this.nodes.content.setAttribute("contentEditable", false);
      this.nodes.content.style.cursor = "pointer";
      this.api.listeners.on(this.nodes.content, "click", () => {
        if (!this.isFolded) this._unFoldContent();
      });
    }
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render(data) {
    this._data = data;
    return this.drawView();
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {DelimiterData} - saved data
   * @public
   */
  save(toolsContent) {
    return {
      title: this.nodes.title.value,
      content: this.nodes.content.innerHTML,
    };
  }
}
