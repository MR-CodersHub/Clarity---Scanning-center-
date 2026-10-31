/* =========================================================
   CLARITY IMAGING CENTER
   SERVICES PAGE INTERACTIVE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. LUCIDE ICONS INITIALIZATION
    ===================================================== */
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }


    /* =====================================================
       2. MODALITY COMPARISON MATRIX TABS
    ===================================================== */
    const matrixTabs = document.querySelectorAll(".matrix-tab-btn");
    const matrixPanels = document.querySelectorAll(".matrix-panel");

    function switchMatrix(matrixKey) {
        matrixTabs.forEach(tab => {
            const isActive = tab.dataset.matrix === matrixKey;
            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        matrixPanels.forEach(panel => {
            const isActive = panel.dataset.matrixPanel === matrixKey;
            panel.classList.toggle("active", isActive);
        });

        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    matrixTabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            const key = tab.dataset.matrix;
            if (key) switchMatrix(key);
        });

        // Keyboard arrow navigation
        tab.addEventListener("keydown", (e) => {
            let nextIndex = null;
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                nextIndex = (index + 1) % matrixTabs.length;
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                nextIndex = (index - 1 + matrixTabs.length) % matrixTabs.length;
            } else if (e.key === "Home") {
                nextIndex = 0;
            } else if (e.key === "End") {
                nextIndex = matrixTabs.length - 1;
            }

            if (nextIndex !== null) {
                e.preventDefault();
                matrixTabs[nextIndex].click();
                matrixTabs[nextIndex].focus();
            }
        });
    });


    /* =====================================================
       3. CATALOG CATEGORY FILTERING
    ===================================================== */
    const filterPills = document.querySelectorAll(".filter-pill");
    const serviceCards = document.querySelectorAll(".bento-service-card");

    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");

            const filter = pill.dataset.filter;

            serviceCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === "all" || category === filter) {
                    card.style.display = "";
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });


    /* =====================================================
       4. FAQ ACCORDION (SMOOTH EXPAND/COLLAPSE)
    ===================================================== */
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const currentItem = question.closest(".faq-item");
            if (!currentItem) return;

            const isOpen = currentItem.classList.contains("open");

            // Close all items
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("open");
                const btn = item.querySelector(".faq-question");
                if (btn) btn.setAttribute("aria-expanded", "false");
            });

            // Toggle current item
            if (!isOpen) {
                currentItem.classList.add("open");
                question.setAttribute("aria-expanded", "true");
            }
        });
    });


    /* =====================================================
       5. SMOOTH ANCHOR SCROLLING
    ===================================================== */
    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });


    /* =====================================================
       6. CLINICAL CONSOLE HUD MARKER INTERACTION
    ===================================================== */
    const hudMarkers = document.querySelectorAll(".hud-marker");
    const telemetryStrength = document.querySelector(".console-telemetry-bar strong");

    hudMarkers.forEach(marker => {
        marker.addEventListener("mouseenter", () => {
            const label = marker.querySelector(".marker-label");
            if (label && telemetryStrength) {
                marker.style.transform = "scale(1.15)";
            }
        });

        marker.addEventListener("mouseleave", () => {
            marker.style.transform = "";
        });
    });

});
