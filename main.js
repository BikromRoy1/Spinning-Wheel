function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

const letsSpin = () => {
  const minValue = 1024;
  const maxValue = 9999;

  const deg = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

  const coffee = document.getElementById('my-canvas');
  const wheelElement = document.getElementById('wheel');

  // Define a function to handle the transitionend event
  const handleTransitionEnd = () => {
    // alert(`Spinning has ended! ${getRandomNumber(1, 600)}`);
    const resultText = ` ${getRandomNumber(1, 600)}`;
    document.getElementById('resultText').textContent = resultText;

    // Show the Bootstrap modal
    const resultModal = new bootstrap.Modal(
      document.getElementById('resultModal')
    );
    resultModal.show();

    // Play the confetti sound
    const confettiSound = document.getElementById('confettiSound');
    confettiSound.play();

    // Add the "active" class to my-canvas
    coffee.classList.add('active');

    // Remove the event listener to prevent multiple alerts
    wheelElement.removeEventListener('transitionend', handleTransitionEnd);
  };

  // Add an event listener to detect the end of the CSS transition
  wheelElement.addEventListener('transitionend', handleTransitionEnd);

  // Add a transition effect
  wheelElement.style.transition = 'transform 3s ease-out';
  wheelElement.style.transform = `rotate(${deg}deg)`;

  // Listen for the modal's "hidden.bs.modal" event
  const resultModal = new bootstrap.Modal(
    document.getElementById('resultModal')
  );
  resultModal._element.addEventListener('hidden.bs.modal', () => {
    // Remove the "active" class from my-canvas when the modal is hidden
    coffee.classList.remove('active');
    confettiSound.pause(); // Pause the audio
    confettiSound.currentTime = 0; // Reset the audio to the beginning
  });
};
