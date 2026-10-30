/* =========================================================
   CLARITY IMAGING CENTER
   SERVICES PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector, scope = document) =>
        scope.querySelector(selector);

    const $$ = (selector, scope = document) =>
        [...scope.querySelectorAll(selector)];


    /* =====================================================
       MODALITY SWITCHER
    ===================================================== */

    const modalityButtons =
        $$(".modality-btn");

    const modalityPanels =
        $$(".modality-panel");


    function selectModality(modality) {

        modalityButtons.forEach(button => {

            const isActive =
                button.dataset.modality === modality;

            button.classList.toggle(
                "active",
                isActive
            );

        });


        modalityPanels.forEach(panel => {

            const isActive =
                panel.dataset.panel === modality;

            panel.classList.toggle(
                "active",
                isActive
            );

        });

    }


    modalityButtons.forEach(button => {

        button.addEventListener("click", () => {

            const modality =
                button.dataset.modality;

            if (!modality) return;

            selectModality(modality);

        });

    });


    /* =====================================================
       KEYBOARD SUPPORT
    ===================================================== */

    modalityButtons.forEach((button, index) => {

        button.addEventListener(
            "keydown",
            event => {

                let nextIndex = null;


                if (event.key === "ArrowDown") {

                    nextIndex =
                        (index + 1) %
                        modalityButtons.length;

                }


                if (event.key === "ArrowUp") {

                    nextIndex =
                        (index - 1 +
                            modalityButtons.length) %
                        modalityButtons.length;

                }


                if (event.key === "Home") {

                    nextIndex = 0;

                }


                if (event.key === "End") {

                    nextIndex =
                        modalityButtons.length - 1;

                }


                if (nextIndex === null) return;


                event.preventDefault();


                const nextButton =
                    modalityButtons[nextIndex];

                const modality =
                    nextButton.dataset.modality;


                selectModality(modality);

                nextButton.focus();

            }
        );

    });


    /* =====================================================
       SERVICE CARD IMAGE TILT
    ===================================================== */

    const cards =
        $$(".service-feature-card");


    const canTilt =
        matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    const reducedMotion =
        matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (canTilt && !reducedMotion) {

        cards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (event.clientX - rect.left) /
                        rect.width -
                        0.5;


                    const y =
                        (event.clientY - rect.top) /
                        rect.height -
                        0.5;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${y * -2}deg)
                         rotateY(${x * 2}deg)
                         translateY(-7px)`;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       SERVICE CARD SPOTLIGHT
    ===================================================== */

    cards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                card.style.setProperty(
                    "--card-x",
                    `${event.clientX - rect.left}px`
                );


                card.style.setProperty(
                    "--card-y",
                    `${event.clientY - rect.top}px`
                );

            }
        );

    });


    /* =====================================================
       ACTIVE SERVICE URL HIGHLIGHT
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (currentPage === "services.html") {

        $$(".desktop-nav a").forEach(link => {

            const href =
                link.getAttribute("href");

            if (href === "services.html") {

                link.classList.add("active");

            }

        });

    }


    /* =====================================================
       SMOOTH SCROLL — SERVICES CTA
    ===================================================== */

    $$('a[href="#services-grid"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const target =
                        document.getElementById(
                            "services-grid"
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       ESCAPE — RESET MODALITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            selectModality("mri");

        }
    );

});