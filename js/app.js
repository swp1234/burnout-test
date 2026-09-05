// Burnout Test - What's Your Burnout Type?
// 8 questions, 6 burnout types
// Authored reflection labels; this is not a diagnostic instrument.

const QUESTIONS = [
    { id: 0, icon: '\u{1F4BC}', dimension: 'weekend', questionKey: 'question.0', options: ['question.0a', 'question.0b', 'question.0c', 'question.0d'] },
    { id: 1, icon: '\u{1F4A4}', dimension: 'morning', questionKey: 'question.1', options: ['question.1a', 'question.1b', 'question.1c', 'question.1d'] },
    { id: 2, icon: '\u{1F4AC}', dimension: 'colleague', questionKey: 'question.2', options: ['question.2a', 'question.2b', 'question.2c', 'question.2d'] },
    { id: 3, icon: '\u{1F4F1}', dimension: 'notifications', questionKey: 'question.3', options: ['question.3a', 'question.3b', 'question.3c', 'question.3d'] },
    { id: 4, icon: '\u{1F3C6}', dimension: 'achievement', questionKey: 'question.4', options: ['question.4a', 'question.4b', 'question.4c', 'question.4d'] },
    { id: 5, icon: '\u{1F9E0}', dimension: 'ideas', questionKey: 'question.5', options: ['question.5a', 'question.5b', 'question.5c', 'question.5d'] },
    { id: 6, icon: '\u{1F50B}', dimension: 'energy', questionKey: 'question.6', options: ['question.6a', 'question.6b', 'question.6c', 'question.6d'] },
    { id: 7, icon: '\u{1F31F}', dimension: 'purpose', questionKey: 'question.7', options: ['question.7a', 'question.7b', 'question.7c', 'question.7d'] }
];

// Each option maps to score additions for each burnout type
// Indices: 0=Overachiever, 1=Empathy, 2=Boredom, 3=Invisible, 4=Creative, 5=Digital
const SCORE_MAP = {
    '0a': [3,0,0,1,0,0], // work on weekends
    '0b': [0,3,0,0,0,1], // help others
    '0c': [0,0,3,0,1,0], // bored scrolling
    '0d': [0,0,0,2,2,0], // rest but feel guilty

    '1a': [3,0,0,2,0,0], // check emails first thing
    '1b': [0,0,3,0,0,1], // dread the day
    '1c': [0,2,0,0,3,0], // no inspiration
    '1d': [0,0,0,3,1,0], // feel disconnected

    '2a': [0,3,0,0,0,0], // emotional support mode
    '2b': [3,0,0,1,0,0], // offer to help with tasks
    '2c': [0,0,2,0,0,3], // avoid interaction
    '2d': [0,0,1,3,2,0], // listen but feel empty

    '3a': [3,0,0,0,0,2], // respond immediately
    '3b': [0,0,0,3,0,1], // ignore but anxious
    '3c': [0,0,3,0,1,0], // annoyed by interruption
    '3d': [0,2,0,1,0,3], // drained by constant pings

    '4a': [0,0,0,0,1,0], // nothing feels enough
    '4b': [3,0,0,1,0,0], // push harder
    '4c': [0,0,3,2,0,0], // feel nothing
    '4d': [0,2,0,0,3,0], // can't find spark

    '5a': [0,0,0,0,3,0], // ideas dried up
    '5b': [0,0,3,0,1,2], // don't care anymore
    '5c': [3,0,0,0,0,1], // force myself to produce
    '5d': [0,3,0,2,0,0], // give ideas to others

    '6a': [3,1,0,0,0,0], // caffeine and willpower
    '6b': [0,2,0,3,0,0], // pretend I'm fine
    '6c': [0,0,3,0,1,0], // completely depleted
    '6d': [0,0,0,0,2,3], // screen time drains me

    '7a': [0,0,3,1,0,0], // lost meaning
    '7b': [3,0,0,0,0,1], // prove my worth
    '7c': [0,3,0,0,0,0], // help others gives purpose
    '7d': [0,0,0,3,3,2]  // going through motions
};

const BURNOUT_TYPES = {
    overachiever: {
        id: 'overachiever',
        emoji: '\u{1F3AF}',
        nameKey: 'type.overachiever.name',
        taglineKey: 'type.overachiever.tagline',
        descKey: 'type.overachiever.description',
        traitsKeys: ['type.overachiever.trait1', 'type.overachiever.trait2', 'type.overachiever.trait3'],
        color: '#ef4444'
    },
    empathy: {
        id: 'empathy',
        emoji: '\u{1F49D}',
        nameKey: 'type.empathy.name',
        taglineKey: 'type.empathy.tagline',
        descKey: 'type.empathy.description',
        traitsKeys: ['type.empathy.trait1', 'type.empathy.trait2', 'type.empathy.trait3'],
        color: '#ec4899'
    },
    boredom: {
        id: 'boredom',
        emoji: '\u{1F634}',
        nameKey: 'type.boredom.name',
        taglineKey: 'type.boredom.tagline',
        descKey: 'type.boredom.description',
        traitsKeys: ['type.boredom.trait1', 'type.boredom.trait2', 'type.boredom.trait3'],
        color: '#6366f1'
    },
    invisible: {
        id: 'invisible',
        emoji: '\u{1F636}',
        nameKey: 'type.invisible.name',
        taglineKey: 'type.invisible.tagline',
        descKey: 'type.invisible.description',
        traitsKeys: ['type.invisible.trait1', 'type.invisible.trait2', 'type.invisible.trait3'],
        color: '#8b5cf6'
    },
    creative: {
        id: 'creative',
        emoji: '\u{1F3A8}',
        nameKey: 'type.creative.name',
        taglineKey: 'type.creative.tagline',
        descKey: 'type.creative.description',
        traitsKeys: ['type.creative.trait1', 'type.creative.trait2', 'type.creative.trait3'],
        color: '#f59e0b'
    },
    digital: {
        id: 'digital',
        emoji: '\u{1F4F1}',
        nameKey: 'type.digital.name',
        taglineKey: 'type.digital.tagline',
        descKey: 'type.digital.description',
        traitsKeys: ['type.digital.trait1', 'type.digital.trait2', 'type.digital.trait3'],
        color: '#06b6d4'
    }
};

const TYPE_ORDER = ['overachiever', 'empathy', 'boredom', 'invisible', 'creative', 'digital'];

class BurnoutApp {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = [0, 0, 0, 0, 0, 0]; // 6 burnout types
        this.resultType = null;
        this.emittedEvents = new Set();
        this.hasCompleted = false;
        this.isTransitioning = false;
        this.init();
    }

    async init() {
        // Wait for i18n
        if (window.i18n) {
            await window.i18n.init();
        }

        this.sanitizeUrl();
        this.bindEvents();
        this.syncLocalizedActions();
        this.initTheme();
        this.hideLoader();
    }

    bindEvents() {
        // Start button
        const startBtn = document.getElementById('start-btn');
        if (startBtn) startBtn.addEventListener('click', () => this.startQuiz());

        // Retry button
        const retryBtn = document.getElementById('retry-btn');
        if (retryBtn) retryBtn.addEventListener('click', () => this.restart());

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) themeToggle.addEventListener('click', () => this.toggleTheme());

        // Language
        const langToggle = document.getElementById('lang-toggle');
        const langMenu = document.getElementById('lang-menu');
        if (langToggle && langMenu) {
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                langMenu.classList.toggle('hidden');
            });
            document.querySelectorAll('.lang-option').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const lang = btn.getAttribute('data-lang');
                    if (window.i18n) await window.i18n.setLanguage(lang);
                    this.syncLocalizedActions();
                    langMenu.classList.add('hidden');
                });
            });
            document.addEventListener('click', () => langMenu.classList.add('hidden'));
        }

        document.getElementById('share-reflection')?.addEventListener('click', () => this.shareReflection());
        document.getElementById('next-stress-check')?.addEventListener('click', () => this.trackOnce('burnout_next_step_click'));
        document.getElementById('next-stress-guide')?.addEventListener('click', () => this.trackOnce('burnout_guide_click'));
    }

    sanitizeUrl() {
        const url = new URL(window.location.href);
        const lang = url.searchParams.get('lang');
        const clean = new URL(url.origin + url.pathname);
        if (lang && window.i18n?.supportedLanguages.includes(lang)) clean.searchParams.set('lang', lang);
        if (clean.href !== url.href) history.replaceState(null, '', clean.pathname + clean.search);
    }

    syncLocalizedActions() {
        const lang = window.i18n?.getCurrentLanguage() || 'en';
        document.getElementById('next-stress-check')?.setAttribute('href', `/stress-check/?lang=${lang}`);
        document.getElementById('next-stress-guide')?.setAttribute('href', `/portal/blog/${lang}/stress-management-techniques-guide.html`);
    }

    trackOnce(name) {
        if (this.emittedEvents.has(name)) return;
        this.emittedEvents.add(name);
        if (typeof gtag === 'function') gtag('event', name);
    }

    hideLoader() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.style.display = 'none', 400);
            }, 600);
        }
    }

    initTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            const toggle = document.getElementById('theme-toggle');
            if (toggle) toggle.textContent = '\u{2600}';
        }
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const toggle = document.getElementById('theme-toggle');
        if (current === 'light') {
            document.documentElement.removeAttribute('data-theme');
            if (toggle) toggle.textContent = '\u{1F319}';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (toggle) toggle.textContent = '\u{2600}';
            localStorage.setItem('theme', 'light');
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');
    }

    startQuiz() {
        this.emittedEvents = new Set();
        this.hasCompleted = false;
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = [0, 0, 0, 0, 0, 0];
        this.isTransitioning = false;
        this.showScreen('question-screen');
        this.renderQuestion();

        this.trackOnce('burnout_reflection_start');
    }

    renderQuestion() {
        const q = QUESTIONS[this.currentQuestion];
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;

        // Update progress
        const fill = document.getElementById('progress-fill');
        if (fill) fill.style.width = ((this.currentQuestion / QUESTIONS.length) * 100) + '%';

        const counter = document.getElementById('q-current');
        if (counter) counter.textContent = this.currentQuestion + 1;

        // Question icon
        const icon = document.getElementById('question-icon');
        if (icon) icon.textContent = q.icon;

        // Question text
        const text = document.getElementById('question-text');
        if (text) text.textContent = t(q.questionKey);

        // Options
        const container = document.getElementById('options-container');
        if (!container) return;
        container.innerHTML = '';

        const labels = ['A', 'B', 'C', 'D'];
        q.options.forEach((optKey, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = '<span class="option-label">' + labels[idx] + '</span><span class="option-text">' + t(optKey) + '</span>';
            btn.addEventListener('click', () => this.selectOption(q.id, idx, btn));
            container.appendChild(btn);
        });
    }

    selectOption(questionId, optionIdx, btn) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        // Visual feedback
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Record answer
        const scoreKey = questionId + String.fromCharCode(97 + optionIdx); // e.g. "0a", "0b"
        const scoreAdd = SCORE_MAP[scoreKey];
        if (scoreAdd) {
            for (let i = 0; i < 6; i++) {
                this.scores[i] += scoreAdd[i];
            }
        }

        this.answers.push({ question: questionId, option: optionIdx });

        // Next question after brief delay
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < QUESTIONS.length) {
                this.isTransitioning = false;
                this.renderQuestion();
            } else {
                this.showAnalyzing();
            }
        }, 400);
    }

    showAnalyzing() {
        this.showScreen('analyzing-screen');

        const fill = document.getElementById('analyzing-fill');
        const percent = document.getElementById('analyzing-percent');
        const detail = document.getElementById('analyzing-detail');
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;

        const steps = [
            { pct: 25, key: 'analyzing.scanning' },
            { pct: 50, key: 'analyzing.matching' },
            { pct: 75, key: 'analyzing.comparing' },
            { pct: 100, key: 'analyzing.complete' }
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step >= steps.length) {
                clearInterval(interval);
                setTimeout(() => this.showResult(), 400);
                return;
            }
            if (fill) fill.style.width = steps[step].pct + '%';
            if (percent) percent.textContent = steps[step].pct + '%';
            if (detail) detail.textContent = t(steps[step].key);
            step++;
        }, 500);
    }

    calculateResult() {
        let maxScore = -1;
        let maxIdx = 0;
        for (let i = 0; i < 6; i++) {
            if (this.scores[i] > maxScore) {
                maxScore = this.scores[i];
                maxIdx = i;
            }
        }
        return BURNOUT_TYPES[TYPE_ORDER[maxIdx]];
    }

    showResult() {
        this.resultType = this.calculateResult();
        const type = this.resultType;
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;

        this.showScreen('result-screen');

        // Emoji
        const emoji = document.getElementById('result-emoji');
        if (emoji) emoji.textContent = type.emoji;

        // Title
        const title = document.getElementById('result-title');
        if (title) title.textContent = t(type.nameKey);

        // Tagline
        const tagline = document.getElementById('result-tagline');
        if (tagline) tagline.textContent = '"' + t(type.taglineKey) + '"';

        // Description
        const desc = document.getElementById('result-description');
        if (desc) desc.textContent = t(type.descKey);

        // Traits
        const traitsList = document.getElementById('traits-list');
        if (traitsList) {
            traitsList.innerHTML = '';
            type.traitsKeys.forEach(key => {
                const tag = document.createElement('span');
                tag.className = 'trait-tag';
                tag.textContent = t(key);
                traitsList.appendChild(tag);
            });
        }

        // Confetti
        this.spawnConfetti();

        this.hasCompleted = true;
        this.trackOnce('burnout_reflection_complete');
    }

    spawnConfetti() {
        const container = document.getElementById('confetti-container');
        if (!container) return;
        container.innerHTML = '';
        const colors = ['#ef4444', '#f97316', '#ec4899', '#6366f1', '#8b5cf6', '#f59e0b', '#06b6d4'];
        for (let i = 0; i < 40; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 2) + 's';
            piece.style.animationDuration = (2 + Math.random() * 2) + 's';
            container.appendChild(piece);
        }
    }

    restart() {
        if (!this.hasCompleted) return;
        this.trackOnce('burnout_reflection_retry');
        this.hasCompleted = false;
        this.showScreen('intro-screen');
        window.scrollTo(0, 0);
    }

    getShareUrl() {
        return 'https://dopabrain.com/burnout-test/';
    }

    async shareReflection() {
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (key) => key;
        const data = { title: t('app.title'), text: t('share.text'), url: this.getShareUrl() };
        const status = document.getElementById('share-status');
        try {
            if (navigator.share) await navigator.share(data);
            else await navigator.clipboard.writeText(data.text + ' ' + data.url);
            if (status) status.textContent = t('share.success');
            this.trackOnce('burnout_share_success');
        } catch (e) {
            if (e?.name !== 'AbortError' && status) status.textContent = t('share.unavailable');
        }
    }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new BurnoutApp();
});
