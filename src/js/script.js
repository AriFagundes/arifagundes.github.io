"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
// const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
// sidebarBtn.addEventListener("click", function () {
//   elementToggleFunc(sidebar);
// });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]",
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]",
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Seleciona todas as imagens e os overlays
const overlays = document.querySelectorAll(".zoom-overlay");

// FunÃ§Ã£o para esconder o overlay ao clicar fora da imagem
overlays.forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    this.style.display = "none"; // Esconde o overlay ao clicar fora da imagem
  });
});

// FunÃ§Ã£o para exibir o overlay ao passar o mouse por cima da imagem
document.querySelectorAll(".clients-item").forEach((item) => {
  item.addEventListener("mouseover", function () {
    const overlay = this.querySelector(".zoom-overlay");
    overlay.style.display = "flex"; // Exibe o overlay ao passar o mouse
  });

  // FunÃ§Ã£o para esconder o overlay ao tirar o mouse de cima da imagem
  item.addEventListener("mouseleave", function () {
    const overlay = this.querySelector(".zoom-overlay");
    overlay.style.display = "none"; // Esconde o overlay ao tirar o mouse
  });
});

// Typewriter Effect
const typeWriterElements = document.querySelectorAll("[data-writing]");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const typeWriter = async (element, text, speed = 25, clear = true) => {
  if (clear) element.textContent = "";
  element.style.opacity = "1";
  element.classList.add("typing");
  for (let i = 0; i < text.length; i++) {
    element.textContent += text.charAt(i);
    await sleep(speed + Math.random() * 15);
  }
  element.classList.remove("typing");
};

const eraseEffect = async (element, speed = 3, targetLength = 0) => {
  element.classList.add("typing");
  let text = element.textContent;
  while (text.length > targetLength) {
    text = text.slice(0, -1);
    element.textContent = text;
    await sleep(speed);
  }
  element.classList.remove("typing");
};

const initTypewriter = async () => {
  const isEnglish = document.documentElement.lang === "en";
  const introMsg = isEnglish ? "Hi, I'm Ari and I have a thirst for knowledge" : "Oi, me chamo Ari e tenho fome de conhecimento";
  if (typeWriterElements.length > 0) {
    const firstEl = typeWriterElements[0];
    const finalFirstText = firstEl.textContent.replace(/\s+/g, ' ').trim();
    await typeWriter(firstEl, introMsg, 45);
    await sleep(1200);
    await eraseEffect(firstEl, 5);
    await sleep(400);
    await typeWriter(firstEl, finalFirstText, 20);
    if (typeWriterElements.length > 1) {
      const secondEl = typeWriterElements[1];
      const secondText = secondEl.textContent.replace(/\s+/g, ' ').trim();
      secondEl.textContent = "";
      secondEl.style.opacity = "1";
      if (isEnglish) {
        await typeWriter(secondEl, "Graudated", 30);
        await sleep(600);
        await eraseEffect(secondEl, 8, 3);
        await sleep(200);
        await typeWriter(secondEl, secondText.slice(3), 20, false);
      } else {
        await typeWriter(secondEl, "Graudado", 30);
        await sleep(600);
        await eraseEffect(secondEl, 8, 3);
        await sleep(200);
        await typeWriter(secondEl, secondText.slice(3), 20, false);
      }
    }
    for (let i = 2; i < typeWriterElements.length; i++) {
      const text = typeWriterElements[i].textContent.replace(/\s+/g, ' ').trim();
      await typeWriter(typeWriterElements[i], text, 18);
    }
  }
};

window.addEventListener("DOMContentLoaded", initTypewriter);

const initCustomItemTooltips = () => {
  const tooltipItems = document.querySelectorAll(".skills .item, .tools .item");
  tooltipItems.forEach((item) => {
    const tooltipText = item.getAttribute("title");
    if (!tooltipText) return;
    item.setAttribute("data-tooltip", tooltipText);
    item.removeAttribute("title");
    if (!item.hasAttribute("tabindex")) item.setAttribute("tabindex", "0");

    if (!item.querySelector(".item-tooltip")) {
      const tooltip = document.createElement("span");
      tooltip.className = "item-tooltip";
      tooltip.textContent = tooltipText;
      item.appendChild(tooltip);
    }
  });
};

window.addEventListener("DOMContentLoaded", initCustomItemTooltips);

const initCertificatesScrollAnimation = () => {
  const certificateSection = document.querySelector(".certificados");
  if (!certificateSection) return;

  const certificateItems = certificateSection.querySelectorAll(".item");
  if (certificateItems.length === 0) return;

  certificateSection.classList.add("cert-animate-ready");
  certificateItems.forEach((item, index) => {
    if (!item.querySelector(".cert-item-label")) {
      const label = document.createElement("span");
      label.className = "cert-item-label";
      const tooltipEl = item.querySelector(".item-tooltip");
      const rawText = Array.from(item.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent || "")
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      label.textContent = rawText;

      Array.from(item.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) item.removeChild(node);
      });

      if (tooltipEl) {
        item.insertBefore(label, tooltipEl);
      } else {
        item.appendChild(label);
      }
    }
    item.style.setProperty("--cert-delay", `${index * 420}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      certificateSection.classList.add("cert-in-view");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -8% 0px",
  });

  observer.observe(certificateSection);
};

window.addEventListener("DOMContentLoaded", initCertificatesScrollAnimation);

const aiChatText = document.getElementById("ai-chat-text");
const aiInputWrapper = document.getElementById("ai-input-wrapper");
const aiQuestionInput = document.getElementById("ai-question");
const aiAskBtn = document.getElementById("ai-ask-btn");

const normalize = (str) => str.toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

// intents loaded from intents.js

const WA_LINK = "https://wa.me/5547996444679?text=Oi%20Ari%2C%20a%20sua%20IA%20disse%20que%20voc%C3%AA%20%C3%A9%20o%20cara%21";
const WA_LINK_EN = "https://wa.me/5547996444679?text=Hi%20Ari%2C%20your%20AI%20said%20you%20are%20the%20one%21";

const findIntent = (question) => {
  const q = normalize(question);
  for (const intent of intents) {
    if (intent.keywords.some(k => q.includes(k))) return intent;
  }
  return null;
};

const navigateToPage = (pageName) => {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const pgs = document.querySelectorAll("[data-page]");
  for (let i = 0; i < pgs.length; i++) {
    if (pgs[i].dataset.page === pageName) {
      pgs[i].classList.add("active");
      navLinks[i].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pgs[i].classList.remove("active");
      navLinks[i].classList.remove("active");
    }
  }
};

const handleAIInteraction = async () => {
  const isEnglish = document.documentElement.lang === "en";
  const introText = isEnglish
    ? "Hi, I'm Ari's Assistant and I know all his secrets. Want to ask something like \"Tell me about him\" Shhh, he won't find out, I promise!"
    : "Oi, eu sou a Assistente do Ari e sei todos os segredos dele. Quer perguntar algo tipo \"Me conta sobre ele\" Psiiiu, ele n\u00e3o vai ficar sabendo, prometo!";

  if (aiChatText) {
    aiChatText.textContent = introText;
    if (aiInputWrapper) aiInputWrapper.style.display = "flex";
  }

  if (aiAskBtn) {
    const processQuestion = async () => {
      const question = aiQuestionInput.value.trim();
      if (!question) return;

      aiInputWrapper.style.display = "none";
      await eraseEffect(aiChatText, 2);

      const intent = findIntent(question);
      const answer = intent
        ? (isEnglish ? intent.en : intent.pt)
        : (isEnglish ? "Uhmmm... I think he hasn't told me that yet, you'll have to ask him yourself on WhatsApp!" : "Uhmmm... eu acho que isso ele n\u00e3o me contou, voc\u00ea ter\u00e1 que perguntar para ele mesmo l\u00e1 no WhatsApp!");
      const isFallback = !intent;

      aiChatText.classList.add("typing");
      await typeWriter(aiChatText, answer, 20);
      aiChatText.classList.remove("typing");

      if (isFallback) {
        const suggestions = isEnglish
          ? ["What are Ari's hobbies?","What project marked his career?","What's his experience level?","Does he know networking?"]
          : ["Quais os hobbies do Ari?","Qual projeto marcou a carreira dele?","Qual o n\u00edvel de experi\u00eancia?","Ele tem experi\u00eancia com redes?"];
        const sugWrap = document.createElement("div");
        sugWrap.className = "ai-suggestions";
        suggestions.forEach(s => {
          const btn = document.createElement("button");
          btn.className = "ai-sug-btn";
          btn.textContent = s;
          btn.addEventListener("click", () => { aiQuestionInput.value = s; processQuestion(); });
          sugWrap.appendChild(btn);
        });
        aiChatText.appendChild(document.createElement("br"));
        aiChatText.appendChild(sugWrap);
        const waBtn = document.createElement("a");
        waBtn.href = isEnglish ? WA_LINK_EN : WA_LINK;
        waBtn.target = "_blank";
        waBtn.className = "ai-wa-btn";
        waBtn.innerHTML = '<ion-icon name="logo-whatsapp"></ion-icon> <span>' + (isEnglish ? "Talk to him on WhatsApp" : "Falar com ele no WhatsApp") + '</span>';
        aiChatText.appendChild(waBtn);
        await sleep(1500);
        aiInputWrapper.style.display = "flex";
      } else {
        if (intent.page) {
          const navBtn = document.createElement("button");
          navBtn.className = "ai-wa-btn";
          navBtn.innerHTML = '<ion-icon name="arrow-forward-outline"></ion-icon> <span>' + (isEnglish ? intent.pageLabelEn : intent.pageLabelPt) + '</span>';
          navBtn.addEventListener("click", () => navigateToPage(intent.page));
          aiChatText.appendChild(document.createElement("br"));
          aiChatText.appendChild(navBtn);
        }
        await sleep(3000);
        await eraseEffect(aiChatText, 2);
        const followUp = isEnglish ? "Anything else? I know a lot!" : "Mais algum segredo? Sei de muita coisa!";
        await typeWriter(aiChatText, followUp, 20);
        aiInputWrapper.style.display = "flex";
      }
      aiQuestionInput.value = "";
    };

    aiAskBtn.addEventListener("click", processQuestion);
    aiQuestionInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") processQuestion();
    });
  }
};

handleAIInteraction();



