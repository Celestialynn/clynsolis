// ==========================================
// ClynSolis Portfolio Interactions
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // COPYRIGHT YEAR
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuToggle.textContent = "☰";

            });

        });

    }

    // SCROLL REVEAL ANIMATION
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        currentObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach((item) => {
            observer.observe(item);
        });

    } else {

        revealItems.forEach((item) => {
            item.classList.add("visible");
        });

    }

    // CERTIFICATE IMAGE POP-UP
    const certificateButtons = document.querySelectorAll(".certificate-view");

    const certificateModal = document.getElementById("certificateModal");

    const certificateClose = document.getElementById("certificateClose");

    const certificateTitle = document.getElementById("certificateTitle");

    const certificateImage = document.getElementById("certificateImage");

    // OPEN CERTIFICATE PREVIEW
    certificateButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const imagePath = button.dataset.image;
            const title = button.dataset.title || "Certificate Preview";

            if (
                !imagePath ||
                !certificateModal ||
                !certificateImage ||
                !certificateTitle
            ) {
                return;
            }

            certificateTitle.textContent = title;

            certificateImage.src = imagePath;
            certificateImage.alt = title;

            certificateModal.classList.add("active");

            certificateModal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";

        });

    });

    // CLOSE CERTIFICATE PREVIEW
    function closeCertificateModal() {

        if (!certificateModal || !certificateImage) {
            return;
        }

        certificateModal.classList.remove("active");

        certificateModal.setAttribute("aria-hidden", "true");

        certificateImage.src = "";

        document.body.style.overflow = "";

    }

    // CLOSE USING THE X BUTTON
    if (certificateClose) {

        certificateClose.addEventListener("click", closeCertificateModal);

    }

    // CLOSE WHEN CLICKING OUTSIDE THE CERTIFICATE
    if (certificateModal) {

        certificateModal.addEventListener("click", (event) => {

            if (event.target === certificateModal) {

                closeCertificateModal();

            }

        });

    }

    // CLOSE USING THE ESCAPE KEY
    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            certificateModal &&
            certificateModal.classList.contains("active")
        ) {

            closeCertificateModal();

        }

    });

});