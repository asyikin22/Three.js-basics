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

const tooltip = document.getElementById('country-tooltip');

document.querySelectorAll('.flag-item').forEach(flag => {
    flag.addEventListener('mouseenter', handleMouseEnter);
    flag.addEventListener('mouseleave', handleMouseLeave);
    })

async function handleMouseEnter(event) {
    const flag = event.currentTarget;
    const country = flag.getAttribute('data-country');
    const wikiPage = flag.getAttribute('data-wiki')

    //reset tooltip content
    tooltip.querySelector('.summary').textContent = "Loading summary...";
    tooltip.querySelector('.capital').textContent = "";
    tooltip.querySelector('.population').textContent = "";
    tooltip.querySelector('.language').textContent = "";
    tooltip.querySelector('.wiki-link').href = "";

    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiPage}`);
        const data = await response.json();

        if(data.extract) {
            tooltip.querySelector('.summary').textContent = data.extract;
            tooltip.querySelector('.capital').textContent = data?.properties?.capital || "N/A";
            tooltip.querySelector('.population').textContent = data?.properties?.population || "N/A";
            tooltip.querySelector('.language').textContent = data?.properties?.language || "N/A";
            tooltip.querySelector('.wiki-link').href = data.content_urls.desktop.page;
        } else {
            tooltip.querySelector('.summary').textContent = "Summary not available"
        }

        //position the tooltip above the flag
        const flagRect = flag.getBoundingClientRect();
        tooltip.style.left = `${flagRect.left + window.scrollX}px`;
        tooltip.style.top = `${flagRect.top + window.scrollY - tooltip.offsetHeight}px`

        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    } catch (error) {
        tooltip.querySelector('.summary').textContent = "Error loading summary";
        console.error("Error fetching data", error)
    }
}

function handleMouseLeave() {
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
}