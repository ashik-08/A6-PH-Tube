let num = 2;
const showAllButton = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
//   console.log(data.data);

  const buttonContainer = document.getElementById("button-container");
    
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="showVideos(${category.category_id}); toggleLoadingDots(true); changeColor(${category.category_id});" class="button bg-[#25252526] rounded text-[#252525B2] text-lg font-medium px-5 py-2">${category.category}</button>
        `;
    buttonContainer.appendChild(div);
  });
};

const showVideos = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
//   console.log(data.data);

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
    // console.log(data.data[0].thumbnail);
    data.data.forEach((videos) => {
      const div = document.createElement("div");
      if (videos.authors[0]?.verified === true) {
        // div.innerHTML = `
        // <figure class="w-[300px] h-[200px]">
        //     <img src="${videos?.thumbnail}" alt="thumbnail-img" class="rounded-lg"/>
        // </figure>
        // <div class="flex space-x-3">
        //     <figure class="w-[40px] h-[40px]">
        //         <img src="${videos.authors[0]?.profile_picture}" alt="user-img" />
        //     </figure>
        //     <div>
        //         <h4>${videos?.title}</h4>
        //         <p class="inline-flex gap-2">
        //         ${videos.authors[0]?.profile_name} <img src="./images/badge.svg" alt="verification-img" />
        //         </p>
        //         <p>${videos.others?.views} views</p>
        //     </div>
        // </div>
        // `;
        div.innerHTML = `
        <div class="space-y-5">
          <figure class="max-w-[350px] h-[200px]">
            <img class="w-full h-full rounded-lg" src="${videos?.thumbnail}" alt="thumbnail-img" />
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
                <p class="text-[#171717B2] text-base font-normal mt-1.5">${videos.others?.views} views</p>
            </div>
          </div>
        </div>
        `;
      } else {
        // div.innerHTML = `
        // <figure class="w-[300px] h-[200px]">
        //     <img src="${videos?.thumbnail}" alt="thumbnail-img" class="rounded-lg"/>
        // </figure>
        // <div class="flex space-x-3">
        //     <figure class="w-[40px] h-[40px]">
        //         <img src="${videos.authors[0]?.profile_picture}" alt="user-img" />
        //     </figure>
        //     <div>
        //         <h4>${videos?.title}</h4>
        //         <p class="inline-flex gap-2">
        //         ${videos.authors[0]?.profile_name}
        //         </p>
        //         <p>${videos.others?.views} views</p>
        //     </div>
        // </div>
        // `;
        // div.innerHTML = `
        // <div class="">
        //   <figure class="max-w-[350px] h-[200px]">
        //     <img class="w-full h-full rounded-lg" src="${videos?.thumbnail}" alt="thumbnail-img" />
        //   </figure>
        //   <div class="card-body">
        //     <h2 class="card-title">Shoes!</h2>
        //     <p>If a dog chews shoes whose shoes does he choose?</p>
        //   <div class="card-actions justify-end">
        //     <button class="btn btn-primary">Buy Now</button>
        //   </div>
        //   </div>
        // </div>
        // `;
        div.innerHTML = `
        <div class="space-y-5">
          <figure class="max-w-[350px] h-[200px]">
            <img class="w-full h-full rounded-lg" src="${videos?.thumbnail}" alt="thumbnail-img" />
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
                <p class="text-[#171717B2] text-base font-normal mt-1.5">${videos.others?.views} views</p>
            </div>
          </div>
        </div>
        `;
      }
      
      cardContainer.appendChild(div);
    });
  }
  // change button color
  
  // hide loading dots
  toggleLoadingDots(false);
//   changeColor(false);
};

const toggleLoadingDots = (isLoading) => {
  const loadingDots = document.getElementById("loading-dots");
  if (isLoading) {
    loadingDots.classList.remove("hidden");
  } else {
    loadingDots.classList.add("hidden");
  }
};

// change button color
// let buttons = document.querySelectorAll('.button');
// let prevButtonIndex = null;

// Set the initial color
// changeColor(0);
/*
function changeColor(index) {
    console.log('clicked');
  if (prevButtonIndex !== null) {
    buttons[prevButtonIndex].style.backgroundColor = 'gray';
  }

  buttons[index].style.backgroundColor = 'red';
  prevButtonIndex = index;
}
*/
showAllButton();
showVideos('1000');
