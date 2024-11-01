document.querySelectorAll('.dropdown').forEach(dropdown => {
    const button = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content')

    //show dropdown content on mouse enter
    button.addEventListener('mouseenter', function() {
        dropdownContent.style.display = 'block';
    });

    //hide dropdown when mouse leaves the dropdown area
    dropdown.addEventListener('mouseleave', function() {
        dropdownContent.style.display = 'none';
    });
})