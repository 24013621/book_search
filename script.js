async function searchBooks() {
  const query = document.getElementById('searchInput').value;
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    // Filter: only books with all 3: title, author, cover
    const books = data.docs
      .filter(book => book.title && book.author_name && book.cover_i)
      .slice(0, 10); // Show top 10 only

    resultsContainer.innerHTML = "";

    if (books.length === 0) {
      resultsContainer.innerHTML = "<p>No valid results found.</p>";
      return;
    }

    books.forEach(book => {
      const title = book.title;
      const author = book.author_name.join(", ");
      const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

      const bookHTML = `
        <div class="book">
          <img class="cover" src="${coverUrl}" alt="Book cover for ${title}" />
          <div class="info">
            <div class="title">${title}</div>
            <div class="author">${author}</div>
          </div>
        </div>
      `;
      resultsContainer.insertAdjacentHTML("beforeend", bookHTML);
    });

  } catch (error) {
    resultsContainer.innerHTML = "An error occurred while fetching results.";
    console.error(error);
  }
}
