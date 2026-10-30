/* =========================================================
   CLARITY IMAGING CENTER
   MRI PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LUCIDE
    ===================================================== */

    function refreshIcons() {

        if (window.lucide) {
            lucide.createIcons();
        }

    }

    refreshIcons();


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader =
        document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            pageLoader?.classList.add("hidden");

        }, 450);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header =
        document.getElementById("siteHeader");

    function handleHeaderScroll() {

        header?.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }

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

        const isOpen =
            mobileNav?.classList.toggle("open");

        menuToggle.innerHTML =
            isOpen
                ? `<i data-lucide="x"></i>`
                : `<i data-lucide="menu"></i>`;

        refreshIcons();

    });


    mobileNav
        ?.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                if (menuToggle) {

                    menuToggle.innerHTML =
                        `<i data-lucide="menu"></i>`;

                    refreshIcons();

                }

            });

        });


    /* =====================================================
       THEME
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

        refreshIcons();

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
       RTL / LTR
    ===================================================== */

    const rtlToggle =
        document.getElementById("rtlToggle");


    const savedDirection =
        localStorage.getItem("clarity-direction");


    document.documentElement.dir =
        savedDirection === "rtl"
            ? "rtl"
            : "ltr";


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

        const direction =
            isRTL ? "ltr" : "rtl";

        document.documentElement.dir =
            direction;

        localStorage.setItem(
            "clarity-direction",
            direction
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


    profileBtn?.addEventListener("click", event => {

        event.stopPropagation();

        profileDropdown?.classList.toggle("open");

    });


    document.addEventListener("click", event => {

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


    function openModal(id) {

        const modal =
            document.getElementById(id);

        if (!modal) return;

        modalOverlays.forEach(item => {

            item.classList.remove("active");

        });

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

        profileDropdown?.classList.remove("open");

        refreshIcons();

    }


    function closeModals() {

        modalOverlays.forEach(item => {

            item.classList.remove("active");

        });

        document.body.style.overflow = "";

    }


    modalButtons.forEach(button => {

        button.addEventListener("click", () => {

            openModal(button.dataset.modal);

        });

    });


    document
        .querySelectorAll(".modal-close")
        .forEach(button => {

            button.addEventListener(
                "click",
                closeModals
            );

        });


    modalOverlays.forEach(overlay => {

        overlay.addEventListener("click", event => {

            if (event.target === overlay) {

                closeModals();

            }

        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeModals();

            profileDropdown?.classList.remove("open");

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
                    form.querySelector(
                        "button[type='submit']"
                    );

                if (!button) return;

                const originalHTML =
                    button.innerHTML;

                button.innerHTML =
                    `<i data-lucide="check"></i> Success`;

                button.style.pointerEvents = "none";

                refreshIcons();


                setTimeout(() => {

                    button.innerHTML =
                        originalHTML;

                    button.style.pointerEvents = "";

                    refreshIcons();

                    closeModals();

                    form.reset();

                }, 1200);

            });

        });


    /* =====================================================
       FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        question?.addEventListener("click", () => {

            const wasOpen =
                item.classList.contains("open");


            faqItems.forEach(other => {

                other.classList.remove("open");

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


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reduceMotion) {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    } else {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


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

        const duration = 1500;

        const start =
            performance.now();


        function update(now) {

            const elapsed =
                now - start;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const current =
                Math.floor(
                    target * eased
                );


            element.textContent =
                current.toLocaleString() +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(update);

            }

        }


        requestAnimationFrame(update);

    }


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: .5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const id =
                    link.getAttribute("href");

                if (
                    !id ||
                    id === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        reduceMotion
                            ? "auto"
                            : "smooth",

                    block: "start"
                });

            });

        });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    function updateBackToTop() {

        backToTop?.classList.toggle(
            "show",
            window.scrollY > 650
        );

    }

    updateBackToTop();

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    backToTop?.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior:
                reduceMotion
                    ? "auto"
                    : "smooth"
        });

    });


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (finePointer && !reduceMotion) {

        document
            .querySelectorAll(
                ".btn-primary, .btn-secondary, .btn-light"
            )
            .forEach(button => {

                button.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            button.getBoundingClientRect();

                        const x =
                            (
                                event.clientX -
                                rect.left -
                                rect.width / 2
                            ) * .08;

                        const y =
                            (
                                event.clientY -
                                rect.top -
                                rect.height / 2
                            ) * .10;

                        button.style.translate =
                            `${x}px ${y}px`;

                    }
                );


                button.addEventListener(
                    "pointerleave",
                    () => {

                        button.style.translate = "";

                    }
                );

            });

    }

});