export function mobileMenu() {
    const mainMenu = document.querySelector('.mainMenu');
    const closeMenu = document.querySelector('.closeMenu');
    const openMenu = document.querySelector('.openMenu');
    const sidePanel = document.querySelector('.sidepanel');
    const collapse = document.querySelector('.collapse');
    const expand = document.querySelector('.expand');

    console.log("Loaded.")

    openMenu.addEventListener('click', show);
    closeMenu.addEventListener('click', close);

    function show() {
        mainMenu.style.display = 'flex';
        mainMenu.style.top = '0';
    }
    function close() {
        mainMenu.style.top = '-500%';
        mainMenu.style.display = 'flex';
    }

    function openSidePanel() {
        sidePanel.style.display = "block";
        collapse.style.display = 'block';
        expand.style.display = "none"
    }

    function closeSidePanel() {
        sidePanel.style.display = "none";
        collapse.style.display = 'none';
        expand.style.display = "block"
    }
}