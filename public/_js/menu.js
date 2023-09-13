document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu li");

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {

            const submenu = item.querySelector("ul");
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : "block";
            }
        });
    });

});