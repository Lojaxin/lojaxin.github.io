document.addEventListener("DOMContentLoaded", function () {
    //获取url信息,默认打开所有父级菜单
    var path = window.location.pathname;
    path = path.split('github.io/dist')[1];
    var menuItems = document.querySelectorAll(".submenu");
    menuItems.forEach((li) => {
        var menuNode = li.querySelector('a');
        if (menuNode.href.includes(path)) {
            //匹配路由,默认打开所有父级的ul
            findAllParentULs(menuNode).forEach(ul => {
                ul.style.display = "block";
                //ul左边的节点是a
                var left = ul.previousElementSibling;
                if (left && left.href && left.href.startsWith('javacript:')) {
                    left.classList.add('active');
                }
            })
        }
        if (menuNode.href.startsWith('javacript:')) {
            menuNode.addEventListener("click", (event) => {
                event.preventDefault();
                var ul = menuNode.nextElementSibling;
                if (ul) {
                    ul.style.display = ul.style.display === 'block' ? 'none' : "block";
                    menuNode.classList.toggle('active');
                }
            });
        }
    });
});

function findAllParentULs(element, parentULs = []) {
    while (element && element.class !== 'menu') {
        element = element.parentElement;
        if (element && element.tagName === 'UL') {
            parentULs.push(element);
        }
    }
    return parentULs;
}
