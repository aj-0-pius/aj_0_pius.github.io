console.log('Access Granted: You found the hidden flag!');

const speed = 100;
const typewriterElement = document.getElementById("typewriter");
const helloLine = "Hello, I am";
const nameLine = "Minhajul Abadin Pius";
const greenWord = "Pius";
const greenStartIndex = nameLine.indexOf(greenWord);
let isNameLoopRunning = false;

function renderNameTyping(visibleChars) {
    if (!typewriterElement) return;

    const beforeGreen = nameLine.slice(0, greenStartIndex);
    const visibleName = nameLine.slice(0, visibleChars);

    if (visibleChars <= greenStartIndex) {
        typewriterElement.innerHTML = `<span class="typewriter-line"><span class="typewriter-name whitespace-nowrap">${visibleName}</span></span>`;
        return;
    }

    const greenPart = visibleName.slice(greenStartIndex);
    typewriterElement.innerHTML = `<span class="typewriter-line"><span class="typewriter-name whitespace-nowrap">${beforeGreen}<span style="color:#10b981">${greenPart}</span></span></span>`;
}

function startNameLoop() {
    if (isNameLoopRunning) return;

    isNameLoopRunning = true;
    let loopCharIndex = 0;

    const loopName = () => {
        if (loopCharIndex <= nameLine.length) {
            renderNameTyping(loopCharIndex);
            loopCharIndex++;
            setTimeout(loopName, speed);
            return;
        }

        setTimeout(() => {
            typewriterElement.innerHTML = `<span class="typewriter-line"><span class="typewriter-name">${nameLine.slice(0, greenStartIndex)}<span style="color:#10b981">${greenWord}</span></span></span>`;
            setTimeout(() => {
                loopCharIndex = 0;
                loopName();
            }, 500);
        }, 800);
    };

    loopName();
}

function type() {
    if (!typewriterElement) return;
    typewriterElement.innerHTML = '';
    setTimeout(() => {
        startNameLoop();
    }, 400);
}

const pgpBtn = document.getElementById('pgp-btn');
const pgpKey = document.getElementById('pgp-key');
if (pgpBtn && pgpKey) {
    pgpBtn.addEventListener('click', () => {
        pgpKey.classList.toggle('hidden');
    });
}

const certificateTrigger = document.querySelector('.certificate-trigger');
const certificateModal = document.getElementById('certificate-modal');
const certificateClose = document.getElementById('certificate-close');
const resumeTrigger = document.querySelector('.resume-trigger');
const resumeModal = document.getElementById('resume-modal');
const resumeClose = document.getElementById('resume-close');

if (certificateTrigger && certificateModal && certificateClose) {
    certificateTrigger.addEventListener('click', () => {
        certificateModal.classList.remove('hidden');
        certificateModal.setAttribute('aria-hidden', 'false');
    });

    certificateClose.addEventListener('click', () => {
        certificateModal.classList.add('hidden');
        certificateModal.setAttribute('aria-hidden', 'true');
    });

    certificateModal.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.dataset.close === 'certificate-modal') {
            certificateModal.classList.add('hidden');
            certificateModal.setAttribute('aria-hidden', 'true');
        }
    });
}

if (resumeTrigger && resumeModal && resumeClose) {
    resumeTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        resumeModal.classList.remove('hidden');
        resumeModal.setAttribute('aria-hidden', 'false');
    });

    resumeClose.addEventListener('click', () => {
        resumeModal.classList.add('hidden');
        resumeModal.setAttribute('aria-hidden', 'true');
    });

    resumeModal.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.dataset.close === 'resume-modal') {
            resumeModal.classList.add('hidden');
            resumeModal.setAttribute('aria-hidden', 'true');
        }
    });
}

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll('section[id]');
if (navLinks.length && sections.length) {
    const updateActiveNav = () => {
        let currentId = 'home';
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 180 && rect.bottom >= 180) {
                currentId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const targetHref = link.getAttribute('href');
            const isActive = targetHref === `#${currentId}`;
            link.classList.toggle('text-terminal-green', isActive);
            link.classList.toggle('font-bold', isActive);
        });
    };

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
}

const topBtn = document.getElementById('top-btn');
if (topBtn) {
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const nav = document.querySelector('nav');
if (nav) {
    let lastScrollTop = 0;
    let scrollTimer = null;
    let ticking = false;

    const showNav = () => {
        nav.classList.remove('nav-hidden');
    };

    const hideNav = () => {
        nav.classList.add('nav-hidden');
    };

    const handleNavScroll = () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        hideNav();

        if (currentScroll <= 20) {
            showNav();
        }

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            showNav();
        }, 160);

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        nav.classList.toggle('shadow-[0_0_20px_rgba(16,185,129,0.15)]', currentScroll > 20);
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleNavScroll);
            ticking = true;
        }
    }, { passive: true });
}

const bootLoader = document.getElementById('boot-loader');
const bootProgress = document.getElementById('boot-progress');
const bootLog = document.getElementById('boot-log');

function startTypewriterAfterBoot() {
    if (bootLoader && bootProgress && bootLog) {
        const bootMessages = [
            'Loading kernel modules...',
            'Establishing VPN tunnel...',
            'Scanning OS signatures...',
            'Authenticating user context...',
            'Boot sequence complete.'
        ];

        let progress = 0;
        let logIndex = 0;

        const updateBoot = () => {
            progress = Math.min(progress + 18, 100);
            bootProgress.style.width = `${progress}%`;

            if (logIndex < bootMessages.length) {
                const line = bootMessages[logIndex];
                bootLog.textContent += `${line}\n`;
                logIndex++;
            }

            if (progress >= 100) {
                setTimeout(() => {
                    bootLoader.classList.add('hidden');
                    setTimeout(type, 300);
                }, 400);
                return;
            }

            setTimeout(updateBoot, 220);
        };

        updateBoot();
        return;
    }

    type();
}

const cliInput = document.getElementById('cli-input');
const cliOutput = document.getElementById('cli-output');

if (cliInput && cliOutput) {
    const commands = {
        help: 'Available commands: ls, whoami, cat about.txt, clear, banner, sudo, find flag',
        ls: 'about.txt  notes/  tools/  writeups/  logs/',
        whoami: 'root@aj_0_pius : cybersecurity researcher',
        'cat about.txt': 'I build defensive systems, break flawed logic, and document the journey through CTF challenges and security engineering.',
        banner: '=== Secure Shell Access Granted ===\nStatus: online\nThreat model: evolving',
        sudo: '[sudo] password for aj_0_pius: Nice try, but I don\'t give out root that easily.',
        'find flag': 'Base64: RkxBR3tTMHVyY2VfQzByZV9JbnNwZWN0ZWRfU3VjY2VzfQ==',
        clear: ''
    };

    const commandHistory = [];
    let historyIndex = -1;

    const appendLine = (content) => {
        const line = document.createElement('span');
        line.className = 'cli-line';
        line.innerHTML = content;
        cliOutput.appendChild(line);
        cliOutput.scrollTop = cliOutput.scrollHeight;
    };

    const autocompleteCommand = (value) => {
        const matches = Object.keys(commands)
            .filter((key) => key !== 'clear' && key.startsWith(value));

        if (matches.length === 1) {
            return matches[0];
        }

        if (matches.length > 1) {
            const sorted = [...matches].sort();
            let prefix = sorted[0];
            for (let i = 1; i < sorted.length; i++) {
                const candidate = sorted[i];
                let j = 0;
                while (j < prefix.length && j < candidate.length && prefix[j] === candidate[j]) {
                    j++;
                }
                prefix = prefix.slice(0, j);
                if (!prefix) break;
            }
            return prefix || value;
        }

        return value;
    };

    const printCommandHelp = () => {
        appendLine('<span class="prompt">root@aj_0_pius:~$</span> <span class="output">help</span>');
        appendLine('<span class="output">Available commands: ls, whoami, cat about.txt, clear, banner, sudo, find flag</span>');
    };

    document.querySelectorAll('.cli-command-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const command = button.dataset.command || '';
            if (!cliInput) return;
            cliInput.value = command;
            cliInput.focus();
            cliInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        });
    });

    printCommandHelp();

    cliInput.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const value = cliInput.value.trim().toLowerCase();
            if (value) {
                cliInput.value = autocompleteCommand(value);
            }
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (!commandHistory.length) return;
            historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
            cliInput.value = commandHistory[commandHistory.length - 1 - historyIndex] || '';
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (!commandHistory.length) return;
            if (historyIndex > 0) {
                historyIndex -= 1;
                cliInput.value = commandHistory[commandHistory.length - 1 - historyIndex] || '';
            } else {
                historyIndex = -1;
                cliInput.value = '';
            }
            return;
        }

        if (event.key !== 'Enter') return;

        const value = cliInput.value.trim().toLowerCase();
        if (value) {
            commandHistory.push(value);
            historyIndex = -1;
        }

        appendLine(`<span class="prompt">root@aj_0_pius:~$</span> <span class="output">${value || ' '}</span>`);

        if (!value) {
            cliInput.value = '';
            return;
        }

        if (value === 'clear') {
            cliOutput.innerHTML = '';
            cliInput.value = '';
            return;
        }

        if (value === 'exit') {
            cliInput.value = '';
            cliInput.blur();
            cliInput.placeholder = 'Connection closed';
            cliInput.disabled = true;
            appendLine('<span class="output">Session terminated. Access remains monitored.</span>');
            return;
        }

        const result = commands[value] || 'Command not found. Type help to view available commands.';
        appendLine(`<span class="output">${result.replace(/\n/g, '<br>')}</span>`);
        cliInput.value = '';
    });
}

const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => observer.observe(el));
}

const interactiveCards = document.querySelectorAll('.cli-command-btn, .platform-badge, .skill-card, .terminal-window, .neon-glow');
interactiveCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        card.style.transition = 'transform 0.12s ease';
    });

    card.addEventListener('pointerleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.2s ease';
    });
});

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

function decryptText(element, finalValue) {
    let iterations = 0;
    const interval = setInterval(() => {
        element.textContent = finalValue.split('').map((char, index) => {
            if (index < iterations) return finalValue[index];
            return characters[Math.floor(Math.random() * characters.length)];
        }).join('');

        if (iterations >= finalValue.length) {
            clearInterval(interval);
            element.textContent = finalValue;
            return;
        }

        iterations += 1 / 3;
    }, 30);
}

const skillRows = document.querySelectorAll('.skill-fill');
if (skillRows.length) {
    const animateSkill = (element) => {
        const finalWidth = element.dataset.width || '90';
        let current = 0;
        const flicker = setInterval(() => {
            current += Math.ceil(Math.random() * 8);
            if (current >= Number(finalWidth)) {
                current = Number(finalWidth);
                clearInterval(flicker);
            }
            element.style.width = `${current}%`;
        }, 35);
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const card = entry.target.closest('.skill-card');
                const label = card ? card.querySelector('.skill-header span:first-child') : null;

                if (label && label.textContent.trim()) {
                    decryptText(label, label.textContent.trim());
                }

                animateSkill(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    skillRows.forEach((row) => skillObserver.observe(row));
}

const matrixCanvas = document.getElementById('matrix-bg');
if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    let columns = [];
    let matrixFrame = null;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*+<>/\\';

    const resizeCanvas = () => {
        matrixCanvas.width = window.innerWidth * window.devicePixelRatio;
        matrixCanvas.height = window.innerHeight * window.devicePixelRatio;
        matrixCanvas.style.width = `${window.innerWidth}px`;
        matrixCanvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        columns.length = 0;
        const fontSize = 16;
        const cols = Math.ceil(window.innerWidth / fontSize);
        for (let i = 0; i < cols; i++) {
            columns.push(Math.random() * -100);
        }
    };

    const drawMatrix = () => {
        if (window.scrollY > window.innerHeight || document.hidden) {
            matrixFrame = null;
            return;
        }

        ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.font = '16px monospace';

        for (let i = 0; i < columns.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 16;
            const y = columns[i] * 16;
            ctx.fillStyle = i % 2 === 0 ? 'rgba(16, 185, 129, 0.75)' : 'rgba(34, 211, 238, 0.6)';
            ctx.fillText(text, x, y);

            if (y > window.innerHeight && Math.random() > 0.972) {
                columns[i] = 0;
            }
            columns[i]++;
        }
        matrixFrame = requestAnimationFrame(drawMatrix);
    };

    const resumeMatrix = () => {
        if (!matrixFrame && window.scrollY <= window.innerHeight && !document.hidden) {
            drawMatrix();
        }
    };

    resizeCanvas();
    drawMatrix();
    window.addEventListener('resize', () => {
        resizeCanvas();
        resumeMatrix();
    });
    document.addEventListener('visibilitychange', resumeMatrix);
    window.addEventListener('scroll', resumeMatrix, { passive: true });
}

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (event) => {
        cursorDot.style.left = `${event.clientX}px`;
        cursorDot.style.top = `${event.clientY}px`;
        cursorRing.style.left = `${event.clientX}px`;
        cursorRing.style.top = `${event.clientY}px`;
    });

    document.querySelectorAll('a, button, input, textarea, .clickable').forEach((element) => {
        element.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const statusMessage = document.getElementById('form-status');
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button ? button.textContent : './send_message.sh';

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formAction = contactForm.getAttribute('action') || '';
        if (!formAction || formAction.includes('YOUR_FORM_ID')) {
            alert('Add your real Formspree form ID in the contact form action before sending.');
            return;
        }

        if (button) {
            button.textContent = 'sending...';
            button.disabled = true;
        }

        if (statusMessage) {
            statusMessage.textContent = '';
            statusMessage.classList.add('hidden');
        }

        try {
            const response = await fetch(formAction, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Message delivery failed');
            }

            contactForm.reset();

            if (statusMessage) {
                statusMessage.textContent = 'Message sent successfully.';
                statusMessage.classList.remove('hidden');
            }

            if (button) {
                button.textContent = 'message sent';
            }
        } catch (error) {
            if (statusMessage) {
                statusMessage.textContent = 'Could not send the message. Please use the email link instead.';
                statusMessage.classList.remove('hidden');
            }

            if (button) {
                button.textContent = originalText;
            }
        } finally {
            setTimeout(() => {
                if (button) {
                    button.textContent = originalText;
                    button.disabled = false;
                }

                if (statusMessage) {
                    statusMessage.classList.add('hidden');
                    statusMessage.textContent = '';
                }
            }, 2200);
        }
    });
}

document.addEventListener('DOMContentLoaded', startTypewriterAfterBoot);
