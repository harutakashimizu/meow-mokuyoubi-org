// js/parser.js

export function parseMyText(text) {
  if (!text) return "";

  return (
    text
      .trim()
      // --- $$...$$ で囲むと数式を大きく強調表示 ---
      .replace(
        /\$\$(.*?)\$\$/g,
        '<span class="inline-block text-xl font-semibold bg-[#f0f9ff] text-[#0284c7] px-3 py-2 my-1 align-middle rounded-lg border border-[#bae6fd]">$1</span>',
      )

      // --- ^ ^ を右上（指数・<sup>）にするルール ---
      .replace(/\^([^\^]+)\^/g, "<sup>$1</sup>")

      // --- _ _ を右下（下付き・<sub>）にするルール ---
      .replace(/_([^_]+)_/g, "<sub>$1</sub>")

      // 1. 見出し (## / ###)
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-bold text-[#0284c7] mt-8 mb-4 pb-2 border-b-2 border-[#e0f2fe] flex items-center gap-2"><span class="text-[#38bdf8]">●</span> $1</h2>',
      )
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-bold text-[#0369a1] mt-6 mb-2">$1</h3>',
      )

      // 2. 箇条書き (* アイテム)
      .replace(
        /^\* (.*$)/gim,
        '<li class="ml-5 list-disc text-[#475569] my-1">$1</li>',
      )

      // 連続する <li> を1つの <ul> で丸ごと囲むにゃん♫
      .replace(
        /((?:<li.*?>.*?<\/li>\n?)+)/g,
        '<ul class="my-4 space-y-1 bg-[#f8fafc] p-4 rounded-xl">$1</ul>',
      )

      // 3. 太字 (**文字**)
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold text-[#0284c7] bg-[#e0f2fe]/60 px-1 rounded">$1</strong>',
      )

      // 4. [js:ファイル名] 埋め込み (ゲーム実行用)
      .replace(
        /\[js:(.*?)\]/g,
        '<div id="game-container" class="my-8 p-6 bg-[#f0f9ff] rounded-2xl text-center border border-[#bae6fd]"></div><script type="module" src="./js/games/$1.js"></script>',
      )

      // 4.5. 【追加】[link-js:ファイル名] または [link-js:ファイル名|表示文字] でファイルへのリンク作成
.replace(
        /\[link-js:([^\]|]+)(?:\|([^\]]+))?\]/g,
        (match, file, label) => {
          // 「5.js」や「5」から、数字の「5」だけを取り出す（.js が付いてても削除する）
          const postId = file.replace(/\.js$/, '');
          const displayText = label || file;

          // post.html?id=5 のように記事ページへ飛ばす
          return `<a href="./post.html?id=${postId}" class="text-[#0284c7] font-semibold underline hover:text-[#0369a1] px-1 bg-[#e0f2fe]/40 rounded">${displayText}</a>`;
        }
      )

      // 5. 画像タグ
      .replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<img src="$2" alt="$1" class="w-full max-w-[600px] max-h-[350px] object-contain rounded-2xl my-4 shadow-sm border border-[#e0f2fe]" loading="lazy">',
      )

      // 6. URLの自動リンク化
      .replace(
        /(?<!src=")(https?:\/\/[^\s<]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#0284c7] underline hover:text-[#0369a1]">$1</a>',
      )

      // 7. 最後に改行を <br> にする（ブロック要素の後だけ除外する）
      .replace(/(?<!<\/h[23]>|<\/ul>|<\/div>)\n/g, "<br>")
  );
}