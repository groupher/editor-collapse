import { isLatinString, isString } from "@groupher/editor-utils";

import { MODE } from "./constant";

/**
 * generate uniq string
 *
 * @param {number: number, prefix: string}
 * @return {string}
 * @private
 */
export const randomStr = (length, prefix = "collapse_") => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return prefix + result;
};

/**
 * get cutFrom limit count
 *
 * @param {String} str
 * @return {Number}
 */
export const getCutLimitCount = (str) => {
  return isLatinString(str) ? 140 : 50;
};

/**
 * check if the given data is valid
 *
 * @param {ToolData} data
 * @return {Boolean}
 */
export const isValidData = (data) => {
  return (
    (data.mode === MODE.ROW || data.mode === MODE.COLUMN) &&
    data.title &&
    isString(data.title) &&
    data.content &&
    isString(data.content)
  );
};
