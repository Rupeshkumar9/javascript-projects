// --- 1. SETUP VARIABLES ---
const illustration = document.getElementById('illustration');
const eyes = document.querySelectorAll('.eye');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

let isEmailFocused = false;
let isPasswordFocused = false;

// --- 2. EYE MOVEMENT LOGIC ---
// Limits the movement so pupils stay inside the eye area
const moveEyes = (targetX, targetY) => {
    eyes.forEach(eye => {
        // Get the center of the current eye
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        // Calculate angle and distance to the target (mouse or input)
        const angle = Math.atan2(targetY - eyeCenterY, targetX - eyeCenterX);

        // Limit the distance the pupil can move (simulating the sclera boundary)
        // 4px gives visible tracking for these small eyes
        const distance = Math.min(4, Math.hypot(targetX - eyeCenterX, targetY - eyeCenterY));

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
};

// --- 3. EVENT LISTENERS ---

// Mouse Tracking: Eyes follow cursor, or track toward email input when focused
document.addEventListener('mousemove', (e) => {
    if (!isPasswordFocused) {
        // When email is focused, eyes still follow cursor (gives lively tracking)
        // When nothing is focused, eyes follow cursor normally
        moveEyes(e.clientX, e.clientY);
    }
});

// Email Focus: Snap eyes toward the email input field immediately on click
emailInput.addEventListener('focus', () => {
    isEmailFocused = true;
    // Immediately point eyes toward the email input center
    const rect = emailInput.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;
    moveEyes(targetX, targetY);
});

emailInput.addEventListener('blur', () => {
    isEmailFocused = false;
    // Eyes will return to mouse tracking immediately on next mousemove
});

// Password Focus: The "Shy" Reaction (Hands cover eyes)
passwordInput.addEventListener('focus', () => {
    isPasswordFocused = true;
    illustration.classList.add('is-shy');

    // Optional: Make eyes look down while covered
    eyes.forEach(eye => {
        eye.style.transform = `translate(0px, 3px)`;
    });
});

passwordInput.addEventListener('blur', () => {
    isPasswordFocused = false;
    illustration.classList.remove('is-shy');
});

// --- 4. TOGGLE PASSWORD VISIBILITY ---
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.style.display = 'none';
        eyeOffIcon.style.display = 'block';
        // If they show the password, maybe the monsters peek? 
        // Let's keep it simple: they stay shy until focus is lost.
    } else {
        passwordInput.type = 'password';
        eyeIcon.style.display = 'block';
        eyeOffIcon.style.display = 'none';
    }
}