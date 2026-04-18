const writings = Array.isArray(window.STILLROOM_WRITINGS) ? window.STILLROOM_WRITINGS : [];

const button = document.getElementById("wanderButton");
const result = document.getElementById("wanderResult");

button?.addEventListener("click", () => {
  if (!writings.length) {
    return;
  }

  const pick = writings[Math.floor(Math.random() * writings.length)];

  result.innerHTML = [
    `<p class="article-title"><a href="${pick.href}">${pick.title}</a></p>`,
    `<p class="article-description">${pick.description}</p>`,
    `<p class="article-date ui">${pick.dateLabel}</p>`
  ].join("");

  result.classList.add("is-visible");
});
