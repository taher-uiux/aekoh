
// JavaScript for toggling category list items
document.addEventListener('DOMContentLoaded', function () {
    const categoryItems = document.querySelectorAll('.category-list > li');

    categoryItems.forEach(function (item) {
        const header = item.querySelector('span');
        const icon = header ? header.querySelector('ion-icon') : null;
        if (header && icon) {
            header.addEventListener('click', function (e) {
                e.preventDefault();

                const isExpanded = item.classList.contains('expanded');

                if (isExpanded) {
                    // Collapse
                    item.classList.remove('expanded');
                    item.setAttribute('aria-expanded', 'false');
                    icon.setAttribute('name', 'chevron-down-outline');
                } else {
                    // Expand
                    item.classList.add('expanded');
                    item.setAttribute('aria-expanded', 'true');
                    icon.setAttribute('name', 'chevron-up-outline');
                }
            });
        }
    });
});

// JavaScript for changing header background on scroll
document.addEventListener('DOMContentLoaded', () => {
    const targetElement = document.getElementById('header'); // Replace with the actual ID of your element
    const classToRemove = 'header-transparent';

    window.addEventListener('scroll', () => {
        const oneHundredVh = window.innerHeight;

        if (window.scrollY > oneHundredVh) {
            targetElement.classList.remove(classToRemove);
        } else {
            targetElement.classList.add(classToRemove);
        }
    });
});

// JavaScript for hiding/showing header on scroll
document.addEventListener('DOMContentLoaded', function () {
    var lastScrollTop = 0, delta = 15;
    window.addEventListener('scroll', function (event) {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if ((st > lastScrollTop) && (lastScrollTop > 0)) {
            // downscroll code
            document.querySelector('header').style.top = '-8.5rem';
        } else {
            // upscroll code
            document.querySelector('header').style.top = '0px';
        }
        lastScrollTop = st;
    });
});

// JavaScript for animated counters
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function animateCounter(el) {
    const countTo = parseInt(el.getAttribute("data-countto"), 10);
    const duration = parseInt(el.getAttribute("data-duration"), 10);
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(progress * countTo);
        el.textContent = currentCount;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            el.textContent = countTo;
        }
    }

    requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll(".counter");
    const started = new Set();

    function checkCounters() {
        counters.forEach(function (el) {
            if (!started.has(el) && isElementInViewport(el)) {
                animateCounter(el);
                started.add(el);
            }
        });
    }

    window.addEventListener('scroll', checkCounters);
    window.addEventListener('resize', checkCounters);
    checkCounters(); // Initial check in case already in viewport
});
