document.addEventListener('DOMContentLoaded',() => {
    const idolList = document.getElementById("idol-list");
    const groupFilter = document.getElementById("group-filter");
    const positionFilter = document.getElementById("position-filter");
    const ageFilter = document.getElementById("age-filter")

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

    function calcularIdade(dataNascimento){
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if(mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade
    }

    function applyFilter(){
        const selectedGroup = groupFilter.value;
        const selectedPosition = positionFilter.value.toLowerCase().trim();
        const selectedAge = ageFilter.value;

        const filtered = idols.filter(idol =>{
            const groupMatch = selectedGroup ? idol.group.toLowerCase() === selectedGroup.toLowerCase() : true;
            const positionMatch = selectedPosition ? idol.position.toLowerCase().includes(selectedPosition) : true;

            const idade = calcularIdade (idol.birth);
            let ageMatch = true;

            if(selectedAge === "under-22"){
                ageMatch = idade < 22;
            }else if(selectedAge === "22-27"){
                ageMatch = idade >= 22 && idade <= 27;
            }else if(selectedAge === "over-27"){
                ageMatch = idade > 27;
            }


            return groupMatch && positionMatch && ageMatch;
        });
        
        displayIdols(filtered);

    }

    groupFilter.addEventListener("change", applyFilter);
    positionFilter.addEventListener("change", applyFilter);
    ageFilter.addEventListener("change", applyFilter);

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