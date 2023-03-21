function chevron_button(text) {
  return `
        <button>
            <span class="icon-chevron" aria-hidden="true">
              <svg viewBox="0 0 1024 661" xmlns="http://www.w3.org/2000/svg"><path d="m459.2 639.05c28.8 28.79 76.8 28.79 105.6 0l435.2-435.05c32-32 32-80 0-108.77l-70.4-73.64c-32-28.79-80-28.79-108.8 0l-310.4 310.33-307.2-310.33c-28.8-28.79-76.8-28.79-108.8 0l-70.4 73.59c-32 28.82-32 76.82 0 108.82z"/></svg>
            </span>
            <span class="sr-only">Toggle submenu for ${text}</span>
        </button>
    `;

}