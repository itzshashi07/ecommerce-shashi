
async function fetchData(url, options = {}) {
  try {
      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      return await response.json();
  } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Re-throw the error to propagate it
  }
}

const buyFromUsUrl = "data/buyfromus.json";
const buyFromUsSection = document.getElementById("buyfromussection");

const buyFromUs = (term) => {
  fetchData(buyFromUsUrl).then((data) => {
    let buyFromUsCards = `<div id="category-products-${term}" class="category-products owl-carousel owl-theme blog-cards ">`;

    data[term].forEach((card) => {
      buyFromUsCards += `<div class="category-product top_categories fashion" data-fashion="fashion">
         <img src="${card.img}" alt="">
        <p>${card.name}</p>
  
      </div>`;
    });
    buyFromUsSection.innerHTML = buyFromUsCards;

    // category products

    var owl = $("#category-products-" + term);
    owl.owlCarousel({
      items: 5,
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 2,
          nav: false,
        },
        500: {
          items: 3,
        },
        767: {
          items: 3,
          nav: false,
          // loop:true,
        },

        1000: {
          items: 5,
          nav: true,
          loop: true,
        },
      },
      // dots:true,
    });
    $(".play").on("click", function () {
      owl.trigger("play.owl.autoplay", [1000]);
    });
    $(".stop").on("click", function () {
      owl.trigger("stop.owl.autoplay");
    });
  });
};

buyFromUs("top_categories");
const btns = document.querySelectorAll("#category-btns *");

const resetActive = (btns) => {
  btns.forEach((btn) => {
    if (btn.classList.contains("active-btn")) {
      btn.classList.remove("active-btn");
    }
  });
};

const makeActiveBtn = (currentActive) => {
  currentActive.classList.add("active-btn");
  currentActive.firstChild.classList.add("active-btn");
};

const handleClick = (id) => {
  buyFromUs(id);
  let currentActive = document.getElementById(id);
  resetActive(btns);
  makeActiveBtn(currentActive);
};

//End section //

// Featured product section*****/////////////
// Products Data
const apiUrl = "data/products.json";


const feturedProducts = document.getElementById("featured-products1");
const addToCart = (productid, quantityid, category) => {
  const quantity = document.getElementById(quantityid).value;
  const currentProduct = productid;
  const categoryId = category;
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // console.log(length.cartItems);
  let a = cartItems.find(({ productId }) => productId == currentProduct);
  if (a == "") {
    cartItems.push({
      productId: currentProduct,
      category: categoryId,
      quantity: quantity,
    });
  }
};

const productsCardData = (term) => {
  fetchData(apiUrl)
    .then((data) => {
      let productsCard = `<div id="featured-products-${term}" class="featured-products owl-carousel owl-theme">`;

      data[term].forEach((product) => {
        // console.log(product);

        productsCard += `<div class="products-card" id="${product.id}">
      <div class="left">custom labels</div>
      <div class="right">
        <p class="right-1">-70%</p>
        <p class="right-2">hot</p>
      </div>
      
      <a href="product-page.html?productCategory=${product.productCategory}&productid=${product.id}"> <img src="${product.image}" alt=""></>
      <div class="box-product d-flex justify-content-between">
        <a href="#">Ericson</a>
        <p>Model 519</p>
      </div>
      <div class="price ">
        <h3>${product.title}</h3>
        <p>$999 <del>$3,299.00</del></p>
      </div>
        <div class="cart-product d-flex justify-content-between">
          <div class="add-to-cart-btn">
            <input id="quantity${product.id}" type="number" name="number"
          min = "1" max="10" step="1" value="1">
          
            <button id="${term + product.id}" onclick="addToCart('${product.id
          }', 'quantity${product.id}', '${term}')">Add to cart</button>
          </div>
          <div class="product-icon">
            <a onclick="addToWishlist('${product.id
          }','${term}')"><i id="wishlist${product.id
          }" class="fa-regular fa-heart"></i></a>
            <i class="fa-solid fa-arrow-down-up-across-line fa-rotate-90"></i>
          </div>
      </div>
      <div class="bottom-card d-flex justify-content-between align-items-center">
        <p onclick="buyNow('${product.id}', 'quantity${product.id}', '${term}')"><span class="color-green"><i class="fa-solid fa-sack-dollar"></i></span> Buy Now</p>
        <p><i class="fa-solid fa-circle-question color-red"></i>Question</p>
      </div>
    </div>`;
      });

      feturedProducts.innerHTML = productsCard;

      var owl = $("#featured-products-" + term);
      owl.owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          620: {
            items: 2,
            nav: false,
            loop: true,
          },
          767: {
            items: 2,
            nav: false,
            loop: true,
          },
          800: {
            items: 3,
          },
          1000: {
            items: 3,
            nav: true,
            loop: true,
          },
          1200: {
            items: 4,
            nav: true,
            loop: true,
          },
        },
        // dots:false,
      });
      $(".play").on("click", function () {
        owl.trigger("play.owl.autoplay", [1000]);
      });
      $(".stop").on("click", function () {
        owl.trigger("stop.owl.autoplay");
      });
    })
    .catch((error) => {
      console.log("Error comes oho!",error.name);
    });
};
productsCardData("featured");
const featuredProductsBtns = document.querySelectorAll(
  "#featured-products-btns *"
);




