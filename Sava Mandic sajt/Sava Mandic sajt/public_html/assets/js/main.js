/*!
=========================================================
* Pigga Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function () {
  $(".navbar .nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        700,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

function validateForm() {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var date = document.getElementById("date").value;
  var seats = document.getElementById("seats").value;
  var email = document.getElementById("email").value;
  var subscribe = document.getElementById("subscribe").checked;

  var nameError = document.getElementById("nameError");
  var phoneError = document.getElementById("phoneError");
  var dateError = document.getElementById("dateError");
  var seatsError = document.getElementById("seatsError");
  var resultMessage = document.getElementById("resultMessage");
  var emailError = document.getElementById("emailError");

  var isValid = true;

  if (!name.trim()) {
    nameError.innerHTML = "Name is required";
    isValid = false;
  } else {
    nameError.innerHTML = "";
  }

  var phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  if (!phone.match(phoneRegex)) {
    phoneError.innerHTML = "Invalid phone number";
    isValid = false;
  } else {
    phoneError.innerHTML = "";
  }

  if (!date) {
    dateError.innerHTML = "Date is required";
    isValid = false;
  } else {
    dateError.innerHTML = "";
  }

  if (!seats || seats <= 0) {
    seatsError.innerHTML = "Invalid number of seats";
    isValid = false;
  } else {
    seatsError.innerHTML = "";
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    emailError.innerHTML = "Invalid email format";
    isValid = false;
  } else {
    emailError.innerHTML = "";
  }

  if (!subscribe) {
    subscribeError.innerHTML = "You must subscribe to continue";
    isValid = false;
  } else {
    subscribeError.innerHTML = "";
  }

  if (isValid) {
    resultMessage.innerHTML = "Form is valid. Submitted successfully!";
    resultMessage.style.color = "#4CAF50";

    setTimeout(function () {
      document.getElementById("bookingForm").reset();
      resultMessage.innerHTML = "";
    }, 2000);
  } else {
    resultMessage.innerHTML = "Please fill in all fields correctly.";
    resultMessage.style.color = "#FF0000";
  }

  return isValid;
}

const productNames = [
  "Vegetables salads",
  "Avocado salads",
  "Truffles salads",
  "Pizza italiana",
  "Eggs Toast",
  "Avocado Toast",
];

const productPrices = [25, 35, 18, 30, 24, 44];

const productImages = [
  "assets/imgs/dish-3.jpg",
  "assets/imgs/dish-4.jpg",
  "assets/imgs/dish-5.jpg",
  "assets/imgs/dish-6.jpg",
  "assets/imgs/dish-1.jpg",
  "assets/imgs/dish-2.jpg",
];

const productInfos = [
  "Vegetables Salad is a delightful and nutritious dish that features a vibrant assortment of fresh, crisp vegetables. This refreshing salad typically includes a mix of garden-fresh vegetables such as lettuce, tomatoes, cucumbers, bell peppers, carrots, and any other seasonal produce.",
  "Avocado Salad is a delectable culinary creation that showcases the rich and creamy goodness of avocados. This salad is a harmonious blend of ripe avocados, crisp vegetables, and complementary ingredients, resulting in a dish that is both satisfying and nutritious",
  "Truffle Salad is a sophisticated and indulgent culinary delight that highlights the exquisite flavor of truffles. This salad is a celebration of earthy and aromatic truffle elements, creating a dish that appeals to those with a refined palate",
  "Italian Pizza is a classic and beloved dish that embodies the authentic flavors and culinary heritage of Italy. This iconic pizza style is celebrated for its simplicity, quality ingredients, and the perfect balance of textures and flavors",
  "Eggs Toast is a delightful and versatile breakfast dish that combines the simplicity of toast with the richness of eggs. It offers a satisfying and nutritious start to the day, with its perfect blend of crunchy toast and creamy, cooked eggs.",
  "Avocado Toast is a popular and nutritious dish that has gained widespread acclaim for its simplicity, versatility, and health benefits. This culinary creation features a foundation of toasted bread topped with creamy, mashed avocado.",
];

// Funkcija za generisanje HTML-a za proizvod
function generateProductHTML(product) {
  return `
      <div class="col-md-6 mb-4">
        <a  class="custom-list">
          <div class="img-holder">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="info">
            <div class="head clearfix">
              <h5 class="title float-left">${product.name}</h5>
              <p class="float-right text-primary">$${product.price}</p>
            </div>
            <div class="body">
              <p>${product.info}</p>
            </div>
          </div>
        </a>
      </div>
    `;
}

function displayProducts(products) {
  const productListElement = document.getElementById("productList");
  const noResultsElement = document.getElementById("noResults");

  productListElement.innerHTML = "";

  if (products.length > 0) {
    products.forEach((product) => {
      const productHTML = generateProductHTML(product);
      productListElement.innerHTML += productHTML;
    });

    noResultsElement.style.display = "none";
  } else {
    noResultsElement.style.display = "block";
  }
}

function sortProducts() {
  const sortSelect = document.getElementById("sort");
  const sortOrder = sortSelect.value;

  const sortedProducts = productNames.map((name, index) => ({
    name,
    price: productPrices[index],
    image: productImages[index],
    info: productInfos[index],
  }));

  if (sortOrder === "asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(sortedProducts);
}

function filterProducts() {
  const filterInput = document.getElementById("filter");
  const filterText = filterInput.value.toLowerCase();

  const filteredProducts = productNames
    .filter((name) => name.toLowerCase().includes(filterText))
    .map((name, index) => ({
      name,
      price: productPrices[index],
      image: productImages[index],
      info: productInfos[index],
    }));

  displayProducts(filteredProducts);
}

displayProducts(
  productNames.map((name, index) => ({
    name,
    price: productPrices[index],
    image: productImages[index],
    info: productInfos[index],
  }))
);

var names = ["John Doe", "Maria Garcia", "Mason Miller"];
var occupations = [
  "Business Analyst",
  "Insurance Agent",
  "Residential Appraiser",
];
var images = [
  "assets/imgs/avatar.jpg",
  "assets/imgs/avatar-1.jpg",
  "assets/imgs/avatar-2.jpg",
];
var texts = [
  "Exceptional dining experience! The restaurant's ambiance is inviting, and the service is impeccable.",
  "This hidden gem exceeded all expectations. The atmosphere creates a warm,inviting setting for an meal.",
  "The restaurant strikes a harmonious balance between a family-friendly environment and culinary excellence.",
];

function printTestimonials() {
  var testimonialsContainer = document.getElementById("testimonialsContainer");

  for (var i = 0; i < names.length; i++) {
    var html = `
        <div class="col-md-4 my-3 my-md-0">
          <div class="card">
            <div class="card-body" id="card-body">
              <div class="media align-items-center mb-3">
                <img class="mr-3" src="${images[i]}" alt="Client Image" />
                <div class="media-body">
                  <h6 class="mt-1 mb-0">${names[i]}</h6>
                  <small class="text-muted mb-0">${occupations[i]}</small>
                </div>
              </div>
              <p class="mb-0">${texts[i]}</p>
            </div>
          </div>
        </div>
      `;

    testimonialsContainer.innerHTML += html;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  printTestimonials();
});

document.addEventListener("DOMContentLoaded", function () {
  var loaderWrapper = document.getElementById("loader-wrapper");
  loaderWrapper.style.display = "none";
});

//JQUERY

$(document).ready(function () {
  var isFirstNavDark = true;
  var isSecondNavDark = true;

  function toggleFirstNavColor() {
    isFirstNavDark = !isFirstNavDark;
    $(".nav-first").toggleClass("navbar-dark bg-dark", isFirstNavDark);
  }

  function toggleSecondNavColor() {
    isSecondNavDark = !isSecondNavDark;
    $(".nav-second").toggleClass("navbar-dark bg-dark", isSecondNavDark);
  }

  $("#colorSwitch").change(function () {
    toggleFirstNavColor();
    toggleSecondNavColor();
  });
});

//GALLERY JS
$(document).ready(function () {
  const $gallery = $(".gallery");
  const $galleryItems = $(".gallery-item");
  const $prevButton = $("#prev");
  const $nextButton = $("#next");

  let currentIndex = 0;

  function showPrevImage() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = $galleryItems.length - 1;
    }
    updateGallery();
  }

  function showNextImage() {
    if (currentIndex < $galleryItems.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateGallery();
  }

  function updateGallery() {
    $gallery.css("transform", `translateX(-${currentIndex * 100}%)`);
  }

  $prevButton.on("click", showPrevImage);
  $nextButton.on("click", showNextImage);
});

//PRINT DATA FOR MAIN MANU

var titles = [
  "Vegetable Stir-Fry",
  "Salmon Teriyaki",
  "Mushroom Risotto",
  "Chicken Shawarma",
  "Caprese Salad",
  "Chocolate Fondue",
];

var descriptions = [
  "A colorful medley of crisp vegetables wok-tossed, delivering a harmonious blend of flavors and textures",
  "Grilled salmon glazed in a luscious teriyaki sauce, offering a succulent taste of the ocean",
  "Creamy Arborio rice infused with a rich mushroom broth, creating a luxurious and comforting Italian classic",
  "Tender, marinated chicken wrapped in warm bread, topped with fresh veggies and drizzled with tahini",
  "A refreshing ensemble of ripe tomatoes, fresh mozzarella, and basil leaves drizzled with balsamic glaze, celebrating the essence of Italian simplicity",
  "A decadent dessert experience featuring a velvety pool of melted chocolate, accompanied by an array of fruits and sweets for delightful dipping..",
];

var prices = ["$32", "$23", "$32", "$17", "$21", "$10"];

var menuItemsContainer = document.getElementById("menuItemsContainer");

for (var i = 0; i < titles.length; i++) {
  var menuItemHtml = `
      <div class="col-md-6 my-4">
        <a href="#" class="pb-3 mx-3 d-block text-dark text-decoration-none border border-left-0 border-top-0 border-right-0">
          <div class="d-flex">
            <div class="flex-grow-1">
              ${titles[i]}
              <p class="mt-1 mb-0">${descriptions[i]}</p>
            </div>
            <h6 class="float-right text-primary">${prices[i]}</h6>
          </div>
        </a>
      </div>
    `;
  menuItemsContainer.innerHTML += menuItemHtml;
}

//PRINT DATA TEAM

var teamImages = [
  "assets/imgs/chef-1.jpg",
  "assets/imgs/chef-2.jpg",
  "assets/imgs/chef-3.jpg",
];

var teamNames = ["Brian Scott", "Edward Harris", "Richard Reb"];

var teamDescriptions = [
  "Meet Brian Scott, our Sous Chef and the backbone of our kitchen. With years of experience in high-pressure culinary environments, Brian is a master at orchestrating the kitchen's day-to-day operations. ",
  "Introducing Edward Harris, our skilled Line Cook who thrives in the fast-paced rhythm of the kitchen. Edward expertise lies in preparing a diverse range of dishes with precision and efficiency.",
  "Say hello to Richard Reb, our talented Pastry Chef who adds a sweet touch to our culinary creations. With a passion for the art of pastry, Richard crafts delightful desserts and baked goods that leave a lasting impression",
];

var teamMembersContainer = document.getElementById("teamMembersContainer");

for (var i = 0; i < teamImages.length; i++) {
  var memberHtml = `
      <div class="col-md-4 my-3">
        <div class="team-wrapper text-center">
          <img src="${teamImages[i]}" class="circle-120 rounded-circle mb-3 shadow" alt="${teamNames[i]}" />
          <h5 class="my-3">${teamNames[i]}</h5>
          <p>${teamDescriptions[i]}</p>
        </div>
      </div>
    `;
  teamMembersContainer.innerHTML += memberHtml;
}
