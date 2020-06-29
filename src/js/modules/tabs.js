const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
        tabs = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showContent(i = 0) {
        content[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }

    hideContent();
    showContent();

};

export default tabs;