// for date formatting purposes
function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid date';
    
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".articles-box");
    
    async function fetchArticles() {
        try {
            const res = await fetch("http://localhost:3000/api/articles/all");

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            const articles = data.articles;

            if (!articles || articles.length === 0) {
                container.innerHTML = "<p>No articles found.</p>";
                return;
            }

            articles.forEach(article => {
                const div = document.createElement("div");
                div.classList.add("article");

                div.innerHTML = `
                    <h3><strong>${article.title}</strong></h3>
                    <div class="article-meta">
                        <span class="article-date">${formatDate(article.publishedDate)}</span>
                        <span class="article-tags">${article.tags.join(', ')}</span>
                    </div>
                `;

                div.addEventListener("click", () => {
                    if (article.link) {
                        window.open(article.link, "_blank");
                    } else {
                        console.warn("No link found for this article");
                    }
                });

                container.appendChild(div);
            });
        } catch (err) {
            console.error("Error fetching articles:", err);
            container.innerHTML = "<p>Error loading articles.</p>";
        }
    }

    fetchArticles();
});
