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
    const modal = document.getElementById("articleModal");
    const closeModalBtn = document.getElementById("closeModal");

    async function openArticle(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/articles/${id}`);
        if (!res.ok) throw new Error("Article not found");

        const article = await res.json();

        document.getElementById("modalTitle").textContent = article.title;
        document.getElementById("modalAuthor").textContent =
            `Author: ${article.author || "Unknown"}`;
        document.getElementById("modalWebsite").textContent =
            `Source: ${article.website}`;
        document.getElementById("modalDate").textContent =
            `Published: ${formatDate(article.publishedDate)}`;
        document.getElementById("modalContent").textContent = article.content;
        document.getElementById("modalLink").href = article.link

        modal.classList.remove("hidden");

        } catch (err) {
            console.error("Error loading article:", err);
            alert("Failed to load article.");
    }
    }

    async function fetchArticles() {
        try {
            const res = await fetch("http://localhost:3000/api/articles/all");

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            // Expecting: { articles: [...] }
            const articles = data.articles;

            container.innerHTML = ""; // Clear placeholders

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

                div.addEventListener("click", () => openArticle(article.id));

                container.appendChild(div);
            });
        } catch (err) {
            console.error("Error fetching articles:", err);
            container.innerHTML = "<p>Error loading articles.</p>";
        }
    }
    // Close modal on clicking X
    closeModalBtn.onclick = () => modal.classList.add("hidden");

    // Close modal on clicking outside content
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    };
    fetchArticles();
});
