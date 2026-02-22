const video = document.getElementById('video');
const playPause = document.getElementById('playPause');
const progressFilled = document.getElementById('progressFilled');
const progressContainer = document.querySelector('.progress-container');
const timeDisplay = document.getElementById('time');
const volume = document.getElementById('volume');
const fullscreen = document.getElementById('fullscreen');
const volumeContainer = document.querySelector('.volume-container');

let volumeTimeout;

// Load video function
function loadVideo(src) {
    video.src = src;
    video.load();
}

// Volume hover handling
volumeContainer.addEventListener('mouseenter', () => {
    clearTimeout(volumeTimeout);
    volume.style.opacity = '1';
    volume.style.pointerEvents = 'auto';
});

volumeContainer.addEventListener('mouseleave', () => {
    volumeTimeout = setTimeout(() => {
        volume.style.opacity = '0';
        volume.style.pointerEvents = 'none';
    }, 500);
});

// Play/Pause
playPause.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPause.textContent = '⏸';
    } else {
        video.pause();
        playPause.textContent = '▶';
    }
});

// Video click to toggle play/pause
video.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPause.textContent = '⏸';
    } else {
        video.pause();
        playPause.textContent = '▶';
    }
});

// Progress
video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = percent + '%';
    timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
});

progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    video.currentTime = percent * video.duration;
});

// Volume
volume.addEventListener('input', () => {
    video.volume = volume.value;
});

// Fullscreen
fullscreen.addEventListener('click', () => {
    const container = document.querySelector('.player-container');
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        const container = document.querySelector('.player-container');
        if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 5);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        video.currentTime = Math.min(video.duration, video.currentTime + 5);
    }
});