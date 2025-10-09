// JavaScript for product filtering and sorting
document.addEventListener('DOMContentLoaded', function () {
    const categoryItems = document.querySelectorAll('.category-list > li');
    const productGrid = document.querySelector('.product-grid');
    const allProducts = Array.from(document.querySelectorAll('.product-item'));
    const resultCount = document.querySelector('.product-top-bar p');
    const sortSelect = document.querySelector('.sort-select');

    let activeCategory = null;

    function collapseAllCategories() {
        categoryItems.forEach(item => {
            item.classList.remove('expanded');
            item.setAttribute('aria-expanded', 'false');
            const icon = item.querySelector('ion-icon');
            if (icon) icon.setAttribute('name', 'chevron-down-outline');
            const sublist = item.querySelector('ul');
            if (sublist) sublist.style.display = 'none';
        });
    }
    
    categoryItems.forEach(function (item) {
        const header = item.querySelector('span');
        const icon = header ? header.querySelector('ion-icon') : null;
        const subLinks = item.querySelectorAll('ul li a');
        const sublist = item.querySelector('ul');

        // Main category click
        if (header && icon) {
            header.addEventListener('click', function (e) {
                e.preventDefault();

                const isExpanded = item.classList.contains('expanded');
                const mainCategory = header.childNodes[0].textContent.trim();

                if (isExpanded) {
                    // Collapse if already expanded
                    item.classList.remove('expanded');
                    item.setAttribute('aria-expanded', 'false');
                    icon.setAttribute('name', 'chevron-down-outline');
                    if (sublist) sublist.style.display = 'none';
                    activeCategory = null;
                } else {
                    // Collapse others and expand this one
                    collapseAllCategories();

                    item.classList.add('expanded');
                    item.setAttribute('aria-expanded', 'true');
                    icon.setAttribute('name', 'chevron-up-outline');
                    if (sublist) sublist.style.display = 'block';

                    activeCategory = mainCategory;

                    // Remove subcategory highlight
                    document.querySelectorAll('.category-list ul li a').forEach(a => a.classList.remove('active'));
                }

                filterAndRender();
            });
        }

        // Subcategory click
        subLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const subCategory = link.textContent.trim();
                activeCategory = subCategory;

                // Highlight selected subcategory
                document.querySelectorAll('.category-list ul li a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');

                filterAndRender();
            });
        });
    });

    sortSelect.addEventListener('change', filterAndRender);

    function filterAndRender() {
        let filtered = allProducts;

        if (activeCategory) {
            filtered = filtered.filter(item => item.dataset.category === activeCategory);
        }

        // Sort
        const sortVal = sortSelect.value;
        if (sortVal === 'name-asc') {
            filtered.sort((a, b) =>
                a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent)
            );
        } else if (sortVal === 'name-desc') {
            filtered.sort((a, b) =>
                b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent)
            );
        }

        // Render
        productGrid.innerHTML = '';
        filtered.forEach(item => productGrid.appendChild(item));

        resultCount.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;
    }

    // Set first main category as default on page load
    const firstCategoryItem = document.querySelector('.category-list > li');
    if (firstCategoryItem) {
        const header = firstCategoryItem.querySelector('span');
        const icon = header.querySelector('ion-icon');
        const mainCategory = header.childNodes[0].textContent.trim();

        activeCategory = mainCategory;

        // Expand the first category visually
        firstCategoryItem.classList.add('expanded');
        firstCategoryItem.setAttribute('aria-expanded', 'true');
        icon.setAttribute('name', 'chevron-up-outline');
    }

    // Now render only filtered products
    filterAndRender();

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