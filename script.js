const GOOGLE_API_KEY = "AIzaSyBI081GRb0WYZN1LQi789TzuNH5pxguWyU";
const GOOGLE_CSE_ID = "9251adfd6f6914a63"; // Your Google Custom Search Engine ID

async function searchRecyclingInfo() {
    let searchTerm = document.getElementById("searchInput").value;
    let resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = `<p>Searching for ${searchTerm}...</p>`;

    let searchURL = `https://www.googleapis.com/customsearch/v1?q=${searchTerm}+how+to+recycle+or+donate&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}`;

    try {
        let response = await fetch(searchURL);
        let data = await response.json();

        resultsContainer.innerHTML = "<h2>Recycling & Donation Guides</h2>";
        if (data.items) {
            data.items.forEach(item => {
                resultsContainer.innerHTML += `
                    <div class="search-result">
                        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                        <p>${item.snippet}</p>
                    </div>
                `;
            });
        } else {
            resultsContainer.innerHTML += "<p>No results found. Try another search term.</p>";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML = "<p>Error retrieving search results. Please try again later.</p>";
    }
}

// Attach search function to button click
document.querySelector("button").addEventListener("click", searchRecyclingInfo);
