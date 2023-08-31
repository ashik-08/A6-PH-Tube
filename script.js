const showAllButton = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    console.log(data.data);

    const buttonContainer = document.getElementById('button-container');

    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="bg-[#25252526] rounded text-[#252525B2] text-lg font-medium px-5 py-2">${category.category}</button>
        `;
        buttonContainer.appendChild(div);
    });
}

showAllButton();