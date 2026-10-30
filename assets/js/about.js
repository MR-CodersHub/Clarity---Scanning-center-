/* =========================================================
   CLARITY IMAGING CENTER
   ABOUT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LUCIDE ICONS
    ====================================================== */

    if (window.lucide) {
        lucide.createIcons();
    }


    /* =====================================================
       HERO VIDEO
    ====================================================== */

    const heroVideo = document.getElementById("aboutHeroVideo");
    const videoToggle = document.getElementById("aboutVideoToggle");
    const videoStatus = document.getElementById("videoStatus");


    if (heroVideo) {

        heroVideo.addEventListener("canplay", () => {

            heroVideo.classList.add("video-ready");

            if (videoStatus) {
                videoStatus.textContent = "Diagnostic environment";
            }

        });


        heroVideo.addEventListener("error", () => {

            heroVideo.classList.add("video-error");

            if (videoStatus) {
                videoStatus.textContent = "Clarity Imaging Center";
            }

        });


        /*
         * Some browsers can block autoplay.
         * Muted autoplay is normally allowed,
         * but this fallback attempts to start it.
         */

        const startVideo = async () => {

            try {

                await heroVideo.play();

            } catch (error) {

                heroVideo.classList.add("video-error");

                if (videoStatus) {
                    videoStatus.textContent = "Clarity Imaging Center";
                }

            }

        };


        startVideo();


        /* =================================================
           VIDEO PLAY / PAUSE
        ================================================== */

        if (videoToggle) {

            videoToggle.addEventListener("click", () => {

                const icon = videoToggle.querySelector("svg");

                if (heroVideo.paused) {

                    heroVideo.play();

                    videoToggle.setAttribute(
                        "aria-label",
                        "Pause background video"
                    );

                    if (videoStatus) {
                        videoStatus.textContent =
                            "Diagnostic environment";
                    }

                    if (icon) {
                        icon.outerHTML =
                            '<i data-lucide="pause"></i>';

                        if (window.lucide) {
                            lucide.createIcons();
                        }
                    }

                } else {

                    heroVideo.pause();

                    videoToggle.setAttribute(
                        "aria-label",
                        "Play background video"
                    );

                    if (videoStatus) {
                        videoStatus.textContent =
                            "Video paused";
                    }

                    if (icon) {
                        icon.outerHTML =
                            '<i data-lucide="play"></i>';

                        if (window.lucide) {
                            lucide.createIcons();
                        }
                    }

                }

            });

        }

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements = document.querySelectorAll(
        ".about-reveal, .about-reveal-left, .about-reveal-right"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       NUMBER COUNTERS
    ====================================================== */

    const counters = document.querySelectorAll(
        ".about-counter"
    );


    const animateCounter = (element) => {

        const target = Number(
            element.dataset.target || 0
        );

        const suffix =
            element.dataset.suffix || "";


        const duration = 1700;

        const startTime = performance.now();


        const update = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );


            /*
             * Ease-out cubic
             */

            const eased =
                1 - Math.pow(1 - progress, 3);


            const currentValue =
                Math.floor(target * eased);


            element.textContent =
                currentValue.toLocaleString("en-IN") +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    target.toLocaleString("en-IN") +
                    suffix;

            }

        };


        requestAnimationFrame(update);

    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.4
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(counter => {

            const target =
                Number(counter.dataset.target || 0);

            const suffix =
                counter.dataset.suffix || "";

            counter.textContent =
                target.toLocaleString("en-IN") +
                suffix;

        });

    }


    /* =====================================================
       FAQ ACCORDION
    ====================================================== */

    const faqItems =
        document.querySelectorAll(
            ".about-faq-section .faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");


        if (!question) {
            return;
        }


        question.addEventListener("click", () => {

            const currentlyOpen =
                item.classList.contains("is-open");


            /*
             * Close other FAQ items
             */

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove(
                        "is-open"
                    );


                    const otherQuestion =
                        otherItem.querySelector(
                            ".faq-question"
                        );


                    if (otherQuestion) {

                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            });


            /*
             * Toggle current FAQ
             */

            if (currentlyOpen) {

                item.classList.remove("is-open");

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                item.classList.add("is-open");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* =====================================================
       GALLERY LIGHTBOX
    ====================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    const lightbox =
        document.getElementById(
            "aboutLightbox"
        );


    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    const lightboxCaption =
        document.getElementById(
            "lightboxCaption"
        );


    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    const openLightbox = (item) => {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        const image =
            item.dataset.image;


        const title =
            item.dataset.title || "";


        lightboxImage.src = image;

        lightboxImage.alt = title;

        lightboxCaption.textContent = title;


        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow = "hidden";

    };


    const closeLightbox = () => {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove("open");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow = "";

    };


    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            openLightbox(item);

        });

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (backToTop) {

        backToTop.addEventListener(
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
       LOGIN / SIGNUP MODALS
    ====================================================== */

    const loginModal =
        document.getElementById(
            "loginModal"
        );


    const signupModal =
        document.getElementById(
            "signupModal"
        );


    const openModal = modal => {

        if (!modal) {
            return;
        }


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow = "hidden";

    };


    const closeModal = modal => {

        if (!modal) {
            return;
        }


        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow = "";

    };


    /* Profile dropdown buttons */

    document.querySelectorAll(
        "[data-open-login]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openModal(loginModal);

            }
        );

    });


    document.querySelectorAll(
        "[data-open-signup]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openModal(signupModal);

            }
        );

    });


    /* Close login */

    document.querySelectorAll(
        "[data-close-login]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(loginModal);

            }
        );

    });


    /* Close signup */

    document.querySelectorAll(
        "[data-close-signup]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(signupModal);

            }
        );

    });


    /* Switch login -> signup */

    document.querySelectorAll(
        "[data-switch-signup]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(loginModal);

                setTimeout(() => {

                    openModal(signupModal);

                }, 150);

            }
        );

    });


    /* Switch signup -> login */

    document.querySelectorAll(
        "[data-switch-login]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(signupModal);

                setTimeout(() => {

                    openModal(loginModal);

                }, 150);

            }
        );

    });


    /* Modal overlay close */

    document.querySelectorAll(
        ".auth-modal-overlay"
    ).forEach(overlay => {

        overlay.addEventListener(
            "click",
            () => {

                closeModal(loginModal);
                closeModal(signupModal);

            }
        );

    });


    /* =====================================================
       AUTH FORM DEMO
    ====================================================== */

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    const signupForm =
        document.getElementById(
            "signupForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                alert(
                    "Demo login submitted."
                );

            }
        );

    }


    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                alert(
                    "Demo account creation submitted."
                );

            }
        );

    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal(loginModal);
                closeModal(signupModal);

            }

        }
    );


    /* =====================================================
       RE-CREATE ICONS
    ====================================================== */

    if (window.lucide) {

        lucide.createIcons();

    }

});

/* =========================================================
   ABOUT PAGE: JS FIXES
   Load AFTER about.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- HERO VIDEO ----------
       Bugs fixed:
       - "error" never fires on <video> when <source> children fail
         (it fires on each <source>), so the fallback never ran.
       - "canplay" can fire before the listener is attached, leaving the
         video at opacity 0 forever.
       - Poster was invisible while video was hidden. */

    const video = document.getElementById("aboutHeroVideo");

    if (video) {
        const hero = video.closest(".about-hero");

        if (hero && video.poster) {
            hero.style.backgroundImage = `url("${video.poster}")`;
        }

        if (video.readyState >= 3) {
            video.classList.add("video-ready");
        }

        video.addEventListener("loadeddata", () => {
            video.classList.add("video-ready");
        });

        const sources = [...video.querySelectorAll("source")];

        sources.forEach(source => {
            source.addEventListener("error", () => {
                source.dataset.failed = "1";

                if (sources.every(s => s.dataset.failed)) {
                    video.classList.add("video-error");

                    const status = document.getElementById("videoStatus");
                    if (status) status.textContent = "Clarity Imaging Center";
                }
            });
        });

        /* Respect reduced motion: stop autoplay via the existing toggle
           so icon + label stay in sync. */
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTimeout(() => {
                const toggle = document.getElementById("aboutVideoToggle");
                if (!video.paused && toggle) toggle.click();
            }, 400);
        }
    }

    /* ---------- LIGHTBOX: focus + arrow-key browsing ---------- */

    const items = [...document.querySelectorAll(".gallery-item")];
    const lightbox = document.getElementById("aboutLightbox");
    const image = document.getElementById("lightboxImage");
    const caption = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");

    if (lightbox && image && caption && items.length) {
        let index = -1;
        let lastFocused = null;

        items.forEach((item, i) => {
            item.addEventListener("click", () => {
                index = i;
                lastFocused = item;
                setTimeout(() => closeBtn && closeBtn.focus(), 50);
            });
        });

        const step = direction => {
            index = (index + direction + items.length) % items.length;
            const item = items[index];

            image.src = item.dataset.image;
            image.alt = item.dataset.title || "";
            caption.textContent = item.dataset.title || "";
        };

        document.addEventListener("keydown", event => {
            if (!lightbox.classList.contains("open")) return;

            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);

            if (event.key === "Escape" && lastFocused) {
                lastFocused.focus();
            }
        });
    }

    /* ---------- MODALS: dialog semantics ---------- */

    document.querySelectorAll(".auth-modal-card").forEach(card => {
        card.setAttribute("role", "dialog");
        card.setAttribute("aria-modal", "true");
    });

    /* ---------- FAQ: aria-controls wiring ---------- */

    document.querySelectorAll(".about-faq-section .faq-item").forEach((item, i) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (question && answer) {
            answer.id = answer.id || `faqAnswer${i + 1}`;
            question.setAttribute("aria-controls", answer.id);
        }
    });

    /* ---------- Images: hide broken Unsplash tiles gracefully ---------- */

    document.querySelectorAll(".about-page img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.visibility = "hidden";
            if (img.parentElement) {
                img.parentElement.style.background = "var(--surface-soft, #eef3f4)";
            }
        });
    });

});


/* =========================================================
   CLARITY IMAGING CENTER
   SERVICES PAGE JAVASCRIPT (enhanced, full replacement)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;


    /* ---------- MODALITY TABS (with ARIA + keyboard) ---------- */

    const tabs = $$(".modality-btn");
    const panels = $$(".modality-panel");
    const list = $(".modality-selector");

    if (list) list.setAttribute("role", "tablist");

    tabs.forEach(b => {
        b.setAttribute("role", "tab");
        b.id = b.id || `tab-${b.dataset.modality}`;
    });

    panels.forEach(p => {
        p.setAttribute("role", "tabpanel");
        p.setAttribute("aria-labelledby", `tab-${p.dataset.panel}`);
    });

    function select(modality, focus = false) {

        tabs.forEach(b => {
            const on = b.dataset.modality === modality;

            b.classList.toggle("active", on);
            b.setAttribute("aria-selected", String(on));
            b.tabIndex = on ? 0 : -1;

            if (on && focus) b.focus();
        });

        panels.forEach(p => {
            p.classList.toggle("active", p.dataset.panel === modality);
        });
    }

    tabs.forEach((b, i) => {

        b.addEventListener("click", () => select(b.dataset.modality));

        b.addEventListener("keydown", e => {

            const step = {
                ArrowDown: 1, ArrowRight: 1,
                ArrowUp: -1, ArrowLeft: -1
            };

            let next = null;

            if (e.key in step) next = (i + step[e.key] + tabs.length) % tabs.length;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = tabs.length - 1;

            if (next === null) return;

            e.preventDefault();
            select(tabs[next].dataset.modality, true);
        });
    });

    if (tabs.length) select(tabs[0].dataset.modality);


    /* ---------- SERVICE CARDS: spotlight + image tilt ---------- */

    $$(".service-feature-card").forEach(card => {

        card.addEventListener("pointermove", e => {

            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;

            card.style.setProperty("--card-x", `${x}px`);
            card.style.setProperty("--card-y", `${y}px`);

            if (fine && !reduced) {
                card.style.setProperty("--ry", `${((x / r.width - 0.5) * 6).toFixed(2)}deg`);
                card.style.setProperty("--rx", `${((y / r.height - 0.5) * -6).toFixed(2)}deg`);
            }
        });

        card.addEventListener("pointerleave", () => {
            card.style.setProperty("--rx", "0deg");
            card.style.setProperty("--ry", "0deg");
        });
    });


    /* ---------- HERO PARALLAX ---------- */

    const hero = $(".services-hero");

    if (hero && fine && !reduced) {

        hero.addEventListener("pointermove", e => {

            const r = hero.getBoundingClientRect();

            hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
            hero.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        });
    }


    /* ---------- STAGGERED REVEAL FOR GRIDS ---------- */

    if ("IntersectionObserver" in window && !reduced) {

        const io = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const kids = [...entry.target.children];

                kids.forEach((k, i) => { k.style.transitionDelay = `${i * 90}ms`; });

                /* clear so hover effects are not delayed afterwards */
                setTimeout(() => kids.forEach(k => { k.style.transitionDelay = ""; }), 1400);

                obs.unobserve(entry.target);
            });

        }, { threshold: 0.15 });

        $$(".service-principles, .service-feature-grid, .experience-grid")
            .forEach(g => io.observe(g));
    }


    /* ---------- SMOOTH SCROLL TO SERVICES ---------- */

    $$('a[href="#services-grid"]').forEach(link => {

        link.addEventListener("click", e => {

            const target = document.getElementById("services-grid");

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: reduced ? "auto" : "smooth",
                block: "start"
            });
        });
    });

});