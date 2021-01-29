import { isLatinString } from "@groupher/editor-utils";

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
