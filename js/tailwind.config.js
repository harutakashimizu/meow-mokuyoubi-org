// js/tailwind.config.js

tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        rounded: ["'M PLUS Rounded 1c'", "sans-serif"],
        pop: ["Fredoka", "sans-serif"],
      },
      colors: {
        bg: "#f0f9ff", // 全体背景（スカイブルー系）
        primary: "#0284c7", // メインブランドカラー（鮮やかなブルー）
        hover: "#0369a1", // ホバー時の濃いブルー
        light: "#e0f2fe", // 柔らかいライトブルー（ボタンや枠）
        lighter: "#bae6fd", // さらに明るいブルー
        sub: "#38bdf8", // サブアクセント（ヘッダーサブタイトル等）
        accent: "#fb923c", // テープ用オレンジアクセント
        card: "#ffffff", // カード背景（白）
        text: "#334155", // 通常テキスト（スレート）
        darkText: "#0f172a", // 見出し・強調テキスト
        bodyText: "#475569", // 本文テキスト
        muted: "#94a3b8", // 補足・読み込み中テキスト
        border: "#bae6fd", // ポップな影・枠線用カラー
      },
      boxShadow: ({ theme }) => ({
        "pop-card": `6px 6px 0px ${theme("colors.border")}`,
        "pop-photo": `4px 4px 0px ${theme("colors.border")}`,
      }),
    },
  },
};
