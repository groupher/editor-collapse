/**
 * Build styles
 */
import css from "./index.css";

import penIcon from "./icon/pen.svg";
import coffeeIcon from "./icon/coffee.svg";
import planetIcon from "./icon/planet.svg";
import keyboardIcon from "./icon/keyboard.svg";
import moonIcon from "./icon/moon.svg";
// import barsaIcon from './icon/barcelona.svg'
import footIcon from "./icon/foot.svg";

/**
 * Delimiter Block for the Editor.js.
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
   * Allow Tool to have no content
   * @return {boolean}
   */
  static get contentless() {
    return true;
  }

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

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "cdx-collapse"
    };

    this.data = {
      title: data.title || "",
      content: data.content || ""
    };

    this.defaultIconName = "pen";

    this.TitleInput = null;
    this.CollapseContent = null;

    this._element = this.drawView();
    this.data = data;
  }

  /**
   * generate uniq string
   *
   * @param {number: number, prefix: string}
   * @return {string}
   * @private
   */
  randomStr(length, prefix = "collapse_") {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return prefix + result;
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    const Wrapper = this._make("DIV", [this._CSS.block, this._CSS.wrapper], {
      // innerHTML: `
      // <div class="wrap-collabsible">
      //   <input id="collapsible" class="toggle" type="checkbox">
      //   <label for="collapsible" class="cdx-collapse-toggle">为什么 coderplanets 的一些问题</label>
      //   <div class="collapsible-content">
      //     <div class="content-inner">
      //       这其中的问题不是简单的开源问题，而设计。这其中的问题不是简单的开源问题，而设计。这其中的问题不是简单的开源问题，而设计。这其中的问题不是简单的开源问题，而设计。这其中的问题不是简单的开源问题，而设计。
      //       QUnit is by calling one of the object that are embedded in JavaScript, and faster JavaScript program could also used with
      //       its elegant, well documented, and functional programming using JS, HTML pages Modernizr is a popular browsers without
      //       plug-ins. Test-Driven Development.
      //     </div>
      //   </div>
      // </div>
      // `
    });
    const uid = this.randomStr(4);

    const CollapsibleWrapper = this._make("div", ["wrap-collabsible"]);
    const InputAnchor = this._make("input", ["toggle"], {
      type: "checkbox",
      id: uid
    });

    this.TitleInput = this._make("input", ["cdx-collapse-title-input"]);
    this.TitleInput.value = this.data.title;
    this.TitleInput.placeholder = "标题内容...";

    const Label = this._make("label", ["cdx-collapse-toggle"]);
    Label.setAttribute("for", uid);
    // Label.innerText = "关于场地的一些问题以及解答";
    Label.appendChild(this.TitleInput);

    const CollapseContentWrapper = this._make("div", ["collapsible-content"]);
    this.CollapseContent = this._make("div", ["content-inner"], {
      contentEditable: true
    });
    this.CollapseContent.innerHTML = this.data.content;
    this.CollapseContent.setAttribute("placeholder", "填写内容...");

    CollapseContentWrapper.appendChild(this.CollapseContent);

    CollapsibleWrapper.appendChild(InputAnchor);
    CollapsibleWrapper.appendChild(Label);
    CollapsibleWrapper.appendChild(CollapseContentWrapper);

    Wrapper.appendChild(CollapsibleWrapper);

    return Wrapper;
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
      content: this.CollapseContent.innerHTML
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
      title: "折叠块 (Collapse)"
    };
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {array|string} classNames  - list or name of CSS classname(s)
   * @param  {Object} attributes        - any attributes
   * @return {Element}
   */
  _make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}
