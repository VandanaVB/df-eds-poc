export default function decorate(block) {
  const img = block.querySelector("img");
  img?.addEventListener("load", () => block.classList.add("loaded"));
}
