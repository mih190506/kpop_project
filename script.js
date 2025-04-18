document.addEventListener('DOMContentLoaded',() => {
    const idolList = document.getElementById("idol-list");
    const groupFilter = document.getElementById("group-filter");

    const idols =[
        {
            name: "Han Jisung",
            group: "Stray Kids",
            position: "Rapper, Producer e Vocal",
            birth: "2000-09-14",
            image: "assets/images/han.jpg"
        },
        {
            name: "Yang Jeongin",
            group: "Stray Kids",
            position: "Vocal",
            birth: "2001-02-08",
            image: "assets/images/i.n3.jpg"
        },
        {
            name: "Choi Soobin",
            group: "TXT",
            position: "Líder, Vocal",
            birth: "2000-12-05",
            image: "assets/images/soobin.jpg"
        }
    ];

    function displayIdols(filteredIdols){
        idolList.innerHTML = "",

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
            </div>
            `;

            idolList.appendChild(card);
        });
    }

    groupFilter.addEventListener("change", () => {
        const selectedGroup = groupFilter.value;
        const filtered = selectedGroup ? idols.filter(idol => idol.group === selectedGroup) : idols;
        displayIdols(filtered)
    });

    displayIdols(idols);
})