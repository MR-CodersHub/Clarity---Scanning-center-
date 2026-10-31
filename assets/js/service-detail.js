/* =========================================================
   CLARITY IMAGING CENTER
   SERVICE DETAIL PAGES JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* 1. LUCIDE ICONS REFRESH */
    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }
    refreshIcons();

    window.addEventListener("load", () => {
        refreshIcons();
    });

    /* 2. FAQ ACCORDION (EXPAND / COLLAPSE) */
    const faqItems = document.querySelectorAll(".faq-accordion-item");
    faqItems.forEach(item => {
        const btn = item.querySelector(".faq-toggle-btn");
        if (btn) {
            btn.addEventListener("click", () => {
                const wasOpen = item.classList.contains("open");
                faqItems.forEach(other => other.classList.remove("open"));
                if (!wasOpen) {
                    item.classList.add("open");
                }
                refreshIcons();
            });
        }
    });

    /* 3. SMOOTH SCROLL FOR IN-PAGE ANCHORS */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            const targetId = anchor.getAttribute("href");
            if (targetId && targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

});
