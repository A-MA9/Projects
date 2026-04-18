(() => {
  const THEME_STORAGE_KEY = "stillroom-theme";
  const OPP_STORAGE_KEY = "stillroom-opp-enabled";
  const DARK_THEME = "dark";
  const LIGHT_THEME = "light";

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const oppToggle = document.getElementById("oppToggle") || document.getElementById("torchToggle");
  const oppButtonLabel = oppToggle?.id === "torchToggle" ? "Torch" : "OPP";

  const state = {
    theme: LIGHT_THEME,
    oppEnabled: false,
    pointerX: -9999,
    pointerY: -9999,
    renderX: -9999,
    renderY: -9999,
    rafId: 0
  };

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === DARK_THEME || saved === LIGHT_THEME) {
        return saved;
      }
    } catch (error) {
      return null;
    }

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return DARK_THEME;
    }

    return LIGHT_THEME;
  }

  function setTheme(theme) {
    state.theme = theme;
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
      const isDark = theme === DARK_THEME;
      themeToggle.textContent = isDark ? "Light" : "Dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // Ignore storage failures in restricted browsing contexts.
    }
  }

  function toggleTheme() {
    setTheme(state.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME);
  }

  function ensureOppCursor() {
    let cursor = document.getElementById("oppCursor");
    if (!cursor) {
      cursor = document.createElement("div");
      cursor.id = "oppCursor";
      cursor.setAttribute("aria-hidden", "true");
      document.body.appendChild(cursor);
    }
    return cursor;
  }

  function renderOppButton() {
    if (!oppToggle) {
      return;
    }

    oppToggle.setAttribute("aria-pressed", String(state.oppEnabled));
    oppToggle.textContent = state.oppEnabled ? `${oppButtonLabel} On` : oppButtonLabel;
    oppToggle.setAttribute(
      "aria-label",
      state.oppEnabled ? `Turn off ${oppButtonLabel.toLowerCase()} cursor effect` : `Turn on ${oppButtonLabel.toLowerCase()} cursor effect`
    );
  }

  function updateCursorPosition() {
    const cursor = document.getElementById("oppCursor");
    if (!cursor || !state.oppEnabled) {
      return;
    }

    if (state.renderX === -9999 || state.renderY === -9999) {
      state.renderX = state.pointerX;
      state.renderY = state.pointerY;
    }

    const easing = 0.22;
    state.renderX += (state.pointerX - state.renderX) * easing;
    state.renderY += (state.pointerY - state.renderY) * easing;

    cursor.style.transform = `translate(${state.renderX}px, ${state.renderY}px) translate(-50%, -50%)`;
    state.rafId = requestAnimationFrame(updateCursorPosition);
  }

  function startOppEngine() {
    if (!state.rafId) {
      state.rafId = requestAnimationFrame(updateCursorPosition);
    }
  }

  function stopOppEngine() {
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
      state.rafId = 0;
    }
  }

  function setOppEnabled(enabled) {
    state.oppEnabled = enabled;

    ensureOppCursor();
    root.classList.toggle("opp-enabled", enabled);
    renderOppButton();

    try {
      localStorage.setItem(OPP_STORAGE_KEY, String(enabled));
    } catch (error) {
      // Ignore storage failures in restricted browsing contexts.
    }

    if (enabled) {
      state.renderX = state.pointerX;
      state.renderY = state.pointerY;
      startOppEngine();
    } else {
      stopOppEngine();
    }
  }

  function toggleOpp() {
    setOppEnabled(!state.oppEnabled);
  }

  function installPointerTracking() {
    window.addEventListener("pointermove", (event) => {
      state.pointerX = event.clientX;
      state.pointerY = event.clientY;
    });

    window.addEventListener("pointerleave", () => {
      state.pointerX = -9999;
      state.pointerY = -9999;
    });
  }

  function getSavedOppState() {
    try {
      return localStorage.getItem(OPP_STORAGE_KEY) === "true";
    } catch (error) {
      return false;
    }
  }

  function bindUI() {
    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }

    if (oppToggle) {
      oppToggle.addEventListener("click", toggleOpp);
    }
  }

  function init() {
    installPointerTracking();
    bindUI();
    setTheme(getSavedTheme());
    setOppEnabled(getSavedOppState());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
