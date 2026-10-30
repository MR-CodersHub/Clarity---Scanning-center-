/* =========================================================
   CLARITY IMAGING CENTER
   BLOG PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       BLOG ARTICLE DATA
    ===================================================== */

    const articles = {

        mri: {

            category: "MRI GUIDE",

            date: "06 Oct 2026",

            time: "6 min read",

            title:
                "MRI Explained: What Happens Inside the Scanner?",

            image:
                "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=85",

            alt:
                "MRI diagnostic imaging equipment",

            body: `
                <p>
                    Magnetic Resonance Imaging, commonly called MRI,
                    uses a powerful magnetic field and radio waves
                    to create detailed images of structures inside
                    the body.
                </p>

                <h3>What happens during an MRI?</h3>

                <p>
                    You will usually lie on a movable examination
                    table. The table then moves into the scanner.
                    Depending on the body area being examined,
                    a special device may be positioned around that area.
                </p>

                <p>
                    MRI scanners can make loud tapping, knocking and
                    humming sounds while images are being captured.
                    Ear protection is normally provided.
                </p>

                <h3>How can you prepare?</h3>

                <ul>
                    <li>Follow any fasting instructions provided.</li>
                    <li>Tell the imaging team about metal implants.</li>
                    <li>Remove metal objects before entering the scan room.</li>
                    <li>Inform the team if you are uncomfortable in enclosed spaces.</li>
                </ul>

                <p>
                    Your imaging team will explain the procedure and
                    answer questions before the scan begins.
                </p>
            `
        },


        ct: {

            category: "CT SCAN",

            date: "03 Oct 2026",

            time: "5 min read",

            title:
                "CT Scan vs X-Ray: Why Are They Different?",

            image:
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85",

            alt:
                "CT scan medical imaging",

            body: `
                <p>
                    Both X-rays and CT scans use X-ray technology,
                    but they produce images in different ways.
                    A conventional X-ray creates a flat image,
                    while CT produces cross-sectional images.
                </p>

                <h3>Why does CT provide more detail?</h3>

                <p>
                    During a CT examination, the scanner collects
                    multiple X-ray measurements from different
                    angles. A computer processes this information
                    to create detailed slices through the body.
                </p>

                <h3>When might CT be useful?</h3>

                <p>
                    CT can be useful when doctors need a detailed
                    view of bones, organs, blood vessels or internal
                    structures, depending on the clinical situation.
                </p>

                <p>
                    The appropriate examination is determined by
                    the referring doctor based on the patient's
                    symptoms, history and clinical question.
                </p>
            `
        },


        ultrasound: {

            category: "ULTRASOUND",

            date: "30 Sep 2026",

            time: "4 min read",

            title:
                "Ultrasound: More Than Just Pregnancy Imaging",

            image:
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=85",

            alt:
                "Ultrasound examination",

            body: `
                <p>
                    Ultrasound uses high-frequency sound waves to
                    create real-time images of structures inside
                    the body. It does not use ionizing radiation.
                </p>

                <h3>What can ultrasound examine?</h3>

                <p>
                    Depending on the examination, ultrasound can
                    help assess organs, soft tissues, blood flow
                    and other structures.
                </p>

                <p>
                    Doppler ultrasound can also be used to evaluate
                    the movement of blood through certain vessels.
                </p>

                <h3>Why is ultrasound useful?</h3>

                <p>
                    It can provide real-time imaging and is often
                    used for examinations where movement and
                    soft-tissue information are important.
                </p>

                <p>
                    Your healthcare provider will determine whether
                    ultrasound is appropriate for your specific
                    clinical question.
                </p>
            `
        },


        preparation: {

            category: "PREPARATION",

            date: "26 Sep 2026",

            time: "7 min read",

            title:
                "Before Your Scan: A Practical Preparation Checklist",

            image:
                "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1000&q=85",

            alt:
                "Patient preparing for medical examination",

            body: `
                <p>
                    Being prepared for an imaging appointment can
                    make the experience smoother. Preparation
                    requirements vary depending on the examination.
                </p>

                <h3>Before leaving home</h3>

                <ul>
                    <li>Check the appointment time and location.</li>
                    <li>Carry your referral or required documents.</li>
                    <li>Bring previous relevant imaging reports when requested.</li>
                    <li>Follow any fasting instructions given by the center.</li>
                </ul>

                <h3>What should you wear?</h3>

                <p>
                    Comfortable clothing is generally helpful.
                    For examinations involving strong magnetic
                    fields, additional clothing or accessory
                    restrictions may apply.
                </p>

                <h3>Ask questions</h3>

                <p>
                    If you are unsure about preparation instructions,
                    contact the imaging center before your appointment
                    rather than guessing.
                </p>
            `
        },


        contrast: {

            category: "PATIENT GUIDE",

            date: "22 Sep 2026",

            time: "6 min read",

            title:
                "What Is Contrast? Understanding Contrast-Enhanced Scans",

            image:
                "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1000&q=85",

            alt:
                "Radiology team preparing imaging procedure",

            body: `
                <p>
                    Contrast agents are substances used during
                    certain imaging examinations to make particular
                    tissues or structures easier to see.
                </p>

                <h3>Why might contrast be used?</h3>

                <p>
                    Some abnormalities or structures may be easier
                    to evaluate when contrast improves the difference
                    between tissues on the resulting images.
                </p>

                <h3>What should you tell the imaging team?</h3>

                <p>
                    Always provide relevant medical information
                    requested by your healthcare team, including
                    previous reactions to contrast agents and
                    information about medications or medical conditions.
                </p>

                <p>
                    Your imaging team will explain whether contrast
                    is needed and what preparation, if any, is required.
                </p>
            `
        },


        report: {

            category: "REPORTS",

            date: "18 Sep 2026",

            time: "5 min read",

            title:
                "How to Read a Radiology Report Without Feeling Lost",

            image:
                "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=85",

            alt:
                "Healthcare professional reviewing medical report",

            body: `
                <p>
                    Radiology reports contain medical terminology
                    that can sometimes feel difficult to understand.
                    Learning the basic structure can make the report
                    easier to follow.
                </p>

                <h3>Common sections</h3>

                <p>
                    A report may include information about the
                    examination performed, clinical history,
                    findings and an impression or conclusion.
                </p>

                <h3>What is the impression?</h3>

                <p>
                    The impression generally summarizes the most
                    important findings from the examination and
                    may help the referring clinician understand
                    the overall result.
                </p>

                <p>
                    Avoid interpreting individual phrases in isolation.
                    Your doctor or qualified healthcare professional
                    can explain what the report means in the context
                    of your symptoms and medical history.
                </p>
            `
        }

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const modal =
        document.getElementById("articleModal");

    const closeButton =
        document.getElementById("articleModalClose");

    const modalImage =
        document.getElementById("modalArticleImage");

    const modalCategory =
        document.getElementById("modalArticleCategory");

    const modalDate =
        document.getElementById("modalArticleDate");

    const modalTime =
        document.getElementById("modalArticleTime");

    const modalTitle =
        document.getElementById("modalArticleTitle");

    const modalBody =
        document.getElementById("modalArticleBody");


    /* =====================================================
       OPEN ARTICLE
    ===================================================== */

    function openArticle(articleId) {

        const article =
            articles[articleId];

        if (!article || !modal) return;


        modalImage.src =
            article.image;

        modalImage.alt =
            article.alt;

        modalCategory.textContent =
            article.category;

        modalDate.innerHTML =
            `<i data-lucide="calendar"></i> ${article.date}`;

        modalTime.innerHTML =
            `<i data-lucide="clock-3"></i> ${article.time}`;

        modalTitle.textContent =
            article.title;

        modalBody.innerHTML =
            article.body;


        if (window.lucide) {
            lucide.createIcons();
        }


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";


        /* Move focus to close button */

        setTimeout(() => {
            closeButton?.focus();
        }, 100);

    }


    /* =====================================================
       CLOSE ARTICLE
    ===================================================== */

    function closeArticle() {

        if (!modal) return;

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       READ ARTICLE BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".read-article")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const articleId =
                        button.dataset.article;

                    openArticle(articleId);

                }
            );

        });


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    closeButton?.addEventListener(
        "click",
        closeArticle
    );


    /* =====================================================
       OUTSIDE CLICK
    ===================================================== */

    modal?.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeArticle();

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal?.classList.contains("active")
            ) {

                closeArticle();

            }

        }
    );


    /* =====================================================
       PREVENT MODAL BODY CLICK FROM CLOSING
    ===================================================== */

    document
        .querySelector(".article-modal-box")
        ?.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );


    /* =====================================================
       FAQ — MAIN.JS ALSO SUPPORTS THIS
       This extra accessibility handling keeps button state
       clear without changing main.js.
    ===================================================== */

    document
        .querySelectorAll(".faq-question")
        .forEach(question => {

            question.addEventListener(
                "click",
                () => {

                    const item =
                        question.closest(".faq-item");

                    if (!item) return;

                    const isOpen =
                        item.classList.contains("open");

                    question.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );

                }
            );

        });

});