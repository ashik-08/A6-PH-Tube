const showAllButton = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const buttonContainer = document.getElementById("button-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="${category.category_id}" onclick="showVideos(${category.category_id}); toggleLoadingDots(true); changeColor('${category.category_id}');" class="button bg-[#25252526] rounded text-[#252525B2] text-lg font-medium px-5 py-2">${category.category}</button>
        `;
    buttonContainer.appendChild(div);
  });
};

const showVideos = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();

  const cardContainer = document.getElementById("card-container");
  const nullCardContainer = document.getElementById("null-card-container");
  cardContainer.innerHTML = "";
  nullCardContainer.innerHTML = "";

  if (data.data.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex flex-col justify-center items-center mt-48">
            <figure>
                <img src="./images/Icon.png" alt="null-content-img">
            </figure>
            <h1 class="text-[#171717] text-3xl font-bold mt-8 text-center">Oops!! Sorry, There is no <br> content here</h1>
        </div>
        `;
    nullCardContainer.appendChild(div);
  } else {
    data.data.forEach((videos) => {
      // time converting function
      const timeConvert = () => {
        if (videos.others?.posted_date !== "") {
          const hours = Math.floor(videos.others?.posted_date / 3600);
          const minutes = Math.floor((videos.others?.posted_date % 3600) / 60);

          return `${hours}hrs ${minutes}min ago`;
        } else {
          return "No data available";
        }
      };
      // call function
      const time = timeConvert();

      const div = document.createElement("div");
      if (videos.authors[0]?.verified === true) {
        div.innerHTML = `
        <div class="space-y-5">
          <figure class="max-w-[350px] h-[200px] relative">
            <img class="w-full h-full rounded-lg" src="${videos?.thumbnail}" alt="thumbnail-img" />
            <div class="bg-[#171717] w-1/3 rounded absolute bottom-3 right-3">
              <span class="text-white text-xs font-normal flex justify-center py-1">${time}</span>
            </div>
          </figure>

          <div class="flex space-x-4">
            <figure class="w-10 h-10">
                <img class="w-full h-full rounded-full" src="${videos.authors[0]?.profile_picture}" alt="user-img" />
            </figure>
            <div>
                <h4 class="text-[#171717] text-lg font-bold">${videos?.title}</h4>
                <p class="inline-flex gap-2 text-[#171717B2] text-base font-normal mt-1">
                ${videos.authors[0]?.profile_name} <img src="./images/badge.svg" alt="verification-img" />
                </p>
                <p id="views-count" class="text-[#171717B2] text-base font-normal mt-1.5">${videos.others?.views} views</p>
            </div>
          </div>
        </div>
        `;
      } else {
        div.innerHTML = `
        <div class="space-y-5">
          <figure class="max-w-[350px] h-[200px] relative">
            <img class="w-full h-full rounded-lg" src="${videos?.thumbnail}" alt="thumbnail-img" />
            <div class="bg-[#171717] w-1/3 rounded absolute bottom-3 right-3">
              <span class="text-white text-xs font-normal flex justify-center py-1">${time}</span>
            </div>
          </figure>

          <div class="flex space-x-4">
            <figure class="w-10 h-10">
                <img class="w-full h-full rounded-full" src="${videos.authors[0]?.profile_picture}" alt="user-img" />
            </figure>
            <div>
                <h4 class="text-[#171717] text-lg font-bold">${videos?.title}</h4>
                <p class="inline-flex gap-2 text-[#171717B2] text-base font-normal mt-1">
                ${videos.authors[0]?.profile_name}
                </p>
                <p id="views-count" class="text-[#171717B2] text-base font-normal mt-1.5">${videos.others?.views} views</p>
            </div>
          </div>
        </div>
        `;
      }

      cardContainer.appendChild(div);
    });
  }
  // hide loading dots
  toggleLoadingDots(false);
};

const sortByViews = () => {
  const cardContainer = document.getElementById("card-container");

  const videos = Array.from(cardContainer.children);

  videos.sort((a, b) => {
    const A = parseInt(a.querySelector("#views-count")?.textContent);
    const B = parseInt(b.querySelector("#views-count")?.textContent);

    return B - A;
  });

  cardContainer.innerHTML = "";

  videos.forEach((video) => {
    cardContainer.appendChild(video);
  });
};

const toggleLoadingDots = (isLoading) => {
  const loadingDots = document.getElementById("loading-dots");
  if (isLoading) {
    loadingDots.classList.remove("hidden");
  } else {
    loadingDots.classList.add("hidden");
  }
};

const changeColor = (id) => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.style.backgroundColor = "#25252526";
    button.style.fontWeight = "500";
    button.style.color = "#252525B2";
  });
  const clicked = document.getElementById(`${id}`);
  if (clicked) {
    clicked.style.backgroundColor = "#FF1F3D";
    clicked.style.fontWeight = "600";
    clicked.style.color = "#FFFFFF";
  }
};

showAllButton();
showVideos("1000");
