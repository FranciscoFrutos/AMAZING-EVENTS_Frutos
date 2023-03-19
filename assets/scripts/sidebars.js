/* barras laterales */

const sidebarFilters = document.querySelector('#filters');
const filtersButton = document.querySelector('#filtersButton');
const sidebarMenu = document.querySelector('#menu');
const menuButton = document.querySelector('#menuButton');

if (filtersButton != null){
  filtersButton.addEventListener('click', () => {
    sidebarFilters.classList.toggle('show');
  });
}
menuButton.addEventListener('click', () => {
  sidebarMenu.classList.toggle('show');
});