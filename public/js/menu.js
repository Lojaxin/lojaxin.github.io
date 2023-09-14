document.addEventListener("DOMContentLoaded", function () {
    let menuItems = document.querySelectorAll(".submenu");
    menuItems.forEach((li) => {
        const menuNode = li.querySelector('a');
        if (menuNode.href.startsWith('javacript:')) {
            menuNode.addEventListener("click", (event) => {
                event.preventDefault();
                const ul = menuNode.nextElementSibling;
                if (ul) {
                    ul.style.display = ul.style.display === 'block' ? 'none' : "block";
                    menuNode.classList.toggle('active');
                }
            });
        }
    });
});