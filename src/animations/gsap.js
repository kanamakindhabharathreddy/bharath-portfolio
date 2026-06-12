import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

/* ─── Scroll Progress Bar ─── */
export function initScrollProgress() {
  const bar = document.getElementById('scroll-progress')
  if (!bar) return
  ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      bar.style.width = `${self.progress * 100}%`
    }
  })
}

/* ─── Section Reveal Timelines ─── */
export function initRevealAnimations() {
  // Generic reveal-up elements
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  })

  // Staggered children
  gsap.utils.toArray('.stagger-children').forEach((container) => {
    const children = container.children
    gsap.fromTo(children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  })

  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: -80 },
      {
        opacity: 1, x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  })

  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: 80 },
      {
        opacity: 1, x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  })
}

/* ─── Hero Letters Drop ─── */
export function animateHeroLetters(selector) {
  const letters = document.querySelectorAll(selector)
  if (!letters.length) return

  gsap.fromTo(letters,
    {
      y: -200,
      opacity: 0,
      rotateX: -90,
      scale: 1.5,
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: 'bounce.out',
      delay: 0.3,
    }
  )
}

/* ─── Counter Animation ─── */
export function animateCounters() {
  gsap.utils.toArray('.counter').forEach((el) => {
    const target = parseFloat(el.dataset.target)
    const decimals = el.dataset.decimals || 0
    const obj = { val: 0 }

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = parseFloat(decimals) > 0
              ? obj.val.toFixed(1)
              : Math.round(obj.val)
          }
        })
      }
    })
  })
}

/* ─── Timeline Node Reveal ─── */
export function initTimelineAnimation() {
  gsap.utils.toArray('.timeline-node').forEach((node, i) => {
    gsap.fromTo(node,
      { opacity: 0, scale: 0.5, x: i % 2 === 0 ? -50 : 50 },
      {
        opacity: 1, scale: 1, x: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  })
}

/* ─── Section Title Reveal ─── */
export function initSectionTitles() {
  gsap.utils.toArray('.section-title').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30, skewX: 5 },
      {
        opacity: 1, y: 0, skewX: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  })
}

/* ─── Parallax Sections ─── */
export function initParallax() {
  gsap.utils.toArray('.parallax-bg').forEach((el) => {
    gsap.to(el, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  })
}

/* ─── Initialize All ─── */
export function initAllAnimations() {
  // Wait for DOM
  setTimeout(() => {
    initScrollProgress()
    initRevealAnimations()
    animateCounters()
    initTimelineAnimation()
    initSectionTitles()
    initParallax()
    ScrollTrigger.refresh()
  }, 100)
}
