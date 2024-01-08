import { formatDate } from "./utils.js";
import fm from "front-matter";

const getAllPaths = (router) => {
  const paths = Docsify.dom
    .findAll(".sidebar-nav a")
    .map((node) => {
      const originHref = node.getAttribute("href");
      const { path } = router.parse(node.href);
      const title = node.textContent;

      if (!path || Docsify.util.isAbsolutePath(originHref)) {
        return;
      }

      return {
        path,
        title,
      };
    })
    .filter(Boolean);

  return [...new Set(paths)];
};

export const collectHistory = async (router) => {
  const paths = getAllPaths(router);
  const data = await Promise.all(
    paths.map(async ({ path, title }) => {
      try {
        const md = await Docsify.get(router.getFile(path));
        const { attributes } = fm(md);

        return attributes.history.map(({ date, message }) => ({
          path,
          date: formatDate(date),
          title,
          message,
        }));
      } catch {
        return;
      }
    }),
  );
  const history = data.filter(Boolean).flat();
  const dates = [...new Set(history.map(({ date }) => date))].sort().reverse();

  return dates.map((date) => {
    const items = history.filter((item) => item.date === date);

    return {
      date,
      items,
    };
  });
};
