// frontend/script.js
document.getElementById("shortenForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const urlInput = document.getElementById("urlInput").value;

    fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ originalUrl: urlInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("shortenedUrl").innerText = `Shortened URL: ${data.shortUrl}`;
    })
    .catch(error => {
        document.getElementById("shortenedUrl").innerText = "Error shortening the URL!";
    });
});
