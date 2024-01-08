export const msg = (message) => `[docsify-plugin-page-history] ${message}`;

/**
 * @typedef {object} History
 * @property {string | Date} date
 * @property {string} message
 */

/**
 * 数字を2桁になるようゼロ埋めする
 * @param {number} num
 * @returns {string}
 */
const zeroPad = (num) => {
  return num.toString().padStart(2, "0");
};

/**
 * 日付を YYYY-MM-DD 形式に変換する
 * @param {Date | string} date
 * @returns {string}
 */
export const formatDate = (date) => {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${zeroPad(month)}-${zeroPad(day)}`;
  }

  return date;
};

/**
 * 履歴をパースする
 * @param {History[]} input
 * @returns {History[]}
 */
export const parseHistory = (input) => {
  try {
    if (!input) return [];

    if (!Array.isArray(input)) {
      throw TypeError(msg('"history" must be an array'));
    }

    return input
      .filter((item) => typeof item === "object" && item !== null)
      .map((item) => {
        return {
          date: formatDate(item.date),
          message: item.message,
        };
      });
  } catch (err) {
    console.error(err);

    return [];
  }
};
