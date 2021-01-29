/**
 * Build styles
 */
import css from "../styles/collapse.css";
import { make } from "@groupher/editor-utils";

import Collapse from "./collapse";
import Column from "./column";

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
export default class UI {
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

    this.collapse = new Collapse({ data, api });
    this.column = new Column({ data, api });
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render(data) {
    // return this.collapse.render();
    return this.column.render(data);
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {DelimiterData} - saved data
   * @public
   */
  save(toolsContent) {
    return {
      // title: this.TitleInput.value,
      // content: this.CollapseContent.innerHTML,
    };
  }
}
