import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Read-Aloud with real karaoke highlighting: wraps every word of the article
// in a span, builds the utterance text from the SAME traversal so charIndex
// offsets line up, then maps SpeechSynthesis `boundary` events to word spans.
const InteractiveReader: QuartzComponent = () => {
  return (
    <div id="tts-player">
      <button id="tts-play-btn">▶ Vorlesen</button>
      <button id="tts-stop-btn" style={{ display: "none" }}>
        ⏹ Stopp
      </button>
      <span id="tts-status">DE</span>
    </div>
  )
}

InteractiveReader.css = `
#tts-player {
  position: fixed; bottom: 80px; right: 20px; z-index: 9999;
  background: var(--light); border: 1px solid var(--lightgray);
  padding: 8px 12px; border-radius: 10px; box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  display: flex; gap: 8px; align-items: center;
}
#tts-player button {
  border: none; border-radius: 6px; padding: 5px 10px; cursor: pointer;
  color: white; font-weight: 600; font-size: 0.85rem;
}
#tts-play-btn { background: #30a46c; }
#tts-stop-btn { background: #e5484d; }
#tts-status { font-size: 0.75rem; color: var(--gray); }
.tts-word.tts-current {
  background: rgba(245, 166, 35, 0.45); border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(245, 166, 35, 0.45);
}
`

const inlineScript = `
document.addEventListener("nav", () => {
  const playBtn = document.getElementById("tts-play-btn");
  const stopBtn = document.getElementById("tts-stop-btn");
  const statusEl = document.getElementById("tts-status");
  if (!playBtn) return;

  const synth = window.speechSynthesis;
  let originalHtml = null;
  let article = null;
  let words = []; // { start, end, el }

  function reset() {
    if (article && originalHtml !== null) article.innerHTML = originalHtml;
    originalHtml = null; words = [];
    stopBtn.style.display = "none";
    playBtn.style.display = "inline-block";
  }

  // Wrap every word of every text node in a span, recording the char offset
  // each word has inside the concatenated utterance text.
  function prepare(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        n.nodeValue.trim().length && !n.parentElement.closest("script,style,code,pre")
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let text = "";
    for (const node of nodes) {
      const frag = document.createDocumentFragment();
      const parts = node.nodeValue.split(/(\\s+)/);
      for (const part of parts) {
        if (!part) continue;
        if (/^\\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          text += " ";
        } else {
          const span = document.createElement("span");
          span.className = "tts-word";
          span.textContent = part;
          frag.appendChild(span);
          words.push({ start: text.length, end: text.length + part.length, el: span });
          text += part;
        }
      }
      // separate nodes with a space so words don't merge across elements
      text += " ";
      node.parentNode.replaceChild(frag, node);
    }
    return text;
  }

  function highlightAt(charIndex) {
    // binary search the word whose range contains charIndex
    let lo = 0, hi = words.length - 1, hit = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (charIndex < words[mid].start) hi = mid - 1;
      else if (charIndex >= words[mid].end + 1) lo = mid + 1;
      else { hit = mid; break; }
    }
    if (hit === -1) return;
    document.querySelectorAll(".tts-current").forEach((e) => e.classList.remove("tts-current"));
    words[hit].el.classList.add("tts-current");
    words[hit].el.scrollIntoView({ block: "center", behavior: "smooth" });
  }
  window.__ttsHighlightAt = highlightAt; // exposed for testing

  playBtn.addEventListener("click", () => {
    reset();
    article = document.querySelector("article.popover-hint") || document.querySelector("article") || document.body;
    originalHtml = article.innerHTML;
    const text = prepare(article);
    if (!text.trim()) { reset(); return; }

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.9;
    const de = synth.getVoices().find((v) => v.lang && v.lang.startsWith("de"));
    if (de) u.voice = de;
    u.onboundary = (e) => { if (e.name === "word" || e.charIndex != null) highlightAt(e.charIndex); };
    u.onend = reset;
    u.onerror = reset;
    synth.cancel();
    synth.speak(u);
    playBtn.style.display = "none";
    stopBtn.style.display = "inline-block";
    statusEl.textContent = "liest…";
  });

  stopBtn.addEventListener("click", () => { synth.cancel(); reset(); statusEl.textContent = "DE"; });
});
`

InteractiveReader.afterDOMLoaded = inlineScript

export default (() => InteractiveReader) satisfies QuartzComponentConstructor
