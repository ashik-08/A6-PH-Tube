const showAllButton = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  console.log(data.data);

  const buttonContainer = document.getElementById("button-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="showVideos(${category.category_id}); toggleLoadingDots(true);" class="bg-[#25252526] rounded text-[#252525B2] text-lg font-medium px-5 py-2">${category.category}</button>
        `;
    buttonContainer.appendChild(div);
  });
};

const showVideos = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  console.log(data.data);

  const cardContainer = document.getElementById("card-container");
  const nullCardContainer = document.getElementById("null-card-container");
  cardContainer.innerHTML = "";
  nullCardContainer.innerHTML = "";

  if (data.data.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex flex-col justify-center items-center mt-48">
            <figure>
                <img src="./images/Icon.png" alt="">
            </figure>
            <h1 class="text-[#171717] text-3xl font-bold mt-8 text-center">Oops!! Sorry, There is no <br> content here</h1>
        </div>
        `;
    nullCardContainer.appendChild(div);
  } else {
    data.data.forEach((videos) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <figure>
            <img src="./images/Icon.png" alt="thumbnail-img" class="rounded-lg"/>
        </figure>
        <div class="flex space-x-3">
            <figure>
                <img src="./images/badge.svg" alt="user-img" />
            </figure>
            <div>
                <h4>Title</h4>
                <p class="inline-flex gap-2">
                    Awlad Hossain <img src="./images/badge.svg" alt="verification-img" />
                </p>
                <p>91K views</p>
            </div>
        </div>
        `;
      cardContainer.appendChild(div);
    });
  }
  // hide loading dots
  toggleLoadingDots(false);
};

const toggleLoadingDots = (isLoading) => {
  const loadingDots = document.getElementById("loading-dots");
  if (isLoading) {
    loadingDots.classList.remove("hidden");
  } else {
    loadingDots.classList.add("hidden");
  }
};

showAllButton();
// showVideos();
