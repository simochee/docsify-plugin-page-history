import { collectHistory } from "./collect.js";
import { parseHistory, msg } from "./utils.js";
import htm from "htm/mini";
import vhtml from "vhtml";

const html = htm.bind(vhtml);

/** プラグインをインストール */
const install = (hook, vm) => {
  // ページに履歴を追加
  hook.afterEach((content) => {
    if (!vm.frontmatter) {
      console.warn(
        msg(
          "before install official front matter plugin. see https://www.npmjs.com/package/docsify-plugin-page-history#install",
        ),
      );

      return content;
    }

    const history = parseHistory(vm.frontmatter.history);
    const lastModified = history[0]?.date;

    const details = html`
      <details class="docsify-page-history">
        <summary>
          ${lastModified ? `Last modified at ${lastModified}` : "No history"}
        </summary>
        ${history.length
          ? html`
              <dl>
                ${history.map(
                  ({ date, message }) => html`
                    <dt><strong>${date}</strong></dt>
                    <dd
                      dangerouslySetInnerHTML=${{
                        __html: marked(message, { breaks: true }),
                      }}
                    />
                  `,
                )}
              </dl>
            `
          : html`<p>There is no history for this page.</p>`}
      </details>
    `;

    return `${content}${details}`;
  });

  // @[page-history] を履歴一覧に置換
  hook.beforeEach((content) => {
    return content.replace(
      /(?:^|\n)@\[page-history\](?:$|\n)/g,
      '\n<div class="docsify-page-history-list"></div>\n',
    );
  });

  hook.doneEach(async () => {
    const elms = document.getElementsByClassName("docsify-page-history-list");

    if (!elms.length === 0) return;

    const history = await collectHistory(vm.router);

    for (const el of elms) {
      el.innerHTML = html`
        <ul>
          ${history.map(
            ({ date, items }) => html`
              <li>
                <strong>${date}</strong>
                <ul>
                  ${items.map(
                    ({ path, title, message }) => html`
                      <li>
                        <a href="${vm.router.toURL(path)}" title="${message}">
                          ${title}
                        </a>
                      </li>
                    `,
                  )}
                </ul>
              </li>
            `,
          )}
        </ul>
      `;
    }
  });
};

$docsify.plugins = [].concat(install, $docsify.plugins);
