const pagesData = [
  {
    src: "image/img 1.png",
    caption:
      "your eyes weren’t just beautiful; they were a story I wanted to read forever.”",
  },
  {
    src: "image/img 2.png",
    caption: "you look like a dream someone forgot to wake up from.",
  },
  {
    src: "image/img 3.png",
    caption: "If happiness had a face, I’m sure it would wear your smile.",
  },
  {
    src: "image/img 4.png",
    caption: "There’s a little bit of magic hidden in the way you smiles.",
  },
  {
    src: "image/img 5.png",
    caption:
      "your face carries a beauty that feels almost too perfect to be real.",
  },
  {
    src: "image/img 6.png",
    caption:
      "Some faces are beautiful at first sight; yours becomes more beautiful every time you see it.",
  },
  {
    src: "image/img 7.png",
    caption: "You look like the kind of moment people write poems about.",
  },
  {
    src: "image/img 8.png",
    caption:
      "your face does not just catch the eye—it gives the eyes a reason to stay.",
  },
  {
    src: "image/img 10.png",
    caption: "You look like a moment the universe took its time creating.",
  },
  {
    src: "image/img 11.png",
    caption:
      "There is something about your presence that makes everything around you seem a little more beautiful.",
  },
  {
    src: "image/img 12.png",
    caption:
      "I hope you always has a reason to smile, because happiness looks beautiful on you.",
  },
  {
    src: "image/img 13.png",
    caption: "Even the sunlight seemed softer when it touched you.",
  },
  {
    src: "image/img 9.png",
    caption:
      "kyu ho tum itni khubsurat, itna khubsurat koi kese ho sakta hai. tum chaand ka thukda toh nhi, per chaand tukda tumhara ho sakta hai.",
  },
];

const stickerSets = [
  ["🌼","💛","✨"],
  ["🍒","🌿","🫧"],
  ["🌟","🍑","🎈"],
  ["🦋","🌸","💌"]
];

const pagesEl = document.getElementById('pages');
const bookEl = document.getElementById('book');
const coverEl = document.getElementById('cover');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageCount = document.getElementById('pageCount');
const closeBtn = document.getElementById('closeBtn');
const finalPage = document.getElementById('finalPage');
const finalCloseBtn = document.getElementById('finalCloseBtn');

let current = 0;
const total = pagesData.length;

pagesData.forEach((p, i) => {
  const page = document.createElement('div');
  page.className = 'page';
  page.style.zIndex = total - i;
  const stickers = stickerSets[i % stickerSets.length];
  const cornerSets = [["🌷","🦋"],["🍒","🌟"],["🌸","🎈"],["🍀","💫"]];
  const corners = cornerSets[i % cornerSets.length];
  const isReversed = i % 2 === 1;
  const tilt = isReversed ? '3deg' : '-3deg';

  page.innerHTML = `
    <div class="face front">
      <span class="page-corner tl">${corners[0]}</span>
      <span class="page-corner br">${corners[1]}</span>
      <span class="sticker a">${stickers[0]}</span>
      <span class="sticker b">${stickers[1]}</span>
      <span class="sticker c">${stickers[2]}</span>

      <div class="pair${isReversed ? ' reverse' : ''}">
        <div class="photo-card" style="--tilt:${tilt}">
          <span class="tape"></span>
          <img src="${p.src}" alt="${p.caption}" loading="lazy">
        </div>
        <div class="cap-tag">${p.caption}</div>
      </div>

      <span class="page-index">${i + 1}</span>
      <button class="prev-page-btn" type="button">← previous</button>
      <button class="next-page-btn" type="button">next page →</button>
    </div>
    <div class="face back"><span class="back-mark">✿ ✿ ✿</span></div>
  `;
  page.addEventListener('click', () => { if (i === current) turnNext(); });
  page.querySelector('.next-page-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (i === current) turnNext();
  });
  const prevBtnOnPage = page.querySelector('.prev-page-btn');
  prevBtnOnPage.addEventListener('click', (e) => {
    e.stopPropagation();
    turnPrev();
  });
  if (i === 0) prevBtnOnPage.disabled = true;
  pagesEl.appendChild(page);
});

const pageEls = Array.from(pagesEl.children);

function turnNext(){
  if (current >= total) return;
  const p = pageEls[current];
  p.style.transform = 'rotateY(-170deg)';
  p.style.zIndex = current;
  current++;
  refreshButtons();
}

function turnPrev(){
  if (current <= 0) return;
  current--;
  const p = pageEls[current];
  p.style.transform = 'rotateY(0deg)';
  p.style.zIndex = total - current;
  refreshButtons();
}

function refreshButtons(){
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === total;
  pageCount.textContent = `${Math.min(current + 1, total)} / ${total}`;
  finalPage.classList.toggle('visible', current === total);
}

nextBtn.addEventListener('click', turnNext);
prevBtn.addEventListener('click', turnPrev);

const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
let musicMuted = false;

function openAlbum(){
  bookEl.classList.add('is-open');
  coverEl.style.transform = 'rotateY(-165deg)';
  if (!musicMuted){
    bgMusic.currentTime = 0;
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {});
  }
}

function closeAlbum(){
  bookEl.classList.remove('is-open');
  coverEl.style.transform = 'rotateY(0deg)';
  bgMusic.pause();
  setTimeout(() => {
    pageEls.forEach((p, i) => {
      p.style.transform = 'rotateY(0deg)';
      p.style.zIndex = total - i;
    });
    current = 0;
    refreshButtons();

    // return to the home screen
    stageEl.classList.remove('visible');
    giftWrap.classList.remove('hidden');
  }, 500);
}

muteBtn.addEventListener('click', () => {
  musicMuted = !musicMuted;
  muteBtn.textContent = musicMuted ? '🔇' : '🔊';
  if (musicMuted){
    bgMusic.pause();
  } else if (bookEl.classList.contains('is-open')){
    bgMusic.play().catch(() => {});
  }
});

coverEl.addEventListener('click', openAlbum);
closeBtn.addEventListener('click', closeAlbum);
finalCloseBtn.addEventListener('click', closeAlbum);

document.addEventListener('keydown', (e) => {
  if (!bookEl.classList.contains('is-open')) return;
  if (e.key === 'ArrowRight') turnNext();
  if (e.key === 'ArrowLeft') turnPrev();
  if (e.key === 'Escape') closeAlbum();
});

const giftBtn = document.getElementById('giftBtn');
const giftWrap = document.getElementById('giftWrap');
const stageEl = document.getElementById('stage');

refreshButtons();

// balloons + cute floating elements, spawned continuously until the gift is opened
const overlay = document.getElementById('birthdayOverlay');
const floatEmoji = ["🎈","🎈","🎈","🎉","🧁","✨","🌟","🎀","🎈"];
let balloonsActive = true;

function spawnBalloon(){
  if (!balloonsActive) return;
  const b = document.createElement('span');
  b.className = 'balloon';
  b.textContent = floatEmoji[Math.floor(Math.random() * floatEmoji.length)];
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 4;
  const drift = (Math.random() * 120 - 60) + 'px';
  const spin = (Math.random() * 30 - 15) + 'deg';
  const size = 26 + Math.random() * 28;
  b.style.left = left + 'vw';
  b.style.fontSize = size + 'px';
  b.style.animationDuration = duration + 's';
  b.style.setProperty('--drift', drift);
  b.style.setProperty('--spin', spin);
  overlay.appendChild(b);
  setTimeout(() => b.remove(), duration * 1000 + 500);
}

// initial burst
for (let i = 0; i < 14; i++){
  setTimeout(spawnBalloon, i * 180);
}

// keep releasing new balloons on a loop
const balloonInterval = setInterval(spawnBalloon, 550);

giftBtn.addEventListener('click', () => {
  giftWrap.classList.add('hidden');
  setTimeout(() => {
    stageEl.classList.add('visible');
  }, 250);

  balloonsActive = false;
  clearInterval(balloonInterval);
});

const msgBtn = document.getElementById('msgBtn');
const messageOverlay = document.getElementById('messageOverlay');
const messageClose = document.getElementById('messageClose');

msgBtn.addEventListener('click', () => {
  messageOverlay.classList.add('open');
});
messageClose.addEventListener('click', () => {
  messageOverlay.classList.remove('open');
});
messageOverlay.addEventListener('click', (e) => {
  if (e.target === messageOverlay) messageOverlay.classList.remove('open');
});

const finalNoteBtn = document.getElementById('finalNoteBtn');
const finalNoteOverlay = document.getElementById('finalNoteOverlay');
const finalNoteClose = document.getElementById('finalNoteClose');

finalNoteBtn.addEventListener('click', () => {
  finalNoteOverlay.classList.add('open');
});
finalNoteClose.addEventListener('click', () => {
  finalNoteOverlay.classList.remove('open');
});
finalNoteOverlay.addEventListener('click', (e) => {
  if (e.target === finalNoteOverlay) finalNoteOverlay.classList.remove('open');
});