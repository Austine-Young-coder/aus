(() => {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  function scrubVideo(videoEl, triggerEl, startPos, endPos) {
    if (!videoEl) return;

    const setup = () => {
      const duration = videoEl.duration;
      if (!duration || !isFinite(duration)) return;

      ScrollTrigger.create({
        trigger: triggerEl,
        start: startPos || 'top bottom',
        end: endPos || 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          videoEl.currentTime = self.progress * duration;
        },
      });
    };

    if (videoEl.readyState >= 1) {
      setup();
    } else {
      videoEl.addEventListener('loadedmetadata', setup, { once: true });
    }
  }

  function initHero() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const FRAME_COUNT = 147;
    const frames = [];
    let loadedCount = 0;
    let currentFrame = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `frames_1/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => { loadedCount++; };
      frames.push(img);
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrame);
    }

    function drawFrame(index) {
      const img = frames[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const waitForFirst = setInterval(() => {
      if (frames[0] && frames[0].complete) {
        clearInterval(waitForFirst);
        drawFrame(0);
      }
    }, 50);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero__tag',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }, 0.3)
    .fromTo('.hero__line',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, 0.5)
    .fromTo('.hero__sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 }, 1.0)
    .fromTo('.btn',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }, 1.2)
    .fromTo('.hero__scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 1 }, 1.6);

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.hero__pin',
      pinSpacing: false,
    });

    const frameObj = { frame: 0 };
    gsap.to(frameObj, {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      snap: 'frame',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      onUpdate: () => {
        const idx = Math.round(frameObj.frame);
        if (idx !== currentFrame) {
          currentFrame = idx;
          drawFrame(currentFrame);
        }
      },
    });

    gsap.fromTo('.hero__overlay',
      { background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.8) 100%)' },
      {
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.4) 100%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '30% top',
          scrub: true,
        },
      }
    );

    gsap.to('.hero__content', {
      y: -120,
      opacity: 0,
      scale: 0.92,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '5% top',
        end: '18% top',
        scrub: true,
      },
    });

    gsap.to('.hero__scroll-indicator', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '2% top',
        end: '8% top',
        scrub: true,
      },
    });
  }

  function initVideoTransition() {
    const section = document.querySelector('.video-transition');
    if (!section) return;

    const canvas = document.getElementById('vtCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const VT_FRAME_COUNT = 168;
    const vtFrames = [];
    let vtLoadedCount = 0;
    let vtCurrentFrame = 0;

    for (let i = 1; i <= VT_FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `frames_2/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        vtLoadedCount++;
        if (vtLoadedCount === 1) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          drawVtFrame(0);
        }
      };
      vtFrames.push(img);
    }

    function drawVtFrame(index) {
      if (index < 0 || index >= vtFrames.length) return;
      const img = vtFrames[index];
      if (!img.complete || !img.naturalWidth) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      vtCurrentFrame = index;
    }

    const vtScrub = { frame: 0 };

    gsap.to(vtScrub, {
      frame: VT_FRAME_COUNT - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
      },
      onUpdate: () => {
        drawVtFrame(Math.round(vtScrub.frame));
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        pin: '.video-transition__inner',
      },
    });

    tl.fromTo('.video-transition__frame',
      { clipPath: 'inset(30% 25% 30% 25% round 20px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1, ease: 'none' },
      0
    )
    .fromTo('#vtCanvas',
      { scale: 1.3 },
      { scale: 1, duration: 1, ease: 'none' },
      0
    )
    .to('.video-transition__overlay', {
      opacity: 0.15,
      duration: 0.6,
      ease: 'none',
    }, 0.3)
    .fromTo('.vt-word',
      { y: 40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: 'power3.out' },
      0.35
    )
    .fromTo('.vt-dot',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.15, stagger: 0.08, ease: 'back.out(3)' },
      0.4
    )
    .to(['.vt-word', '.vt-dot'], {
      opacity: 0,
      y: -30,
      duration: 0.3,
      stagger: 0.03,
      ease: 'power2.in',
    }, 0.75)
    .to('.video-transition__frame', {
      clipPath: 'inset(5% 5% 5% 5% round 12px)',
      duration: 0.25,
      ease: 'none',
    }, 0.8)
    .to('.video-transition__overlay', {
      opacity: 0.7,
      duration: 0.2,
      ease: 'none',
    }, 0.8);
  }

  function initIntro() {
    const introVideo = document.querySelector('.intro__video');

    if (introVideo) {
      introVideo.play().catch(() => {});

      gsap.fromTo(introVideo,
        { opacity: 0.3 },
        {
          opacity: 0.6,
          ease: 'none',
          scrollTrigger: {
            trigger: '.intro',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );
    }

    gsap.fromTo('.intro__label',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.intro__label', start: 'top 85%' }
      }
    );

    const introHeading = document.querySelector('.intro__heading');
    if (introHeading) {
      splitTextIntoSpans(introHeading);
      const words = introHeading.querySelectorAll('.word');
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: introHeading, start: 'top 80%' }
        }
      );
    }

    gsap.utils.toArray('.intro__col').forEach((col, i) => {
      gsap.fromTo(col,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: col, start: 'top 85%' }
        }
      );
    });

    gsap.utils.toArray('.stat').forEach((stat, i) => {
      gsap.fromTo(stat,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: '.intro__stats', start: 'top 85%' }
        }
      );
    });
  }

  function initServices() {
    const items = gsap.utils.toArray('.service-item');
    const numberEl = document.querySelector('.services__number');
    const servicesBg = document.querySelector('.services__bg');

    if (servicesBg) {
      ScrollTrigger.create({
        trigger: '.services',
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => servicesBg.classList.add('is-visible'),
        onLeave: () => servicesBg.classList.remove('is-visible'),
        onEnterBack: () => servicesBg.classList.add('is-visible'),
        onLeaveBack: () => servicesBg.classList.remove('is-visible'),
      });
    }

    items.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => activate(item, i),
        onEnterBack: () => activate(item, i),
        onLeave: () => deactivate(item),
        onLeaveBack: () => deactivate(item),
      });
    });

    function activate(item, index) {
      item.classList.add('is-active');
      if (numberEl) numberEl.textContent = String(index + 1).padStart(2, '0');
    }
    function deactivate(item) {
      item.classList.remove('is-active');
    }
  }

  function initCinematic() {
    const section = document.querySelector('.cinematic');
    if (!section) return;

    const countEl = section.querySelector('.cinematic__count');
    const cinVideo = section.querySelector('.cinematic__video');
    const lines = section.querySelectorAll('.cin-line');

    if (cinVideo) {
      cinVideo.play().catch(() => {});
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        pin: '.cinematic__sticky',
        onUpdate: (self) => {
          if (countEl) {
            countEl.textContent = String(Math.round(self.progress * 100)).padStart(2, '0');
          }
        },
      },
    });

    tl.fromTo('.cinematic__counter',
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo('.cinematic__video-frame',
      { clipPath: 'inset(48% 40% 48% 40% round 8px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.6, ease: 'none' },
      0
    )
    .fromTo('.cinematic__video',
      { scale: 1.6 },
      { scale: 1, duration: 0.6, ease: 'none' },
      0
    )
    .fromTo(lines,
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.2, stagger: 0.06, ease: 'power3.out' },
      0.45
    )
    .to(lines, {
      y: -40, opacity: 0, duration: 0.15, stagger: 0.03, ease: 'power2.in',
    }, 0.8)
    .to('.cinematic__video-frame', {
      clipPath: 'inset(10% 10% 10% 10% round 16px)',
      duration: 0.2,
      ease: 'none',
    }, 0.85)
    .to('.cinematic__counter', {
      opacity: 0,
      duration: 0.1,
    }, 0.9);
  }

  function initContact() {
    gsap.fromTo('.contact__label',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.contact__label', start: 'top 85%' }
      }
    );

    const contactHeading = document.querySelector('.contact__heading');
    if (contactHeading) {
      splitTextIntoSpans(contactHeading);
      const words = contactHeading.querySelectorAll('.word');
      gsap.fromTo(words,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: contactHeading, start: 'top 80%' }
        }
      );
    }

    gsap.fromTo('.contact__email',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__email', start: 'top 85%' }
      }
    );
  }

  function initLazyVideos() {
    document.querySelectorAll('[data-lazy-video]').forEach(video => {
      ScrollTrigger.create({
        trigger: video.closest('section') || video,
        start: 'top bottom+=400',
        once: true,
        onEnter: () => {
          const sources = video.querySelectorAll('source[data-src]');
          sources.forEach(source => {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
          });
          video.load();
        },
      });
    });
  }

  function splitTextIntoSpans(element) {
    const html = element.innerHTML;
    const fragments = html.split(/(<[^>]+>)/);
    let result = '';

    fragments.forEach(fragment => {
      if (fragment.startsWith('<')) {
        result += fragment;
      } else {
        const words = fragment.split(/(\s+)/);
        words.forEach(word => {
          if (word.trim()) {
            result += `<span class="word" style="display:inline-block">${word}</span>`;
          } else {
            result += word;
          }
        });
      }
    });

    element.innerHTML = result;
    element.style.opacity = '1';
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 0 },
          duration: 1.2,
          ease: 'power3.inOut',
        });
      });
    });
  }

  function initPreloader(onComplete) {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloaderBar');
    const pctEl = document.getElementById('preloaderPct');
    if (!preloader) { onComplete(); return; }

    document.body.classList.add('is-loading');

    let loaded = 0;
    let total = 0;
    let displayPct = 0;
    let targetPct = 0;
    let rafId;

    const resources = [];

    const HERO_FRAMES = 147;
    for (let i = 1; i <= HERO_FRAMES; i++) {
      const img = new Image();
      img.src = `frames_1/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      total++;
      resources.push({ type: 'image', el: img });
    }

    const VT_FRAMES = 168;
    for (let i = 1; i <= VT_FRAMES; i++) {
      const img = new Image();
      img.src = `frames_2/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      total++;
      resources.push({ type: 'image', el: img });
    }

    document.querySelectorAll('video').forEach(v => {
      const src = v.querySelector('source[src]');
      if (src && src.getAttribute('src')) {
        total++;
        resources.push({ type: 'video', el: v });
      }
    });

    document.querySelectorAll('img[src]').forEach(img => {
      total++;
      resources.push({ type: 'image', el: img });
    });

    if (document.fonts && document.fonts.ready) {
      total++;
      resources.push({ type: 'fonts' });
    }

    if (total === 0) total = 1;

    function tick() {
      targetPct = Math.min(Math.round((loaded / total) * 100), 100);
    }

    function markLoaded() {
      loaded++;
      tick();
    }

    resources.forEach(r => {
      if (r.type === 'video') {
        const v = r.el;
        if (v.readyState >= 4) {
          markLoaded();
        } else {
          v.addEventListener('canplaythrough', markLoaded, { once: true });
          setTimeout(() => {
            if (loaded < total) markLoaded();
          }, 8000);
        }
      } else if (r.type === 'image') {
        const img = r.el;
        if (img.complete && img.naturalWidth > 0) {
          markLoaded();
        } else {
          img.addEventListener('load', markLoaded, { once: true });
          img.addEventListener('error', markLoaded, { once: true });
        }
      } else if (r.type === 'fonts') {
        document.fonts.ready.then(markLoaded);
      }
    });

    function animateCounter() {
      displayPct += (targetPct - displayPct) * 0.15;
      const rounded = Math.round(displayPct);

      pctEl.textContent = rounded;
      bar.style.width = rounded + '%';

      if (rounded >= 100 && targetPct >= 100) {
        cancelAnimationFrame(rafId);
        pctEl.textContent = '100';
        bar.style.width = '100%';
        setTimeout(revealSite, 400);
        return;
      }

      rafId = requestAnimationFrame(animateCounter);
    }
    rafId = requestAnimationFrame(animateCounter);

    const maxWait = setTimeout(() => {
      targetPct = 100;
      loaded = total;
    }, 12000);

    function revealSite() {
      clearTimeout(maxWait);
      document.body.classList.remove('is-loading');

      const tlOut = gsap.timeline({
        onComplete: () => {
          preloader.remove();
          onComplete();
        },
      });

      tlOut
        .to('.preloader__counter', {
          y: -20, opacity: 0, duration: 0.4, ease: 'power2.in',
        }, 0)
        .to('.preloader__bar-wrap', {
          scaleX: 0, opacity: 0, duration: 0.4, ease: 'power2.in',
        }, 0.1)
        .to('.preloader__logo', {
          y: -20, opacity: 0, duration: 0.4, ease: 'power2.in',
        }, 0.15)
        .to(preloader, {
          yPercent: -100, duration: 0.8, ease: 'power3.inOut',
        }, 0.4);
    }
  }

  function init() {
    initPreloader(() => {
      initHero();
      initVideoTransition();
      initIntro();
      initServices();
      initCinematic();
      initContact();
      initLazyVideos();
      initSmoothAnchors();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
