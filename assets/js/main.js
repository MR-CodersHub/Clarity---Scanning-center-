/* =========================================================
   CLARITY IMAGING CENTER
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    if (window.lucide) {
        lucide.createIcons();
    }


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            pageLoader?.classList.add("hidden");

        }, 500);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("siteHeader");

    const handleHeaderScroll = () => {

        if (window.scrollY > 30) {

            header?.classList.add("scrolled");

        } else {

            header?.classList.remove("scrolled");

        }

    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileNav =
        document.getElementById("mobileNav");

    menuToggle?.addEventListener("click", () => {

        mobileNav?.classList.toggle("open");

        const isOpen =
            mobileNav?.classList.contains("open");

        menuToggle.innerHTML = isOpen
            ? `<i data-lucide="x"></i>`
            : `<i data-lucide="menu"></i>`;

        if (window.lucide) {
            lucide.createIcons();
        }

    });


    /* Close mobile nav after clicking */

    document
        .querySelectorAll(".mobile-nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileNav?.classList.remove("open");

                if (menuToggle) {

                    menuToggle.innerHTML =
                        `<i data-lucide="menu"></i>`;

                    if (window.lucide) {
                        lucide.createIcons();
                    }
                }

            });

        });


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("clarity-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-theme");

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            document.body.classList.contains("dark-theme")
                ? "sun"
                : "moon";

        themeToggle.innerHTML =
            `<i data-lucide="${icon}"></i>`;

        if (window.lucide) {
            lucide.createIcons();
        }

    }

    updateThemeIcon();


    themeToggle?.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        const isDark =
            document.body.classList.contains("dark-theme");

        localStorage.setItem(
            "clarity-theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();

    });


    /* =====================================================
       RTL / LTR TOGGLE
    ===================================================== */

    const rtlToggle =
        document.getElementById("rtlToggle");

    const savedDirection =
        localStorage.getItem("clarity-direction");

    if (savedDirection === "rtl") {

        document.documentElement.dir = "rtl";

    } else {

        document.documentElement.dir = "ltr";

    }


    function updateDirectionButton() {

        if (!rtlToggle) return;

        const isRTL =
            document.documentElement.dir === "rtl";

        rtlToggle.innerHTML =
            `<span>${isRTL ? "LTR" : "RTL"}</span>`;

    }

    updateDirectionButton();


    rtlToggle?.addEventListener("click", () => {

        const isRTL =
            document.documentElement.dir === "rtl";

        document.documentElement.dir =
            isRTL ? "ltr" : "rtl";

        localStorage.setItem(
            "clarity-direction",
            isRTL ? "ltr" : "rtl"
        );

        updateDirectionButton();

    });


    /* =====================================================
       PROFILE DROPDOWN
    ===================================================== */

    const profileBtn =
        document.getElementById("profileBtn");

    const profileDropdown =
        document.getElementById("profileDropdown");


    profileBtn?.addEventListener("click", (event) => {

        event.stopPropagation();

        profileDropdown?.classList.toggle("open");

    });


    document.addEventListener("click", (event) => {

        if (
            profileDropdown &&
            !profileDropdown.contains(event.target) &&
            !profileBtn?.contains(event.target)
        ) {

            profileDropdown.classList.remove("open");

        }

    });


    /* =====================================================
       MODALS
    ===================================================== */

    const modalButtons =
        document.querySelectorAll("[data-modal]");

    const modalOverlays =
        document.querySelectorAll(".modal-overlay");


    function openModal(modalId) {

        const modal =
            document.getElementById(modalId);

        if (!modal) return;

        modalOverlays.forEach(item => {

            item.classList.remove("active");

        });

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

        profileDropdown?.classList.remove("open");

    }


    function closeAllModals() {

        modalOverlays.forEach(modal => {

            modal.classList.remove("active");

        });

        document.body.style.overflow = "";

    }


    modalButtons.forEach(button => {

        button.addEventListener("click", () => {

            const modalId =
                button.dataset.modal;

            openModal(modalId);

        });

    });


    document
        .querySelectorAll(".modal-close")
        .forEach(button => {

            button.addEventListener(
                "click",
                closeAllModals
            );

        });


    modalOverlays.forEach(overlay => {

        overlay.addEventListener("click", (event) => {

            if (event.target === overlay) {

                closeAllModals();

            }

        });

    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeAllModals();

        }

    });


    /* =====================================================
       AUTH FORM DEMO
    ===================================================== */

    document
        .querySelectorAll(".auth-form")
        .forEach(form => {

            form.addEventListener("submit", event => {

                event.preventDefault();

                const button =
                    form.querySelector("button[type='submit']");

                if (!button) return;

                const originalHTML =
                    button.innerHTML;

                button.innerHTML =
                    `<i data-lucide="check"></i> Success`;

                button.style.pointerEvents = "none";

                if (window.lucide) {
                    lucide.createIcons();
                }

                setTimeout(() => {

                    button.innerHTML = originalHTML;

                    button.style.pointerEvents = "";

                    if (window.lucide) {
                        lucide.createIcons();
                    }

                    closeAllModals();

                    form.reset();

                }, 1200);

            });

        });


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        question?.addEventListener("click", () => {

            const wasOpen =
                item.classList.contains("open");


            faqItems.forEach(otherItem => {

                otherItem.classList.remove("open");

            });


            if (!wasOpen) {

                item.classList.add("open");

            }

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    function animateCounter(element) {

        const target =
            Number(element.dataset.target);

        const suffix =
            element.dataset.suffix || "";

        const duration = 1600;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /* Ease out */

            const eased =
                1 - Math.pow(1 - progress, 3);


            const current =
                Math.floor(target * eased);


            element.textContent =
                current.toLocaleString() + suffix;


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            }

        }


        requestAnimationFrame(updateCounter);

    }


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    animateCounter(entry.target);

                    counterObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* =====================================================
       CLOSE DROPDOWN ON ESCAPE
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            profileDropdown?.classList.remove("open");

        }

    });

});

/* =========================================================
   CLARITY IMAGING CENTER
   ENHANCEMENTS  (load AFTER main.js — main.js is not modified)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const $  = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer  = matchMedia("(hover: hover) and (pointer: fine)").matches;


    /* =====================================================
       SCROLL PROGRESS · BACK TO TOP · HERO PARALLAX
    ===================================================== */

    const progressBar = $("#scrollProgress");
    const toTop       = $("#backToTop");
    const hero        = $(".hero-section");
    const heroWrap    = $(".hero-image-wrap");

    let ticking = false;

    function onScroll() {

        const max = document.documentElement.scrollHeight - innerHeight;

        progressBar?.style.setProperty(
            "--progress",
            max > 0 ? (scrollY / max).toFixed(4) : 0
        );

        toTop?.classList.toggle("show", scrollY > 700);

        if (heroWrap && !reduceMotion && scrollY < innerHeight * 1.2) {

            heroWrap.style.setProperty(
                "--py",
                Math.min(scrollY * 0.05, 24).toFixed(1) + "px"
            );

        }

        ticking = false;
    }

    addEventListener("scroll", () => {

        if (!ticking) {
            ticking = true;
            requestAnimationFrame(onScroll);
        }

    }, { passive: true });

    onScroll();

    toTop?.addEventListener("click", () => {

        scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

    });


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const glow = $(".cursor-glow");

    if (glow && finePointer && !reduceMotion) {

        let gx = 0, gy = 0, tx = 0, ty = 0;

        addEventListener("pointermove", event => {

            tx = event.clientX;
            ty = event.clientY;

            glow.classList.add("on");

        }, { passive: true });

        document.documentElement.addEventListener("pointerleave", () => {
            glow.classList.remove("on");
        });

        (function loop() {

            gx += (tx - gx) * 0.12;
            gy += (ty - gy) * 0.12;

            glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;

            requestAnimationFrame(loop);

        })();

    }


    /* =====================================================
       HERO HEADLINE — word-by-word rise
    ===================================================== */

    const heroTitle = $(".hero-content h1");

    if (heroTitle) {

        let wordIndex = 0;

        const splitWords = node => {

            [...node.childNodes].forEach(child => {

                if (child.nodeType === 3) {

                    const words = child.textContent.split(/\s+/).filter(Boolean);

                    if (!words.length) return;

                    const fragment = document.createDocumentFragment();

                    words.forEach(word => {

                        const wrap  = document.createElement("span");
                        const inner = document.createElement("span");

                        wrap.className = "w";
                        wrap.style.setProperty("--i", wordIndex++);

                        inner.textContent = word;
                        wrap.appendChild(inner);

                        fragment.appendChild(wrap);
                        fragment.appendChild(document.createTextNode(" "));

                    });

                    child.replaceWith(fragment);

                } else if (child.nodeType === 1) {

                    splitWords(child);

                }

            });

        };

        splitWords(heroTitle);

        const reveal = () => heroTitle.classList.add("is-in");

        if (document.readyState === "complete") {
            setTimeout(reveal, 650);
        } else {
            addEventListener("load", () => setTimeout(reveal, 650));
        }

        setTimeout(reveal, 3500); /* safety net */

    }


    /* =====================================================
       HERO VIDEO
    ===================================================== */

    const video  = $(".hero-video");
    const toggle = $("#videoToggle");

    if (video && heroWrap) {

        let userPaused = false;

        const markReady = () => heroWrap.classList.add("video-ready");

        video.addEventListener("loadeddata", markReady);
        video.addEventListener("playing", markReady);

        if (video.readyState >= 2) markReady();

        const setToggle = playing => {

            toggle?.classList.toggle("paused", !playing);

            toggle?.setAttribute(
                "aria-label",
                playing ? "Pause background video" : "Play background video"
            );

        };

        video.addEventListener("play",  () => setToggle(true));
        video.addEventListener("pause", () => setToggle(false));

        if (reduceMotion) {

            userPaused = true;
            video.removeAttribute("autoplay");
            video.pause();
            setToggle(false);

        }

        toggle?.addEventListener("click", () => {

            if (video.paused) {

                userPaused = false;
                video.play().catch(() => {});

            } else {

                userPaused = true;
                video.pause();

            }

        });

        /* save battery: pause when hero is off-screen */

        new IntersectionObserver(([entry]) => {

            if (userPaused) return;

            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }

        }, { threshold: 0.05 }).observe(heroWrap);

    }


    /* =====================================================
       HERO HUD — slice counter
    ===================================================== */

    const sliceCount = $("#sliceCount");

    if (sliceCount && !reduceMotion) {

        let n = 1, dir = 1;

        setInterval(() => {

            if (document.hidden) return;

            n += dir * 3;

            if (n >= 256) { n = 256; dir = -1; }
            if (n <= 1)   { n = 1;   dir = 1;  }

            sliceCount.textContent = String(n).padStart(3, "0");

        }, 80);

    }


    /* =====================================================
       HERO — mouse parallax
    ===================================================== */

    if (hero && finePointer && !reduceMotion) {

        hero.addEventListener("pointermove", event => {

            const rect = hero.getBoundingClientRect();

            hero.style.setProperty("--hx", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
            hero.style.setProperty("--hy", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));

        });

        hero.addEventListener("pointerleave", () => {

            hero.style.setProperty("--hx", 0);
            hero.style.setProperty("--hy", 0);

        });

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    if (finePointer && !reduceMotion) {

        $$(".btn-primary, .btn-secondary, .btn-light").forEach(button => {

            button.addEventListener("pointermove", event => {

                const rect = button.getBoundingClientRect();

                const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
                const y = (event.clientY - rect.top - rect.height / 2) * 0.28;

                button.style.translate = `${x}px ${y}px`;

            });

            button.addEventListener("pointerleave", () => {

                button.style.translate = "";

            });

        });

    }


    /* =====================================================
       CARD SPOTLIGHT
    ===================================================== */

    $$(".service-card, .testimonial-card, .insight-card, .prep-card").forEach(card => {

        card.addEventListener("pointermove", event => {

            const rect = card.getBoundingClientRect();

            card.style.setProperty("--sx", (event.clientX - rect.left) + "px");
            card.style.setProperty("--sy", (event.clientY - rect.top) + "px");

        });

    });


    /* =====================================================
       SCAN EXPLORER (tabs)
    ===================================================== */

    const tabs   = $$(".explorer-tab");
    const panels = $$(".explorer-panel");
    const arts   = $$(".scan-art");
    const tag    = $("#explorerTag");

    const tagText = {
        mri:        "MRI · FIELD ACTIVE",
        ct:         "CT · GANTRY ROTATING",
        ultrasound: "ULTRASOUND · PROBE LIVE"
    };

    function selectTab(id, moveFocus = false) {

        tabs.forEach(tab => {

            const active = tab.dataset.tab === id;

            tab.setAttribute("aria-selected", active);
            tab.tabIndex = active ? 0 : -1;

            if (active && moveFocus) tab.focus();

        });

        panels.forEach(panel => {
            panel.hidden = panel.dataset.panel !== id;
        });

        arts.forEach(art => {
            art.classList.toggle("active", art.dataset.art === id);
        });

        if (tag) tag.textContent = tagText[id] || "";

    }

    tabs.forEach((tab, index) => {

        tab.addEventListener("click", () => selectTab(tab.dataset.tab));

        tab.addEventListener("keydown", event => {

            let next = null;

            if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
            if (event.key === "ArrowLeft")  next = (index - 1 + tabs.length) % tabs.length;
            if (event.key === "Home")       next = 0;
            if (event.key === "End")        next = tabs.length - 1;

            if (next === null) return;

            event.preventDefault();
            selectTab(tabs[next].dataset.tab, true);

        });

    });


    /* =====================================================
       PREPARATION CHECKLIST
    ===================================================== */

    const checks    = $$(".prep-list input");
    const prepBar   = $(".prep-ring .bar");
    const prepCount = $("#prepCount");
    const prepDone  = $("#prepDone");

    if (checks.length && prepBar) {

        const circumference = 2 * Math.PI * 52;

        prepBar.style.strokeDasharray = circumference;
        prepBar.style.strokeDashoffset = circumference;

        const updatePrep = () => {

            const done = checks.filter(item => item.checked).length;

            prepBar.style.strokeDashoffset =
                circumference * (1 - done / checks.length);

            if (prepCount) prepCount.textContent = done;

            prepDone?.classList.toggle("show", done === checks.length);

        };

        checks.forEach(item => item.addEventListener("change", updatePrep));

        updatePrep();

    }


    /* =====================================================
       OPEN NOW (Chennai time)
    ===================================================== */

    const openBadge = $("#openStatus");

    if (openBadge) {

        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
            hourCycle: "h23"
        }).formatToParts(new Date());

        const get = type => parts.find(part => part.type === type)?.value;

        const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

        const day     = dayMap[get("weekday")];
        const minutes = Number(get("hour")) * 60 + Number(get("minute"));

        const isOpenDay = day >= 1 && day <= 6;
        const isOpen    = isOpenDay && minutes >= 7 * 60 && minutes < 20 * 60;

        let message;

        if (isOpen) {

            message = "Open now · until 8:00 PM";

        } else if (isOpenDay && minutes < 7 * 60) {

            message = "Closed now · opens today at 7:00 AM";

        } else if (day >= 1 && day <= 5) {

            message = "Closed now · opens tomorrow at 7:00 AM";

        } else {

            message = "Closed now · opens Monday at 7:00 AM";

        }

        openBadge.textContent = message;
        openBadge.classList.add(isOpen ? "is-open" : "is-closed");

        $$(".hours-list li").forEach(row => {

            const days = (row.dataset.days || "").split(",").map(Number);

            if (days.includes(day)) row.classList.add("today");

        });

    }

});