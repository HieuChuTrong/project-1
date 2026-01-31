const buttons = document.querySelectorAll('.btn');
const sections = document.querySelectorAll('.section');
const timelineItems = document.querySelectorAll('.timeline-item');
const s2Descriptions = document.querySelectorAll('.nd');
const s2Slider = document.querySelector('.slider');
const SECTION_IDS = ['s1', 's2', 's3', 's4'];

let currentSectionIndex = 0;
let s2SubIndex = 0;
let s3SubIndex = 0;

function updateSectionDisplay() {
  sections.forEach((sec, index) => {
    if (index === currentSectionIndex) {
      sec.classList.add('active-section');
    } else {
      sec.classList.remove('active-section');
    }
  });

  buttons.forEach((btn, index) => {
    if (index === currentSectionIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function handleSection2Nav(direction) {
  if (direction === 'next' && s2SubIndex < 2) {
    s2SubIndex++;
  } else if (direction === 'prev' && s2SubIndex > 0) {
    s2SubIndex--;
  }

  s2Descriptions.forEach((item, index) => {
    if (index === s2SubIndex) {
      item.classList.add('active-nd');
    } else {
      item.classList.remove('active-nd');
    }
  });

  const translateValue = -(s2SubIndex * 100); 
  if (s2Slider) {
    s2Slider.style.transform = `translateX(${translateValue}%)`;
  }
}

function handleSection3Nav() {
  s3SubIndex = s3SubIndex === 0 ? 1 : 0;
  
  timelineItems.forEach((item, index) => {
    if (index === s3SubIndex) {
      item.classList.add('active-timeline');
    } else {
      item.classList.remove('active-timeline');
      item.classList.add('blurred');
    }
  });

  const francePic = document.querySelector('.pic.france');
  const usaPic = document.querySelector('.pic.usa');

  if (s3SubIndex === 0) {
    francePic.classList.add('focus');
    francePic.classList.remove('blur');
    usaPic.classList.add('blur');
    usaPic.classList.remove('focus');
  } else {
    francePic.classList.add('blur');
    francePic.classList.remove('focus');
    usaPic.classList.add('focus');
    usaPic.classList.remove('blur');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
      updateSectionDisplay();
    }
  } else if (e.key === 'ArrowUp') {
    if (currentSectionIndex > 0) {
      currentSectionIndex--;
      updateSectionDisplay();
    }
  } else if (e.key === 'ArrowRight') {
    if (currentSectionIndex === 1) handleSection2Nav('next');
    if (currentSectionIndex === 2) handleSection3Nav();
  } else if (e.key === 'ArrowLeft') {
    if (currentSectionIndex === 1) handleSection2Nav('prev');
    if (currentSectionIndex === 2) handleSection3Nav();
  }
});

buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    currentSectionIndex = index;
    updateSectionDisplay();
  });
});

updateSectionDisplay();