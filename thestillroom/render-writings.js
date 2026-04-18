(() => {
  const writings = Array.isArray(window.STILLROOM_WRITINGS)
    ? [...window.STILLROOM_WRITINGS].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  function createArticleItem(item) {
    const li = document.createElement("li");
    li.className = "article-item";

    const title = document.createElement("p");
    title.className = "article-title";

    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.title;
    title.appendChild(link);

    const description = document.createElement("p");
    description.className = "article-description";
    description.textContent = item.description;

    const date = document.createElement("p");
    date.className = "article-date ui";
    date.textContent = item.dateLabel;

    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(date);

    return li;
  }

  function renderHomeRecent() {
    const list = document.getElementById("recentWritings");
    if (!list) {
      return;
    }

    list.innerHTML = "";
    writings.forEach((item) => list.appendChild(createArticleItem(item)));
  }

  function renderArchive() {
    const container = document.getElementById("archiveContent");
    if (!container) {
      return;
    }

    container.innerHTML = "";

    const groups = writings.reduce((acc, item) => {
      const year = new Date(item.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});

    Object.keys(groups)
      .sort((a, b) => Number(b) - Number(a))
      .forEach((year) => {
        const section = document.createElement("section");
        section.className = "year-block";

        const heading = document.createElement("h2");
        heading.className = "year-heading ui";
        heading.textContent = year;

        const list = document.createElement("ol");
        list.className = "article-list";

        groups[year].forEach((item) => list.appendChild(createArticleItem(item)));

        section.appendChild(heading);
        section.appendChild(list);
        container.appendChild(section);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      renderHomeRecent();
      renderArchive();
    });
  } else {
    renderHomeRecent();
    renderArchive();
  }
})();
