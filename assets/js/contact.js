/* =========================================================
   CLARITY CONTACT PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const icons = () => window.lucide && lucide.createIcons();

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

    icons();


    /* =====================================================
       CONTACT FORM: inline validation (no alert())
    ===================================================== */

    const form = $("#contactForm");
    const success = $("#formSuccess");

    const rules = {
        fullName: v => v.length >= 2 || "Please enter your full name.",
        phone: v => /^[+()\d\s-]{8,16}$/.test(v) || "Enter a valid phone number.",
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
        service: v => !!v || "Please choose a service.",
        message: v => v.length >= 10 || "Please add a few more details."
    };

    function check(id) {

        const input = document.getElementById(id);

        if (!input) return true;

        const label = input.closest("label");
        const result = rules[id](input.value.trim());

        let error = label.querySelector(".field-error");

        if (result === true) {
            label.classList.remove("invalid");
            input.removeAttribute("aria-invalid");
            if (error) error.remove();
            return true;
        }

        label.classList.add("invalid");
        input.setAttribute("aria-invalid", "true");

        if (!error) {
            error = document.createElement("small");
            error.className = "field-error";
            error.setAttribute("role", "alert");
            label.appendChild(error);
        }

        error.textContent = result;
        return false;
    }

    if (form) {

        form.noValidate = true;

        const hints = { fullName: "name", phone: "tel", email: "email" };

        Object.entries(hints).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.autocomplete = value;
        });

        Object.keys(rules).forEach(id => {

            const el = document.getElementById(id);

            if (!el) return;

            el.addEventListener("blur", () => check(id));

            el.addEventListener("input", () => {
                if (el.closest("label").classList.contains("invalid")) check(id);
            });
        });

        /* message character counter */

        const message = $("#message");

        if (message) {

            message.maxLength = 500;

            const counter = document.createElement("small");
            counter.className = "char-count";
            counter.textContent = "0 / 500";
            message.closest("label").appendChild(counter);

            message.addEventListener("input", () => {
                counter.textContent = `${message.value.length} / 500`;
            });
        }

        form.addEventListener("submit", event => {

            event.preventDefault();

            const results = Object.keys(rules).map(check);

            if (results.includes(false)) {
                const firstBad = $(".invalid input, .invalid select, .invalid textarea", form);
                if (firstBad) firstBad.focus();
                return;
            }

            const button = $('button[type="submit"]', form);

            if (button) {
                button.disabled = true;
                button.setAttribute("aria-busy", "true");
                button.innerHTML = 'Sending... <i data-lucide="loader-circle"></i>';
                icons();
            }

            /* Demo only: replace this timeout with your real fetch()/backend call */
            setTimeout(() => {

                form.reset();

                const counter = $(".char-count", form);
                if (counter) counter.textContent = "0 / 500";

                if (success) {
                    success.setAttribute("role", "status");
                    success.classList.add("show");
                    setTimeout(() => success.classList.remove("show"), 9000);
                }

                if (button) {
                    button.disabled = false;
                    button.removeAttribute("aria-busy");
                    button.innerHTML = 'Send Enquiry <i data-lucide="arrow-right"></i>';
                    icons();
                }

            }, 900);
        });
    }


    /* =====================================================
       DATE: min = today (local date, not UTC)
    ===================================================== */

    const dateInput = $("#preferredDate");

    if (dateInput) {
        const d = new Date();
        const pad = n => String(n).padStart(2, "0");
        dateInput.min = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }


    /* =====================================================
       FAQ ACCORDION (smooth open and close, clean layout)
    ===================================================== */

    const faqItems = $$(".contact-faq-item");

    faqItems.forEach((item, i) => {

        const question = $(".contact-faq-question", item);
        const answer = $(".contact-faq-answer", item);

        if (!question || !answer) return;

        answer.id = answer.id || `contactFaq${i + 1}`;
        question.setAttribute("aria-controls", answer.id);
        question.setAttribute("aria-expanded", "false");

        question.addEventListener("click", () => {

            const wasOpen = item.classList.contains("open");

            faqItems.forEach(other => {
                other.classList.remove("open");
                const a = $(".contact-faq-answer", other);
                const q = $(".contact-faq-question", other);
                if (a) {
                    a.style.maxHeight = null;
                }
                if (q) {
                    q.setAttribute("aria-expanded", "false");
                }
            });

            if (!wasOpen) {
                item.classList.add("open");
                answer.style.maxHeight = `${answer.scrollHeight}px`;
                question.setAttribute("aria-expanded", "true");
            }
        });
    });

    window.addEventListener("resize", () => {
        faqItems.forEach(item => {
            if (!item.classList.contains("open")) return;
            const a = $(".contact-faq-answer", item);
            if (a) {
                a.style.maxHeight = `${a.scrollHeight}px`;
            }
        });
    });


    /* =====================================================
       MAP (Leaflet, with Google Maps iframe fallback)
    ===================================================== */

    const mapEl = $("#clarityMap");

    if (mapEl) {

        const query = "24 Health Avenue, Chennai, Tamil Nadu";

        if (typeof L === "undefined") {

            mapEl.innerHTML =
                `<iframe title="Map showing Clarity Imaging Center" loading="lazy"
                    src="https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed"></iframe>`;

        } else {

            /* Clear any existing Leaflet map container state */
            if (mapEl._leaflet_id) {
                mapEl._leaflet_id = null;
            }

            /* Clarity clinic coordinates */
            const here = [13.0827, 80.2707];

            const map = L.map("clarityMap", {
                scrollWheelZoom: false,
                zoomControl: true
            }).setView(here, 14);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
            }).addTo(map);

            const icon = L.divIcon({
                className: "clarity-map-marker",
                html: '<div class="marker-pulse"><div class="marker-core">+</div></div>',
                iconSize: [44, 44],
                iconAnchor: [22, 22],
                popupAnchor: [0, -22]
            });

            L.marker(here, { icon })
                .addTo(map)
                .bindPopup(`
                    <div class="clarity-popup">
                        <strong>Clarity Imaging Center</strong>
                        <span>24 Health Avenue,<br>Chennai, Tamil Nadu</span>
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}"
                           target="_blank" rel="noopener noreferrer">Get Directions</a>
                    </div>`)
                .openPopup();

            /* scroll-zoom hint, so the page never feels "stuck" on the map */

            const wrapper = mapEl.closest(".map-wrapper");

            if (wrapper) {

                const hint = document.createElement("div");
                hint.className = "map-hint";
                hint.textContent = "Click the map to enable scroll zoom";
                wrapper.appendChild(hint);

                map.once("click", () => {
                    map.scrollWheelZoom.enable();
                    hint.classList.add("hide");
                });

                /* keep tiles correct after reveal animation / layout changes */
                if ("ResizeObserver" in window) {
                    new ResizeObserver(() => map.invalidateSize()).observe(wrapper);
                }

                setTimeout(() => map.invalidateSize(), 150);
                setTimeout(() => map.invalidateSize(), 600);
                setTimeout(() => map.invalidateSize(), 1200);
            }

            window.addEventListener("resize", () => {
                map.invalidateSize();
            });
        }
    }


    /* =====================================================
       OPEN / CLOSED STATUS (clinic time, Asia/Kolkata)
    ===================================================== */

    const statusEl = $("#openStatus");
    const rows = $$(".hours-list > div");

    if (statusEl) {

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        /* [open hour, close hour] in 24h; null = closed. Keep in sync with the hours list in the HTML */
        const hours = {
            Mon: [8, 20], Tue: [8, 20], Wed: [8, 20], Thu: [8, 20],
            Fri: [8, 20], Sat: [8, 17], Sun: null
        };

        const fmt = h => `${((h + 11) % 12) + 1}:00 ${h >= 12 ? "PM" : "AM"}`;

        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
            hour12: false
        }).formatToParts(new Date());

        const get = type => parts.find(p => p.type === type).value;

        const today = get("weekday");
        const nowH = Number(get("hour")) % 24;
        const slot = hours[today];

        const isOpen = slot && nowH >= slot[0] && nowH < slot[1];

        let text;

        if (isOpen) {

            text = `Open now · closes ${fmt(slot[1])}`;

        } else if (slot && nowH < slot[0]) {

            text = `Closed · opens today ${fmt(slot[0])}`;

        } else {

            let i = (days.indexOf(today) + 1) % 7;

            while (!hours[days[i]]) i = (i + 1) % 7;

            text = `Closed · opens ${days[i]} ${fmt(hours[days[i]][0])}`;
        }

        statusEl.textContent = text;

        const pill = statusEl.closest(".open-status");

        if (pill) pill.classList.add(isOpen ? "is-open" : "is-closed");

        if (rows[days.indexOf(today)]) {
            rows[days.indexOf(today)].classList.add("today");
        }
    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero = $(".contact-hero");

    if (hero && fine && !reduced) {

        hero.addEventListener("pointermove", e => {

            const r = hero.getBoundingClientRect();

            hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
            hero.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        });
    }


    /* =====================================================
       STAGGERED REVEAL
    ===================================================== */

    if ("IntersectionObserver" in window && !reduced) {

        const io = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const kids = [...entry.target.children];

                kids.forEach((k, i) => { k.style.transitionDelay = `${i * 100}ms`; });

                setTimeout(() => kids.forEach(k => { k.style.transitionDelay = ""; }), 1400);

                obs.unobserve(entry.target);
            });

        }, { threshold: 0.15 });

        $$(".contact-info-grid, .faq-list").forEach(g => io.observe(g));
    }

});
