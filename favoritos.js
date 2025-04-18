document.addEventListener("DOMContentLoaded", () =>{
    const idolList =document.getElementById("idol-list");
    let idol = [];

    function displayIdols(filteredIdols){
        idolList.innerHTML = "";

        if(filteredIdols.length === 0){
            idolList.innerHTML = "<p>Nenhum idol favoritado ainda 😢</p>";
            return;

        }

        filteredIdols.forEach(idol => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
            <img src="${idol.image}" alt="${idol.name}">
                <div class="card-content">
                    <h3>${idol.name}</h3>
                    <p><strong>Grupo:</strong> ${idol.group}</p>
                    <p><strong>Posição:</strong> ${idol.position}</p>
                    <p><strong>Nascimento:</strong> ${idol.birth}</p>
                    <button class="favorite-btn" data-name="${idol.name}">💖</button>
                </div>
            `;

            idolList.appendChild(card);
        });
        activateFavoriteButtons();
    }

    function activateFavoriteButtons(){
        const buttons = document.querySelectorAll(".favorite-btn");

        buttons.forEach(btn => {
            const idolName = btn.getAttribute("data-name");

            btn.addEventListener("click", () => {
                localStorage.setItem(`fav-${idolName}`, "false");
                btn.closest(".card").remove();

                if (document.querySelectorAll(".card").length === 0){
                    idolList.innerHTML = "<p>Nenhum idol favoritado ainda 😢</p>";
                }
            });
        });
    }

    fetch("data/idols.json")
    .then(res => res.json())
    .then (data => {
        idols = data;
        const favoritos = idols.filter(idol => localStorage.getItem(`fav-${idol.name}`) === "true");
        displayIdols(favoritos);
    })
    .catch(error => console.error("Erro ao carregar dados: ", error));
});

const toggleBtn = document.getElementById("toggle-theme");

const currentTheme = localStorage.getItem("theme");
if(currentTheme === "dark"){
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light")
});