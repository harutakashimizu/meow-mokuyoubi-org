// js/parser.js

export function parseMyText(text) {
  if (!text) return "";

  return (
    text
      .trim()
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

      // 3. 太字 (**文字**)
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold text-[#0284c7] bg-[#e0f2fe]/60 px-1 rounded">$1</strong>',
      )

      // 4. [js:ファイル名] 埋め込み
      .replace(
        /\[js:(.*?)\]/g,
        '<div id="game-container" class="my-8 p-6 bg-[#f0f9ff] rounded-2xl text-center border border-[#bae6fd]"></div><script type="module" src="./js/games/$1.js"></script>',
      )

      // 5. 画像タグ
      .replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<img src="$2" alt="$1" class="w-full max-w-[600px] max-h-[350px] object-contain rounded-2xl my-4 shadow-sm border border-[#e0f2fe]" loading="lazy">',
      )

      // 6. 改行
      .replace(/\n/g, "<br>")

      // 箇条書き補正
      .replace(
        /(<li.*?>.*?<\/li>)/gs,
        '<ul class="my-4 space-y-1 bg-[#f8fafc] p-4 rounded-xl">$1</ul>',
      )
  );
}
