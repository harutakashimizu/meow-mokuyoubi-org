// js/header.js

// ファビコンを動的にセットする関数だにゃ！
function setFavicon() {
  // すでにファビコンのタグがあればそれを使うし、なければ新しく作っておもちゃ箱(<head>)に入れるにゃ！
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%230284c7'/></svg>";
}

async function loadHeader() {
  const container = document.getElementById("header-container");
  if (!container) return;

  try {
    const response = await fetch("./header.html");
    if (response.ok) {
      container.innerHTML = await response.text();
      initScrollHeader();
    }
  } catch (error) {
    console.error("ヘッダーの読み込みに失敗したにゃ:", error);
  }
}

function initScrollHeader() {
  const header = document.getElementById("site-header");
  const title = document.getElementById("header-title");
  const subtitle = document.getElementById("header-subtitle");
  const container = document.getElementById("header-container");

  if (!header || !title || !subtitle || !container) return;

  // 固定ヘッダーの高さ分、コンテンツが下にズレるようにスペーサーの高さを確保するにゃ
  const updateSpacerHeight = () => {
    container.style.paddingTop = `${header.offsetHeight}px`;
  };

  updateSpacerHeight();
  window.addEventListener("resize", updateSpacerHeight);

  window.addEventListener("scroll", () => {
    // 20px以上スクロールされたら縮小モードにするにゃ
    if (window.scrollY > 20) {
      header.classList.remove("py-4");
      header.classList.add(
        "py-2",
        "shadow-sm",
        "border-b",
        "border-[#bae6fd]/50",
      );

      title.classList.remove("text-4xl", "sm:text-5xl");
      title.classList.add("text-2xl");

      // サブタイトルをすっと消すにゃ
      subtitle.classList.remove("max-h-10", "opacity-100", "mt-0");
      subtitle.classList.add("max-h-0", "opacity-0");
    } else {
      // 一番上に戻ったら元通りにするにゃ
      header.classList.remove(
        "py-2",
        "shadow-sm",
        "border-b",
        "border-[#bae6fd]/50",
      );
      header.classList.add("py-4");

      title.classList.remove("text-2xl");
      title.classList.add("text-4xl", "sm:text-5xl");

      subtitle.classList.remove("max-h-0", "opacity-0");
      subtitle.classList.add("max-h-10", "opacity-100");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setFavicon(); // ファビコンのセットだにゃ♫
  loadHeader(); // ヘッダーの読み込みだにゃ♫
});