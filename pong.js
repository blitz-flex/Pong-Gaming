const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Create the pong paddle
const paddleWidth = 10;
const paddleHeight = 100;

const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    score: 0
};

const computer = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    score: 0
};

// Create the pong ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    velocityX: 4,
    velocityY: 4,
    color: '#fff'
};

// Draw everything
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw paddles
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
    
    context.fillStyle = computer.color;
    context.fillRect(computer.x, computer.y, computer.width, computer.height);
    
    // Draw ball
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Update game objects
function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Ball collision with paddles
    if (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
        ball.velocityX = -ball.velocityX;
    }

    if (ball.x + ball.radius > computer.x && ball.y > computer.y && ball.y < computer.y + computer.height) {
        ball.velocityX = -ball.velocityX;
    }

    // Reset ball if it goes out of bounds
    if (ball.x - ball.radius < 0) {
        computer.score++;
        updateScore();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player.score++;
        updateScore();
        resetBall();
    }
}

// Update the score display
function updateScore() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Player: ${player.score} | Computer: ${computer.score}`;
}