const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const form = document.getElementById("volunteerForm");
const msg = document.getElementById("formMsg");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
});

document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => menu.classList.remove("open"));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.textContent = "Thank you. Your volunteer interest has been recorded.";
  form.reset();
});

const lightbox = document.createElement("div");
lightbox.className = "photo-lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.innerHTML = `
  <button class="close-lightbox" type="button" aria-label="Close fullscreen photo">×</button>
  <img src="" alt="">
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const closeLightbox = lightbox.querySelector(".close-lightbox");

function openGalleryPhoto(image) {
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";

  if (lightbox.requestFullscreen) {
    lightbox.requestFullscreen().catch(() => {});
  }
}

function closeGalleryPhoto() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

document.querySelectorAll(".gallery-item").forEach(item => {
  const image = item.querySelector("img");
  const button = item.querySelector(".view-photo");

  button.addEventListener("click", () => openGalleryPhoto(image));
});

closeLightbox.addEventListener("click", closeGalleryPhoto);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeGalleryPhoto();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeGalleryPhoto();
  }
});
