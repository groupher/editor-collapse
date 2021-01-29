import { make } from "@groupher/editor-utils";
/**
 * Build styles
 */
import css from "./styles/index.css";
import { MODE } from "./constant";

import RowModeIcon from "./icon/row_mode.svg";
import ColumnModeIcon from "./icon/column_mode.svg";

import UI from "./ui/index";
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

    // this._data = data;
    this._data = {
      mode: "row", // column
      title: "非常劲爆",
      content:
        "主打「轻快无边界」的 ColorOS 7 在 UI、动效和声效体验构建上精雕细琢，效率功能和系统优化上的优化也是可圈可点。主打「轻快无边界」的 ColorOS 7 在 UI、动效和声效体验构建上精雕细琢，效率功能和系统优化上的优化也是可圈可点。主打「轻快无边界」的 ColorOS 7 在 UI、动效和声效体验构建上精雕细琢 end 。",
    };

    this.ui = new UI({ data: this._data, api });
  }

  /**
   * Allow to press Enter inside the Header input
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return false;
  }

  /**
   * @return {object} - Collapse Tool styles
   * @constructor
   */
  get CSS() {
    return {
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive,
    };
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    return this.ui.render(this._data);
  }

  /**
   * render Setting buttons
   * @public
   */
  renderSettings() {
    const Wrapper = make("div");

    const settings = [
      {
        title: "展开模式",
        action: MODE.ROW,
        icon: RowModeIcon,
      },
      {
        title: "预览模式",
        action: MODE.COLUMN,
        icon: ColumnModeIcon,
      },
    ];

    settings.forEach((item) => {
      const ItemEl = make("div", this.CSS.settingsButton, {
        innerHTML: item.icon,
      });

      if (item.action === MODE.ROW) {
        this._data.mode === MODE.ROW
          ? ItemEl.classList.add(this.CSS.settingsButtonActive)
          : ItemEl.classList.remove(this.CSS.settingsButtonActive);
      }

      if (item.action === MODE.COLUMN) {
        this._data.mode === MODE.COLUMN
          ? ItemEl.classList.add(this.CSS.settingsButtonActive)
          : ItemEl.classList.remove(this.CSS.settingsButtonActive);
      }

      ItemEl.addEventListener("click", () => {
        // this.ui.handleSettingAction(item.action);
      });

      this.api.tooltip.onHover(ItemEl, item.title, {
        placement: "top",
      });

      Wrapper.appendChild(ItemEl);
    });

    return Wrapper;
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
