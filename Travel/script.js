//dropdown on navbar
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

//tooltop functionality

let tooltipTimeout;
const tooltip = document.getElementById('country-tooltip');
let currentFlag = null;

document.querySelectorAll('.flag-item').forEach(flag => {
    flag.addEventListener('click', handleClick);
})

//function to handle click on flags
async function handleClick(event) {
    const flag = event.currentTarget;

    if(currentFlag === flag) {
        hideToolTip();
        return
    }

    currentFlag = flag;
    const wikiPage = flag.getAttribute('data-wiki')
   
    //reset tooltip content
    tooltip.querySelector('.summary').textContent = "Loading summary...";
    tooltip.querySelector('.wiki-link').href = "";

    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiPage}`);
        const data = await response.json();

        if(data.extract) {
            tooltip.querySelector('.summary').textContent = data.extract;
            tooltip.querySelector('.wiki-link').href = data.content_urls.desktop.page;
        } else {
            tooltip.querySelector('.summary').textContent = "Summary not available"
        }

        //position the tooltip below the flag
        const containerRect = document.getElementById('globe_container').getBoundingClientRect();
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        tooltip.style.left = `${containerRect.left + window.scrollX + (containerRect.width / 2) - (tooltipWidth / 2)}px`;
        tooltip.style.top = `${containerRect.top + window.scrollY + (containerRect.height / 2) - (tooltipHeight / 2)}px`

        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    } catch (error) {
        tooltip.querySelector('.summary').textContent = "Error loading summary";
        console.error("Error fetching data", error)
    }
}

function hideToolTip() {
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
    currentFlag = null;
}

//click event to hide tooltip when clicking outside
document.addEventListener('click', function(event) {
    if(!tooltip.contains(event.target) && !currentFlag.contains(event.target)) {
        hideToolTip();
    }
});