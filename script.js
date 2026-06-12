window.document.addEventListener("DOMContentLoaded", () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const WARNING_COLOR = rootStyles.getPropertyValue('--warning').trim();
    const primaryColor = rootStyles.getPropertyValue('--primary').trim();
    const successColor = rootStyles.getPropertyValue('--success').trim();
    const btnRegister = document.querySelector(".btn-register");
    const btnLogin = document.querySelector(".btn-login");
    const formRegister = document.getElementById("register-form");
    const formLogin = document.getElementById("login-form");
    const toggleButtons = document.querySelectorAll(".toggle-password");

    const passwordInput = document.getElementById("reg-password");
    const strengthBar = document.getElementById("strength-bar");

    const confirmInput = document.getElementById("reg-confirm");

    const reqLength = document.getElementById("req-length");
    const reqLowercase = document.getElementById("req-lowercase");
    const reqUppercase = document.getElementById("req-uppercase");
    const reqNumber = document.getElementById("req-number");
    const reqSpecial = document.getElementById("req-special");
    const reqSpace = document.getElementById("req-space");

    const mainContainer = document.querySelector("main");

    // ===== جلوگیری از کپی رمز عبور اصلی =====
    if (passwordInput) {
        passwordInput.addEventListener('copy', (e) => e.preventDefault());
    }

    // ===== به‌روزرسانی ارتفاع main بر اساس فرم فعال =====
    function updateMainHeight() {
        // ابتدا هر دو فرم را موقتاً visible می‌کنیم تا offsetHeight واقعی خوانده شود
        const wasHiddenRegister = formRegister.classList.contains("hidden");
        const wasHiddenLogin = formLogin.classList.contains("hidden");

        formRegister.classList.remove("hidden");
        formLogin.classList.remove("hidden");

        // ارتفاع فرمی که اکنون نمایش داده می‌شود (فعال)
        const activeForm = !wasHiddenRegister ? formRegister : formLogin;
        const height = activeForm.offsetHeight;

        // بازگرداندن وضعیت hidden قبلی
        if (wasHiddenRegister) formRegister.classList.add("hidden");
        if (wasHiddenLogin) formLogin.classList.add("hidden");

        mainContainer.style.height = height + "px";
    }

    // ===== تابع سویچ فرم با مدیریت ارتفاع =====
    function switchForm(formToShow, activeBtn, inactiveBtn) {
        // مخفی کردن هر دو فرم
        formRegister.classList.add("hidden");
        formLogin.classList.add("hidden");

        // نمایش فرم مورد نظر
        formToShow.classList.remove("hidden");

        // تنظیم z-index
        formRegister.style.zIndex = '0';
        formLogin.style.zIndex = '0';
        formToShow.style.zIndex = '1';

        // دکمه‌ها
        activeBtn.classList.add("active");
        inactiveBtn.classList.remove("active");

        // به‌روزرسانی ارتفاع main با توجه به فرم جدید
        updateMainHeight();
    }

    btnRegister.addEventListener("click", () => {
        switchForm(formRegister, btnRegister, btnLogin);
    });

    btnLogin.addEventListener("click", () => {
        switchForm(formLogin, btnLogin, btnRegister);
    });

    // ===== تنظیم ارتفاع اولیه =====
    updateMainHeight();
    // ===== بازتنظیم ارتفاع در صورت تغییر اندازه پنجره =====
    window.addEventListener("resize", updateMainHeight);

    // Toggle password visibility
    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            if (input.type === "password") {
                input.type = "text";
                this.textContent = "🙈";
                this.setAttribute("aria-label", "Hide password");
            } else {
                input.type = "password";
                this.textContent = "👁️";
                this.setAttribute("aria-label", "Show password");
            }
        });
    });

    // Password strength + requirements
    passwordInput.addEventListener("input", function () {
        const password = this.value;

        const hasLength = password.length >= 8;
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNoSpace = !/\s/.test(password);

        let passed = 0;
        if (hasLength) passed++;
        if (hasLower) passed++;
        if (hasUpper) passed++;
        if (hasNumber) passed++;
        if (hasSpecial) passed++;
        if (hasNoSpace) passed++;

        let strength = 0;
        let color = primaryColor;

        if (password.length === 0) {
            strength = 0;
        } else if (passed <= 2) {
            strength = 20;
            color = primaryColor;
        } else if (passed <= 4) {
            strength = 60;
            color = WARNING_COLOR;
        } else {
            strength = 100;
            color = successColor;
        }

        strengthBar.style.width = strength + "%";
        strengthBar.style.backgroundColor = color;

        updateRequirement(reqLength, hasLength);
        updateRequirement(reqLowercase, hasLower);
        updateRequirement(reqUppercase, hasUpper);
        updateRequirement(reqNumber, hasNumber);
        updateRequirement(reqSpecial, hasSpecial);
        updateRequirement(reqSpace, hasNoSpace);
    });

    function updateRequirement(element, isValid) {
        if (!element) return;
        element.classList.toggle("valid", isValid);
        element.classList.toggle("invalid", !isValid);
        if (isValid) {
            element.textContent = element.textContent.replace("✘", "✔");
        } else {
            element.textContent = element.textContent.replace("✔", "✘");
        }
    }

    // Confirm password matching (with CSS classes)
    if (confirmInput) {
        confirmInput.addEventListener('paste', function (e) {
            e.preventDefault();
        });

        confirmInput.addEventListener('input', function () {
            const password = passwordInput.value;
            const confirm = this.value;

            if (confirm.length === 0) {
                this.classList.add('neutral-input');
                this.classList.remove('valid-input', 'invalid-input');
            } else if (password === confirm) {
                this.classList.add('valid-input');
                this.classList.remove('invalid-input', 'neutral-input');
            } else {
                this.classList.add('invalid-input');
                this.classList.remove('valid-input', 'neutral-input');
            }
        });
    }
});