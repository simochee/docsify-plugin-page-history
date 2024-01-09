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
 * メッセージを正規化する
 * @param {string | string[]} message
 * @returns {string}
 */
export const normalizeMessage = (message) => {
  if (Array.isArray(message)) {
    return message.join(" ");
  }

  return message;
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

    return (
      input
        .filter((item) => typeof item === "object" && item !== null)
        // 日付を大きい順に並び替える
        .sort(({ date: x }, { date: y }) => {
          if (x instanceof Date) {
            if (y instanceof Date) {
              return y - x > 0 ? 1 : -1;
            }
            return -1;
          }
          return 1;
        })
        .map(({ date, message }) => {
          return {
            date: formatDate(date),
            message: normalizeMessage(message),
          };
        })
    );
  } catch (err) {
    console.error(err);

    return [];
  }
};