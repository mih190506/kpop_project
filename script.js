document.addEventListener('DOMContentLoaded',() => {
    const idolList = document.getElementById("idol-list");
    const groupFilter = document.getElementById("group-filter");

    let idols =[];

    function displayIdols(filteredIdols){
        idolList.innerHTML = "";

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
            <button class="favorite-btn" data-name="${idol.name}">🤍</button>
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
            const isFav = localStorage.getItem(`fav-${idolName}`) === "true";
            btn.textContent = isFav ? "💖" : "🤍";

            btn.addEventListener("click", () =>{
                const current = localStorage.getItem(`fav-${idolName}`) === "true";
                localStorage.setItem(`fav-${idolName}`, !current);
                btn.textContent = !current ? "💖" : "🤍";
            });
        });
    }

    groupFilter.addEventListener("change", () => {
        const selectedGroup = groupFilter.value;
        const filtered = selectedGroup ? idols.filter(idol => idol.group === selectedGroup) : idols;
        displayIdols(filtered)
    });


    fetch("data/idols.json")
    .then(res => res.json())
    .then(data =>{
        idols = data;
        displayIdols(idols);
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