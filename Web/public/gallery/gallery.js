(() => {
  const items = Array.isArray(window.galleryItems) ? window.galleryItems : [];
  const grid = document.querySelector("#gallery-grid");
  const count = document.querySelector("#gallery-count");
  const dialog = document.querySelector("#artwork-dialog");
  const dialogNumber = document.querySelector("#dialog-number");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogMeta = document.querySelector("#dialog-meta");
  const dialogImages = document.querySelector("#dialog-images");
  let activeItemId = null;

  const text = {
    en: {
      artist: "Artist",
      photographer: "Photographer",
      creator: "Creator",
      modeler: "3D artist",
      received: "Received",
      source: "From",
      commissioner: "Commissioned by",
      note: "Note",
      itemCount: (value) => `${value} records`,
      number: (value) => `No. ${value}`,
      title: (value) => `Artwork ${value}`,
      photoNumber: (value) => `Photo No. ${value}`,
      photoTitle: (value) => `Profile photo ${value}`,
      bannerNumber: (value) => `Banner No. ${value}`,
      bannerTitle: (value) => `Banner ${value}`,
      modelNumber: (value) => `3D model of Artwork ${value}`,
      modelTitle: (value) => `3D model of Artwork ${value}`,
      variants: (value) => `${value} versions`,
      open: (title, artist) => `Open ${title}${artist ? ` by ${artist}` : ""}`,
      close: "Close artwork details",
    },
    ko: {
      artist: "그려준 사람",
      photographer: "촬영자",
      creator: "제작자",
      modeler: "3D 제작자",
      received: "받은 날짜",
      source: "받은 경로",
      commissioner: "의뢰자",
      note: "설명",
      itemCount: (value) => `${value}개 기록`,
      number: (value) => `${value}번째 그림`,
      title: (value) => `${value}번째 그림`,
      photoNumber: (value) => `${value}번째 사진`,
      photoTitle: (value) => `${value}번째 사진`,
      bannerNumber: (value) => `${value}번째 배너`,
      bannerTitle: (value) => `${value}번째 배너`,
      modelNumber: (value) => `${value}번째 그림 · 3D 모델`,
      modelTitle: (value) => `${value}번째 그림 3D 모델`,
      variants: (value) => `${value}개 버전`,
      open: (title, artist) => `${artist ? `${artist}의 ` : ""}${title} 자세히 보기`,
      close: "그림 상세 닫기",
    },
  };

  const language = () => (document.documentElement.lang === "ko" ? "ko" : "en");

  function itemNumber(item, copy) {
    if (item.kind === "photo") return copy.photoNumber(item.number);
    if (item.kind === "banner") return copy.bannerNumber(item.number);
    if (item.kind === "model3d") return copy.modelNumber(item.number);
    return copy.number(item.number);
  }

  function itemTitle(item, copy) {
    if (item.kind === "photo") return copy.photoTitle(item.number);
    if (item.kind === "banner") return copy.bannerTitle(item.number);
    if (item.kind === "model3d") return copy.modelTitle(item.number);
    return copy.title(item.number);
  }

  function contributorLabel(item, copy) {
    if (item.kind === "photo") return copy.photographer;
    if (item.kind === "banner") return copy.creator;
    if (item.kind === "model3d") return copy.modeler;
    return copy.artist;
  }

  function formatDate(value, lang) {
    if (/^\d{4}$/.test(value)) return lang === "ko" ? `${value}년` : value;
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(Date.UTC(year, month - 1, day)));
  }

  function createMeta(label, value, className = "") {
    const wrapper = document.createElement("div");
    if (className) wrapper.className = className;
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    wrapper.append(term, description);
    return wrapper;
  }

  function renderGallery() {
    if (!grid || !count) return;
    const lang = language();
    const copy = text[lang];
    grid.replaceChildren();
    count.textContent = copy.itemCount(items.length);

    items.forEach((item) => {
      const card = document.createElement("button");
      card.className = "gallery-card";
      card.type = "button";
      card.dataset.galleryId = item.id;
      const title = itemTitle(item, copy);
      card.setAttribute("aria-label", copy.open(title, item.artist));

      const imageStage = document.createElement("span");
      imageStage.className = "gallery-card__image";
      const image = document.createElement("img");
      image.src = item.images[0].src;
      image.alt = `${title}${item.artist ? ` — ${item.artist}` : ""}`;
      image.loading = "lazy";
      image.decoding = "async";
      imageStage.append(image);

      const body = document.createElement("span");
      body.className = "gallery-card__body";
      const topline = document.createElement("span");
      topline.className = "gallery-card__topline";
      const number = document.createElement("span");
      number.className = "gallery-card__number";
      number.textContent = itemNumber(item, copy);
      topline.append(number);
      if (item.images.length > 1) {
        const variants = document.createElement("span");
        variants.className = "gallery-card__variants";
        variants.textContent = copy.variants(item.images.length);
        topline.append(variants);
      }

      const metadata = document.createElement("dl");
      metadata.className = "gallery-card__meta";
      const cardMetadata = [];
      if (item.artist) cardMetadata.push(createMeta(contributorLabel(item, copy), item.artist));
      if (item.received) {
        cardMetadata.push(createMeta(copy.received, formatDate(item.received, lang)));
      }
      if (item.source) cardMetadata.push(createMeta(copy.source, item.source[lang]));
      if (item.commission) {
        cardMetadata.push(createMeta(copy.commissioner, item.commission));
      }
      metadata.append(...cardMetadata);
      body.append(topline, metadata);
      card.append(imageStage, body);
      card.addEventListener("click", () => openDialog(item.id));
      grid.append(card);
    });
  }

  function renderDialog(item) {
    if (!dialogNumber || !dialogTitle || !dialogMeta || !dialogImages) return;
    const lang = language();
    const copy = text[lang];
    const title = itemTitle(item, copy);
    dialogNumber.textContent = itemNumber(item, copy);
    dialogTitle.textContent = title;
    const metadata = [];
    if (item.artist) metadata.push(createMeta(contributorLabel(item, copy), item.artist));
    if (item.received) {
      metadata.push(createMeta(copy.received, formatDate(item.received, lang)));
    }
    if (item.source) metadata.push(createMeta(copy.source, item.source[lang]));
    if (item.commission) metadata.push(createMeta(copy.commissioner, item.commission));
    if (item.note) metadata.push(createMeta(copy.note, item.note[lang], "dialog-meta__note"));
    dialogMeta.replaceChildren(...metadata);
    dialogImages.replaceChildren();

    item.images.forEach((entry) => {
      const figure = document.createElement("figure");
      figure.className = "dialog-image";
      const image = document.createElement("img");
      image.src = entry.src;
      image.alt = `${title} — ${entry.label[lang]}`;
      image.loading = "lazy";
      image.decoding = "async";
      const caption = document.createElement("figcaption");
      caption.textContent = entry.label[lang];
      figure.append(image, caption);
      dialogImages.append(figure);
    });

    const closeButton = dialog.querySelector("[data-dialog-close]");
    closeButton?.setAttribute("aria-label", copy.close);
  }

  function openDialog(itemId) {
    const item = items.find((candidate) => candidate.id === itemId);
    if (!item || !dialog) return;
    activeItemId = itemId;
    renderDialog(item);
    dialog.showModal();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    dialog?.querySelector("[data-dialog-close]")?.addEventListener("click", () => {
      dialog.close();
    });
    dialog?.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog?.addEventListener("close", () => {
      activeItemId = null;
    });
  });

  window.addEventListener("utilitypreferenceschange", () => {
    renderGallery();
    if (activeItemId) {
      const item = items.find((candidate) => candidate.id === activeItemId);
      if (item) renderDialog(item);
    }
  });
})();
