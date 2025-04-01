let musicOn = false; // Start with music OFF
let bgMusic = new Audio("./music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.1;

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("trackButton");
  button.innerText = "Sound: OFF"; // Ensure button text starts correctly

  button.addEventListener("click", () => {
    musicOn = !musicOn;
    if (musicOn) {
      bgMusic.play();
      button.innerText = "Sound: ON";
      button.classList.add("moving"); // Activate JS movement

      // Enable JS-based movement effect after music starts
      button.addEventListener("mouseover", moveButton);
    } else {
      bgMusic.pause();
      button.innerText = "Sound: OFF";
      button.classList.remove("moving"); // Restore normal hover

      // Disable JS movement when music is off
      button.removeEventListener("mouseover", moveButton);
    }
  });
});

function moveButton() {
  const button = document.getElementById("trackButton");
  const x = Math.random() * (window.innerWidth - button.clientWidth);
  const y = Math.random() * (window.innerHeight - button.clientHeight);
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

// Input field
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("inputName");
  const outputContainer = document.getElementById("outputContainer");

  inputField.addEventListener("input", () => {
    const text = inputField.value;
    const char = text.charAt(text.length - 1); // Get last typed character
    inputField.value = "";

    if (char) {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("falling-text");

      // Get input field position
      const inputRect = inputField.getBoundingClientRect();
      span.style.left = `${inputRect.left + inputRect.width / 2}px`;
      span.style.top = `${inputRect.top}px`;

      outputContainer.appendChild(span);

      // Remove span after animation ends (clean up)
      setTimeout(() => {
        span.remove();
      }, 3000);
    }
  });
});

// Slider
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const volumePercentage = document.getElementById("volumePercentage");

  // Listen for slider change (when user stops dragging)
  slider.addEventListener("change", () => {
    const randomValue =
      Math.floor(Math.random() * (slider.max - slider.min + 1)) +
      parseInt(slider.min); // Generate a random value based on the slider's range

    bgMusic.volume = randomValue / 100; // Apply random volume to the music (convert from 0-100 to 0-1)

    slider.value = randomValue; // Update slider to random value

    volumePercentage.textContent = `${randomValue}%`; // Display updated value
  });
});

// Color mixing functionality
document.addEventListener("DOMContentLoaded", () => {
  const redColor = { r: 255, g: 0, b: 0 };
  const yellowColor = { r: 255, g: 255, b: 0 };
  const blueColor = { r: 0, g: 0, b: 255 };
  let selectedColors = [];
  let mixedColor = { r: 0, g: 0, b: 0 };

  const colorDisplay = document.getElementById("colorDisplay");
  const colorValue = document.getElementById("colorValue");
  const clearButton = document.getElementById("clearButton");

  function updateMixedColor() {
    if (selectedColors.length > 0) {
      mixedColor = { r: 0, g: 0, b: 0 };
      selectedColors.forEach((color) => {
        mixedColor.r += color.r;
        mixedColor.g += color.g;
        mixedColor.b += color.b;
      });
      mixedColor.r = Math.round(mixedColor.r / selectedColors.length);
      mixedColor.g = Math.round(mixedColor.g / selectedColors.length);
      mixedColor.b = Math.round(mixedColor.b / selectedColors.length);
    }
    colorDisplay.style.backgroundColor = `rgb(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b})`;
    colorValue.textContent = `rgb(${mixedColor.r}, ${mixedColor.g}, ${mixedColor.b})`;
  }

  function selectColor(color) {
    if (!selectedColors.includes(color)) {
      selectedColors.push(color);
      updateMixedColor();
    }
  }

  document
    .getElementById("redColor")
    .addEventListener("click", () => selectColor(redColor));
  document
    .getElementById("yellowColor")
    .addEventListener("click", () => selectColor(yellowColor));
  document
    .getElementById("blueColor")
    .addEventListener("click", () => selectColor(blueColor));

  clearButton.addEventListener("click", () => {
    selectedColors = [];
    mixedColor = { r: 0, g: 0, b: 0 };
    updateMixedColor();
  });

  updateMixedColor();
});
