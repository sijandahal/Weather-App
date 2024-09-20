const toggleTheme = ()=> {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme)
}

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem('theme');

const initialTheme = storedTheme ?? (darkThemeMq ? "dark" : "light")
document.documentElement.setAttribute('data-theme', initialTheme);

const themeButton = document.querySelector('[data-theme-btn]')
themeButton.addEventListener("click", toggleTheme)



