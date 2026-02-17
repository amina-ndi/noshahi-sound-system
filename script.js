// Sound Effects Script - Premium Audio Experience

// Create audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// State
let isSoundEnabled = localStorage.getItem('soundEnabled') !== 'false'; // Default true

// DOM Elements
const soundToggleBtn = document.getElementById('sound-toggle');

// Initialize State
function init() {
    updateSoundIcon();
    // Pre-start context on user interaction if needed (handled in listeners)
}

function updateSoundIcon() {
    if (soundToggleBtn) {
        soundToggleBtn.innerHTML = isSoundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    }
}

// scale: C Major Pentatonic (C5, D5, E5, G5, A5)
const scale = [523.25, 587.33, 659.25, 783.99, 880.00];

// Function to play premium synthesized sounds
function playSound(type) {
    if (!isSoundEnabled) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const t = audioCtx.currentTime;

    if (type === 'hover') {
        // "Crystal Pluck" - FM Synthesis for a glass-like texture
        // Randomly pick a note from the pentatonic scale for variety
        const note = scale[Math.floor(Math.random() * scale.length)];

        const osc = audioCtx.createOscillator();
        const modulator = audioCtx.createOscillator();
        const modGain = audioCtx.createGain();
        const gain = audioCtx.createGain();

        // FM Configuration
        osc.frequency.setValueAtTime(note, t);
        modulator.frequency.setValueAtTime(note * 2, t); // 2:1 ratio for bright harmonics

        modGain.gain.setValueAtTime(100, t); // Modulation index
        modGain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

        modulator.connect(modGain);
        modGain.connect(osc.frequency);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sine';
        modulator.type = 'sine';

        // Envelope - Short and percussive but ringing
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

        osc.start(t);
        modulator.start(t);
        osc.stop(t + 0.3);
        modulator.stop(t + 0.3);

    } else if (type === 'click') {
        // "Deep Thud" + "Sparkle" - Satisfying confirmation
        // Layer 1: Low impact
        const kickOsc = audioCtx.createOscillator();
        const kickGain = audioCtx.createGain();
        kickOsc.connect(kickGain);
        kickGain.connect(audioCtx.destination);

        kickOsc.frequency.setValueAtTime(150, t);
        kickOsc.frequency.exponentialRampToValueAtTime(50, t + 0.1);

        kickGain.gain.setValueAtTime(0.3, t);
        kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

        kickOsc.start(t);
        kickOsc.stop(t + 0.15);

        // Layer 2: High shimmer
        const shimOsc = audioCtx.createOscillator();
        const shimGain = audioCtx.createGain();
        shimOsc.connect(shimGain);
        shimGain.connect(audioCtx.destination);

        shimOsc.type = 'triangle';
        shimOsc.frequency.setValueAtTime(1200, t); // High C

        shimGain.gain.setValueAtTime(0, t);
        shimGain.gain.linearRampToValueAtTime(0.05, t + 0.02);
        shimGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        shimOsc.start(t);
        shimOsc.stop(t + 0.2);
    } else if (type === 'image-hover') {
        // "Shimmer" - High frequency sparkle for images
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sine';
        // High pitch sweep
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.linearRampToValueAtTime(1800, t + 0.3);

        // Soft airy envelope
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.start(t);
        osc.stop(t + 0.4);
    }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    init();

    // Toggle Sound
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            isSoundEnabled = !isSoundEnabled;
            localStorage.setItem('soundEnabled', isSoundEnabled);
            updateSoundIcon();
            if (isSoundEnabled) {
                if (audioCtx.state === 'suspended') audioCtx.resume();
                playSound('click');
            }
        });
    }

    // Button clicks and hovers for all interactive elements
    // Using event delegation for better performance and dynamic content
    document.body.addEventListener('mouseenter', (e) => {
        // Check for images first
        if (e.target.closest('img')) {
            playSound('image-hover');
        }
        // Then check for interactive elements
        else if (e.target.closest('a, button, .card, .input, .select, .textarea')) {
            playSound('hover');
        }
    }, true); // Capture phase to catch all

    document.body.addEventListener('click', (e) => {
        // Filter out the toggle buttons themselves to avoid double-playing if they handle it
        if (e.target.closest('a, button, .card') &&
            !e.target.closest('#sound-toggle')) {
            playSound('click');
        }
    });
});

// Event Details Data
const eventDetails = {
    wedding: {
        title: "Wedding Events Layout",
        features: [
            "High-Fidelity FOH Speakers for nice coverage",
            "Stage Monitors for Clarity (Reciters/Groom)",
            "4x Wireless Microphones (Shure/Sennheiser)",
            "Music Playback for Entry/Events",
            "Professional Sound Engineer on site"
        ]
    },
    birthday: {
        title: "Birthday Party Setup",
        features: [
            "Bass-Heavy Subwoofers for extra punch",
            "DJ Mixer & Console Connection",
            "Dynamic Party Lighting (Moving heads/Pars)",
            "Fog/Smoke Machine available",
            "AUX connectivity for your playlist"
        ]
    },
    gettogether: {
        title: "Get Together Package",
        features: [
            "Compact Crystal Clear Speakers",
            "Background Music Playback",
            "2x Vocal Microphones for announcements",
            "Quick Setup & Teardown",
            "Balanced audio for conversation"
        ]
    },
    naat: {
        title: "Mehfil-e-Naat Setup",
        features: [
            "Specialized Digital Echo/Delay/Reverb",
            "Premium Vocal Mics (Shure Beta 58s)",
            "Feedback Suppression Technology",
            "Floor Monitors for Reciters",
            "Crystal clear high-end frequency response"
        ]
    },
    walima: {
        title: "Walima Reception Audio",
        features: [
            "Distributed Sound Coverage (No loud spots)",
            "Low-Profile Aesthetic Speakers",
            "Background Ambience Control",
            "Crisp Speech System for Stage",
            "Wireless coverage for whole hall"
        ]
    },
    corporate: {
        title: "Corporate A/V Solution",
        features: [
            "Podium & Lapel (Lavalier) Microphones",
            "Seamless Video/Projector Sound Integration",
            "Audio Recording Capabilities",
            "On-Site Tech Support for zero glitches",
            "Professional black-box appearance"
        ]
    }
};

// Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const eventModal = document.getElementById('eventDetailModal');
    if (eventModal) {
        eventModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const type = button.getAttribute('data-event-type');
            const data = eventDetails[type];

            const modalTitle = eventModal.querySelector('.modal-title');
            const modalBody = eventModal.querySelector('.modal-body');

            if (data) {
                modalTitle.textContent = data.title;
                let html = '<ul class="list-group list-group-flush">';
                data.features.forEach(feature => {
                    html += `<li class="list-group-item"><i class="fas fa-check-circle text-danger me-2"></i>${feature}</li>`;
                });
                html += '</ul>';
                modalBody.innerHTML = html;
            }
        });
    }
});

// Rental Fleet Data
const fleetDetails = {
    pa_system: {
        title: "PA Systems & Speakers",
        features: [
            "JBL & Yamaha Professional Series",
            "15-inch Active/Passive Tops for clear vocals",
            "18-inch Subwoofers for deep bass",
            "Line Array Systems for large venues",
            "Stage Monitors for performers",
            "Portable battery-powered options available"
        ]
    },
    mixing_console: {
        title: "Mixing Consoles",
        features: [
            "Digital Mixers (Behringer X32 / Midas M32)",
            "Analog Mixers (Yamaha MG Series)",
            "2 to 8 Channel configurations",
            "Built-in Effects Processing (Reverb/Delay)",
            "iPad Control for remote mixing",
            "Multi-track recording capabilities"
        ]
    },
    power_amp: {
        title: "Power Amplifiers",
        features: [
            "High-Efficiency Class-D Amplifiers",
            "Crown & QSC Power Series",
            "Built-in DSP (Digital Signal Processing)",
            "Limiter protection to prevent damage",
            "Bridge mode for subwoofer power",
            "Silent cooling fans for quiet operation"
        ]
    }
};

// Fleet Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const fleetModal = document.getElementById('fleetDetailModal');
    if (fleetModal) {
        fleetModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const type = button.getAttribute('data-fleet-type');
            const data = fleetDetails[type];

            const modalTitle = fleetModal.querySelector('.modal-title');
            const modalBody = fleetModal.querySelector('.modal-body');

            if (data) {
                modalTitle.textContent = data.title;
                let html = '<ul class="list-group list-group-flush">';
                data.features.forEach(feature => {
                    html += `<li class="list-group-item"><i class="fas fa-check-circle text-danger me-2"></i>${feature}</li>`;
                });
                html += '</ul>';
                modalBody.innerHTML = html;
            }
        });
    }
});
