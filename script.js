// Get the canvas element and set up the context
const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');

// Set the canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to draw a circle at the given coordinates
function drawCircle(x, y) {
    const radius = 20; // Radius of the circle
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = 'red'; // Color of the circle
    context.fill();
    context.closePath();
}

// Event listener for mouse click
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    drawCircle(x, y);
});

// Adjust canvas size when window is resized
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});