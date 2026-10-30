/* =========================================================
   CLARITY IMAGING CENTER
   HOME 2 INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HERO VIDEO
    ===================================================== */

    const heroWrap = document.querySelector(".hero-image-wrap");
    const heroVideo = document.querySelector(".hero-video");
    const videoToggle = document.querySelector(".video-toggle");

    if (heroVideo && heroWrap) {

        heroVideo.muted = true;

        const startVideo = async () => {

            try {

                await heroVideo.play();

                heroWrap.classList.add("video-ready");

            } catch (error) {

                console.log("Hero video autoplay unavailable.");

            }

        };

        startVideo();


        if (videoToggle) {

            videoToggle.addEventListener("click", () => {

                if (heroVideo.paused) {

                    heroVideo.play();

                    videoToggle.classList.remove("paused");

                } else {

                    heroVideo.pause();

                    videoToggle.classList.add("paused");

                }

            });

        }

    }


    /* =====================================================
       HERO WORD ANIMATION
    ===================================================== */

    const heroTitle = document.querySelector(".hero-content h1");

    if (heroTitle) {

        const words = heroTitle.querySelectorAll(".w");

        words.forEach((word, index) => {

            word.style.setProperty("--i", index);

        });

        requestAnimationFrame(() => {

            setTimeout(() => {

                heroTitle.classList.add("is-in");

            }, 100);

        });

    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {

        document.addEventListener("mousemove", (event) => {

            cursorGlow.style.transform =
                `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

            cursorGlow.classList.add("on");

        });

        document.addEventListener("mouseleave", () => {

            cursorGlow.classList.remove("on");

        });

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero = document.querySelector(".hero-home2");

    if (hero && window.matchMedia("(pointer:fine)").matches) {

        hero.addEventListener("mousemove", (event) => {

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            document.documentElement.style.setProperty(
                "--hx",
                x
            );

            document.documentElement.style.setProperty(
                "--hy",
                y
            );

        });

        hero.addEventListener("mouseleave", () => {

            document.documentElement.style.setProperty(
                "--hx",
                0
            );

            document.documentElement.style.setProperty(
                "--hy",
                0
            );

        });

    }


    /* =====================================================
       CARD SPOTLIGHT
    ===================================================== */

    const interactiveCards = document.querySelectorAll(
        ".service-card, .testimonial-card, .insight-card, .prep-card"
    );

    interactiveCards.forEach((card) => {

        card.addEventListener("pointermove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) / rect.width) * 100;

            const y =
                ((event.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty("--sx", `${x}%`);
            card.style.setProperty("--sy", `${y}%`);

        });

    });


    /* =====================================================
       IMAGING EXPLORER
    ===================================================== */

    const explorerTabs =
        document.querySelectorAll(".explorer-tab");

    const scanArts =
        document.querySelectorAll("[data-scan-art]");

    const scanPanels =
        document.querySelectorAll("[data-scan-panel]");


    explorerTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const selectedScan =
                tab.dataset.scan;


            /* Tabs */

            explorerTabs.forEach((item) => {

                const isSelected =
                    item === tab;

                item.setAttribute(
                    "aria-selected",
                    isSelected
                );

            });


            /* Visual */

            scanArts.forEach((art) => {

                art.classList.toggle(
                    "active",
                    art.dataset.scanArt === selectedScan
                );

            });


            /* Panel */

            scanPanels.forEach((panel) => {

                const isSelected =
                    panel.dataset.scanPanel === selectedScan;

                panel.hidden = !isSelected;

            });

        });

    });


    /* =====================================================
       PREPARATION CHECKLIST
    ===================================================== */

    const prepInputs =
        document.querySelectorAll(".prep-list input");

    const prepBar =
        document.querySelector(".prep-ring .bar");

    const prepPercentage =
        document.querySelector(".prep-count strong");

    const prepLabel =
        document.querySelector(".prep-count span");

    const prepDone =
        document.querySelector(".prep-done");


    const circumference = 326.73;


    function updateChecklist() {

        if (!prepInputs.length) return;

        const completed =
            [...prepInputs].filter(
                (input) => input.checked
            ).length;

        const total =
            prepInputs.length;

        const percentage =
            Math.round((completed / total) * 100);


        if (prepPercentage) {

            prepPercentage.textContent =
                `${percentage}%`;

        }


        if (prepLabel) {

            prepLabel.textContent =
                percentage === 100
                    ? "complete"
                    : "ready";

        }


        if (prepBar) {

            const offset =
                circumference -
                (circumference * percentage / 100);

            prepBar.style.strokeDashoffset =
                offset;

        }


        if (prepDone) {

            prepDone.classList.toggle(
                "show",
                percentage === 100
            );

        }

    }


    prepInputs.forEach((input) => {

        input.addEventListener(
            "change",
            updateChecklist
        );

    });


    updateChecklist();


    /* =====================================================
       OPEN / CLOSED STATUS
    ===================================================== */

    const openBadge =
        document.querySelector("[data-open-status]");

    const hourItems =
        document.querySelectorAll(".hours-list li[data-day]");


    if (openBadge) {

        const now = new Date();

        const currentDay =
            now.getDay();

        const currentHour =
            now.getHours() +
            now.getMinutes() / 60;


        let isOpen = false;


        if (currentDay >= 1 && currentDay <= 5) {

            isOpen =
                currentHour >= 8 &&
                currentHour < 20;

        } else if (currentDay === 6) {

            isOpen =
                currentHour >= 9 &&
                currentHour < 16;

        }


        openBadge.classList.remove(
            "is-open",
            "is-closed"
        );


        if (isOpen) {

            openBadge.classList.add("is-open");

            openBadge.textContent =
                "OPEN NOW";

        } else {

            openBadge.classList.add("is-closed");

            openBadge.textContent =
                "CURRENTLY CLOSED";

        }


        hourItems.forEach((item) => {

            item.classList.toggle(
                "today",
                Number(item.dataset.day) === currentDay
            );

        });

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const updateScrollProgress = () => {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            documentHeight > 0
                ? scrollTop / documentHeight
                : 0;

        document.documentElement.style.setProperty(
            "--progress",
            progress
        );

    };


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topButton =
        document.querySelector(".fab-top");


    if (topButton) {

        const toggleTopButton = () => {

            topButton.classList.toggle(
                "show",
                window.scrollY > 500
            );

        };


        window.addEventListener(
            "scroll",
            toggleTopButton,
            { passive: true }
        );


        topButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion && heroVideo) {

        heroVideo.pause();

    }

});

/* =========================================================
   CLARITY IMAGING CENTER
   HOME 2 INTERACTIONS   (load AFTER main.js)
   — do NOT load enhancements.js on this page; this file replaces it
========================================================= */

/* Broken image → gradient fallback (runs before images finish loading) */

document.addEventListener("error", event => {

    const target = event.target;

    if (target && target.tagName === "IMG" && target.parentElement) {

        target.parentElement.classList.add("img-failed");

    }

}, true);


document.addEventListener("DOMContentLoaded", () => {

    const $  = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer  = matchMedia("(hover: hover) and (pointer: fine)").matches;


    /* =====================================================
       HERO VIDEO
    ===================================================== */

    const hero        = $(".hero-home2");
    const heroWrap    = $(".hero-image-wrap");
    const heroVideo   = $(".hero-video");
    const videoToggle = $(".video-toggle");

    if (heroVideo && heroWrap) {

        let userPaused = false;

        heroVideo.muted = true;

        const setToggle = playing => {

            videoToggle?.classList.toggle("paused", !playing);

            videoToggle?.setAttribute(
                "aria-label",
                playing ? "Pause video" : "Play video"
            );

        };

        heroVideo.addEventListener("play",  () => setToggle(true));
        heroVideo.addEventListener("pause", () => setToggle(false));

        heroVideo.addEventListener("playing", () => {
            heroWrap.classList.add("video-ready");
        });

        /* If the file is missing, the photo underneath simply stays visible */

        heroVideo.addEventListener("error", () => {
            heroWrap.classList.remove("video-ready");
        }, true);

        if (reduceMotion) {

            userPaused = true;
            setToggle(false);

        } else {

            heroVideo.play().catch(() => {});

        }

        videoToggle?.addEventListener("click", () => {

            if (heroVideo.paused) {

                userPaused = false;
                heroVideo.play().catch(() => {});

            } else {

                userPaused = true;
                heroVideo.pause();

            }

        });

        /* pause when hero is off-screen */

        new IntersectionObserver(([entry]) => {

            if (userPaused) return;

            if (entry.isIntersecting) {
                heroVideo.play().catch(() => {});
            } else {
                heroVideo.pause();
            }

        }, { threshold: 0.05 }).observe(heroWrap);

    }


    /* =====================================================
       HERO WORD ANIMATION
    ===================================================== */

    const heroTitle = $(".hero-content h1");

    if (heroTitle) {

        $$(".w", heroTitle).forEach((word, index) => {
            word.style.setProperty("--i", index);
        });

        const reveal = () => heroTitle.classList.add("is-in");

        if (document.readyState === "complete") {
            setTimeout(reveal, 500);
        } else {
            addEventListener("load", () => setTimeout(reveal, 600));
        }

        setTimeout(reveal, 3500); /* safety net */

    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursorGlow = $(".cursor-glow");

    if (cursorGlow && finePointer && !reduceMotion) {

        let gx = 0, gy = 0, tx = 0, ty = 0;

        addEventListener("pointermove", event => {

            tx = event.clientX;
            ty = event.clientY;

            cursorGlow.classList.add("on");

        }, { passive: true });

        document.documentElement.addEventListener("pointerleave", () => {
            cursorGlow.classList.remove("on");
        });

        (function loop() {

            gx += (tx - gx) * 0.12;
            gy += (ty - gy) * 0.12;

            cursorGlow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;

            requestAnimationFrame(loop);

        })();

    }


    /* =====================================================
       HERO PARALLAX (mouse + scroll)
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

        $$(".btn-primary, .btn-secondary, .btn-outline, .btn-light").forEach(button => {

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
       IMAGING EXPLORER
    ===================================================== */

    const explorerTabs = $$(".explorer-tab");
    const scanArts     = $$("[data-scan-art]");
    const scanPhotos   = $$("[data-scan-photo]");
    const scanPanels   = $$("[data-scan-panel]");
    const explorerTag  = $(".explorer-tag");

    const tagText = {
        mri:        "MRI · FIELD ACTIVE",
        ct:         "CT · GANTRY ROTATING",
        ultrasound: "ULTRASOUND · PROBE LIVE"
    };

    function selectScan(id, moveFocus = false) {

        explorerTabs.forEach(tab => {

            const active = tab.dataset.scan === id;

            tab.setAttribute("aria-selected", active);
            tab.tabIndex = active ? 0 : -1;

            if (active && moveFocus) tab.focus();

        });

        scanArts.forEach(art => art.classList.toggle("active", art.dataset.scanArt === id));
        scanPhotos.forEach(photo => photo.classList.toggle("active", photo.dataset.scanPhoto === id));
        scanPanels.forEach(panel => { panel.hidden = panel.dataset.scanPanel !== id; });

        if (explorerTag) explorerTag.textContent = tagText[id] || "SYSTEM ONLINE";

    }

    explorerTabs.forEach((tab, index) => {

        tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;

        tab.addEventListener("click", () => selectScan(tab.dataset.scan));

        tab.addEventListener("keydown", event => {

            let next = null;

            if (event.key === "ArrowRight") next = (index + 1) % explorerTabs.length;
            if (event.key === "ArrowLeft")  next = (index - 1 + explorerTabs.length) % explorerTabs.length;
            if (event.key === "Home")       next = 0;
            if (event.key === "End")        next = explorerTabs.length - 1;

            if (next === null) return;

            event.preventDefault();
            selectScan(explorerTabs[next].dataset.scan, true);

        });

    });


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const lightbox = $("#lightbox");

    if (lightbox) {

        const lbImage   = $("img", lightbox);
        const lbCaption = $(".lightbox-caption", lightbox);
        const lbClose   = $(".lightbox-close", lightbox);

        let lastFocus = null;

        const openLightbox = item => {

            const img = $("img", item);

            if (!img) return;

            lastFocus = document.activeElement;

            lbImage.src = item.dataset.full || img.currentSrc || img.src;
            lbImage.alt = img.alt;

            lbCaption.textContent = $("figcaption span", item)?.textContent || img.alt;

            lightbox.hidden = false;
            document.body.style.overflow = "hidden";

            lbClose.focus();

        };

        const closeLightbox = () => {

            if (lightbox.hidden) return;

            lightbox.hidden = true;
            lbImage.removeAttribute("src");
            document.body.style.overflow = "";

            lastFocus?.focus?.();

        };

        $$(".gallery-item").forEach(item => {

            item.addEventListener("click", () => openLightbox(item));

            item.addEventListener("keydown", event => {

                if (event.key === "Enter" || event.key === " ") {

                    event.preventDefault();
                    openLightbox(item);

                }

            });

        });

        lbClose.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) closeLightbox();
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeLightbox();
        });

    }


    /* =====================================================
       PREPARATION CHECKLIST
    ===================================================== */

    const prepInputs     = $$(".prep-list input");
    const prepBar        = $(".prep-ring .bar");
    const prepPercentage = $(".prep-count strong");
    const prepLabel      = $(".prep-count span");
    const prepDone       = $(".prep-done");

    const circumference = 2 * Math.PI * 52;

    if (prepBar) {

        prepBar.style.strokeDasharray = circumference;
        prepBar.style.strokeDashoffset = circumference;

    }

    function updateChecklist() {

        if (!prepInputs.length) return;

        const completed  = prepInputs.filter(input => input.checked).length;
        const percentage = Math.round((completed / prepInputs.length) * 100);

        if (prepPercentage) prepPercentage.textContent = `${percentage}%`;
        if (prepLabel) prepLabel.textContent = percentage === 100 ? "complete" : "ready";

        if (prepBar) {
            prepBar.style.strokeDashoffset = circumference * (1 - percentage / 100);
        }

        prepDone?.classList.toggle("show", percentage === 100);

    }

    prepInputs.forEach(input => input.addEventListener("change", updateChecklist));

    updateChecklist();


    /* =====================================================
       OPEN / CLOSED STATUS  (Chennai time)
    ===================================================== */

    const openBadge = $("[data-open-status]");
    const hourItems = $$(".hours-list li[data-day]");

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

        const day  = dayMap[get("weekday")];
        const hour = Number(get("hour")) + Number(get("minute")) / 60;

        /* same hours as the list on the page */
        const hours = {
            0: null,
            1: [8, 20], 2: [8, 20], 3: [8, 20], 4: [8, 20], 5: [8, 20],
            6: [9, 16]
        };

        const today  = hours[day];
        const isOpen = !!today && hour >= today[0] && hour < today[1];

        openBadge.classList.remove("is-open", "is-closed");

        if (isOpen) {

            openBadge.classList.add("is-open");
            openBadge.textContent = `OPEN NOW · UNTIL ${today[1] > 12 ? today[1] - 12 : today[1]}:00 PM`;

        } else {

            openBadge.classList.add("is-closed");
            openBadge.textContent = "CURRENTLY CLOSED";

        }

        hourItems.forEach(item => {
            item.classList.toggle("today", Number(item.dataset.day) === day);
        });

    }


    /* =====================================================
       SCROLL PROGRESS · BACK TO TOP · HERO SCROLL PARALLAX
    ===================================================== */

    const progressBar = $(".scroll-progress");
    const topButton   = $(".fab-top");

    let ticking = false;

    function onScroll() {

        const max = document.documentElement.scrollHeight - innerHeight;

        progressBar?.style.setProperty("--progress", max > 0 ? (scrollY / max).toFixed(4) : 0);

        topButton?.classList.toggle("show", scrollY > 600);

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

    topButton?.addEventListener("click", () => {
        scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });


    /* =====================================================
       ICONS (safety net for anything added late)
    ===================================================== */

    if (window.lucide) lucide.createIcons();

});