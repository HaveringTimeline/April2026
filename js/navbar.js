const navbarScript = document.currentScript;

if (!(navbarScript instanceof HTMLScriptElement) || !navbarScript.src) {
  console.error("Unable to determine the navbar loader URL.");
} else {
  const navbarUrl = new URL("../navbar.html", navbarScript.src);
  const placeholder = document.getElementById("nav-placeholder");

  if (!placeholder) {
    console.error('Cannot load the navigation: missing "#nav-placeholder".');
  } else {
    fetch(navbarUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Navbar request failed: ${response.status} ${response.statusText}`,
          );
        }
        return response.text();
      })
      .then((markup) => {
        placeholder.innerHTML = markup;
        placeholder.querySelectorAll("a[href]").forEach((link) => {
          link.href = new URL(link.getAttribute("href"), navbarUrl).href;
        });
      })
      .catch((error) => {
        console.error("Error loading the navigation:", error);
      });
  }
}
