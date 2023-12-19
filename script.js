const typingText = document.getElementById('typing-text');
const phrases = ["Welcome to My Website!", "Explore the Sections Below!", "Feel Free to Click Around!"];
let currentPhraseIndex = 0;
let currentCharacterIndex = 0;

function typeWriter() {
    if (currentPhraseIndex < phrases.length) {
        const currentPhrase = phrases[currentPhraseIndex];
        if (currentCharacterIndex < currentPhrase.length) {
            typingText.innerHTML += currentPhrase.charAt(currentCharacterIndex);
            currentCharacterIndex++;
            setTimeout(typeWriter, 50); // Adjust the typing speed (milliseconds)
        } else {
            // Pause before deleting
            setTimeout(function () {
                deleteText();
            }, 1000);
        }
    } else {
        // Reset the animation for continuous loop
        currentPhraseIndex = 0;
        setTimeout(typeWriter, 0);
    }
}

function deleteText() {
    if (currentCharacterIndex >= 0) {
        typingText.innerHTML = phrases[currentPhraseIndex].substring(0, currentCharacterIndex);
        currentCharacterIndex--;
        setTimeout(deleteText, 30); // Adjust the deleting speed (milliseconds)
    } else {
        // Move to the next phrase
        currentPhraseIndex++;
        currentCharacterIndex = 0;
        setTimeout(typeWriter, 500); // Pause before typing the next phrase
    }
}

// Start the typing animation when the page loads
window.onload = function () {
    typeWriter();
};

// Rest of your existing script
document.querySelectorAll('.clickable-box a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('.clickable-box a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});