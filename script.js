// ── Progress bar
window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';
    const bt = document.getElementById('back-top');
    window.scrollY > 400 ? bt.classList.add('visible') : bt.classList.remove('visible');
});

// ── Hamburger
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('hamburger');
    menu.classList.toggle('open');
    btn.classList.toggle('open');
}

// ── Search overlay
function openSearch() {
    document.getElementById('searchOverlay').classList.add('open');
    setTimeout(() => document.getElementById('overlaySearch').focus(), 100);
}
function closeSearch() {
    document.getElementById('searchOverlay').classList.remove('open');
}
document.getElementById('searchOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('searchOverlay')) closeSearch();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});

// ── Category filter
function filterCat(btn) {
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
}

// ── Load more
function loadMore() {
    const extras = document.querySelectorAll('[data-extra]');
    let shown = 0;
    extras.forEach(el => {
        if (el.style.display === 'none') { el.style.display = 'flex'; shown++; }
    });
    if (shown === 0 || document.querySelectorAll('[data-extra][style*="none"]').length === 0) {
        document.getElementById('loadMoreBtn').textContent = 'You\'re all caught up! ✓';
        document.getElementById('loadMoreBtn').style.opacity = '0.5';
        document.getElementById('loadMoreBtn').style.cursor = 'default';
    }
}

// ── Subscribe
function handleSubscribe(btn) {
    const input = btn.previousElementSibling;
    if (!input.value || !input.value.includes('@')) {
        input.style.background = 'rgba(234,67,53,0.25)';
        input.placeholder = 'Please enter a valid email';
        return;
    }
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#e6f4ea';
    btn.style.color = '#34A853';
    input.disabled = true;
}

// ── Lazy fade-in for cards on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.animationPlayState = 'running';
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.post-card, .featured-card').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});