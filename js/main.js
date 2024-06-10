
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
  if (!a == "") {
    alert("Item is already added to cart");
  } else {
    cartItems.push({
      productId: currentProduct,
      category: categoryId,
      quantity: quantity,
    });

    let set = localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Product Added to cart");
    location.reload();
  }
};
const addToWishlist = (productid, category) => {
  const currentProduct = productid;
  const categoryId = category;
  const wish = document.getElementById("wishlist" + productid);
  wish.classList.replace("fa-regular", "fa-solid");
  wish.style = "color:red";
  let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
  // console.log(length.cartItems);
  let a = wishlistItems.find(({ productId }) => productId == currentProduct);
  if (!a == "") {
    alert("Item is already added to wishlist");
  } else {
    wishlistItems.push({
      productId: currentProduct,
      category: categoryId,
    });

    let set = localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems)
    );
    alert("Product Added to wishlist");
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

const handleClick1 = (id) => {
  productsCardData(id);
  let currentActive = document.getElementById(id);
  resetActive(featuredProductsBtns);
  makeActiveBtn(currentActive);
};






    var owl = $("#blog-cards-" + term);
    owl.owlCarousel({
      items: 3,
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
          loop: true,
        },
        550: {
          items: 2,
          loop: true,
        },
        767: {
          items: 2,
          nav: false,
          loop: true,
        },
        1000: {
          items: 3,
          nav: true,
          loop: true,
        },
        1200: {
          items: 3,
          nav: true,
          loop: false,
        },
      },
    });
    $(".play").on("click", function () {
      owl.trigger("play.owl.autoplay", [1000]);
    });
    $(".stop").on("click", function () {
      owl.trigger("stop.owl.autoplay");
    });
  
// ENd blog ******************************************************************************
// Testimonial section ***//

// const testimonialUrl = "data/testimonials.json";
// const testimonialsSection = document.getElementById("testimonials-section");

// const testimonialCards = () => {
//   fetchData(testimonialUrl).then((data) => {
//     let testimonialsCards =
//       '<div id="testimonials-cards" class="owl-carousel owl-theme blog-cards " style="margin-top: 40px; margin-bottom: 20px;">';
//     const Testimonials = data["testimonials"];
//     Testimonials.forEach((testimonial) => {
//       let Review = limit(testimonial.review, 200);
//       testimonialsCards += `<div class="test-card">
//     <p class="quote-s"><i class="fa-solid fa-quote-left"></i></p>
//     <p>${Review}</p>
//     <p class="name"> - ${testimonial.name}</p>

//   </div>`;
//     });
//     testimonialsSection.innerHTML = testimonialsCards;
//     // for testimonials slider
//     var owl = $("#testimonials-cards");
//     owl.owlCarousel({
//       items: 3,
//       loop: true,
//       margin: 10,
//       autoplay: true,
//       autoplayTimeout: 2000,
//       autoplayHoverPause: true,
//       responsiveClass: true,

//       responsive: {
//         0: {
//           items: 1,
//           nav: false,
//         },
//         430: {
//           items: 2,
//         },
//         767: {
//           items: 2,
//           nav: false,
//           loop: true,
//         },
//         1000: {
//           items: 3,
//           nav: false,
//           loop: false,
//         },
//         1200: {
//           items: 3,
//           nav: false,
//           loop: false,
//         },
//       },
//     });
//     $(".play").on("click", function () {
//       owl.trigger("play.owl.autoplay", [1000]);
//     });
//     $(".stop").on("click", function () {
//       owl.trigger("stop.owl.autoplay");
//     });
//   });
// };
// testimonialCards();

//End Testimonials //******************************************** */
// const removeCartItems = (quantity1, category, productid) => {
//   const quantity = quantity1;
//   const currentProduct = productid;
//   const categoryId = category;
//   // console.log(currentProduct)
//   let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//   cartItems.filter((item) => {
//     if (item.productId.includes(currentProduct)) {
//       cartItems.splice(cartItems.indexOf(item), 1);
//     }
//   });
//   let set = localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   alert("Product removed to cart");
//   location.reload();
// };

const shoppingCart = () => {
  let cartProducts = JSON.parse(localStorage.getItem("cartItems")) || [];
  // console.log(cartProducts);
  let cartdata = "";

  cartProducts.forEach((item) => {
    let category = item.category;
    let id = item.productId;
    let quantity = item.quantity;
    fetchData(apiUrl).then((data) => {
      let cartproducts = data[category];
      cartproducts.filter((data) => {
        if (data.id == id) {
          let totalprice = data.price * quantity;
          cartdata += `<div class="cart-item">
            <div class="cart-up1" >
                
                <div class="cart-body" style="padding-left: 10px;">
                    <img src="${data.image}" alt="">
                </div>
            </div>
            <div class="cart-up1" style="width: 200px;">
               
                <div class="cart-body">
                    <a href="">${data.title}</a>
                    
                </div>
            </div>
            <div class="cart-up1">
                
                <div class="cart-body">
                    <p>Model 206</p>
                </div>
            </div>
            <div class="cart-up1">
               
                <div class="cart-body d-flex">
                    <input type="number" min="1" step="1" max="10" value="${quantity}" disabled>
                   
                    <button class="remove-btn" title="remove" onclick="removeCartItems('${quantity}','${category}','${id}')">Remove <i class="fa-solid fa-close"></i></button>
                </div>
            </div>
            <div class="cart-up1">
                
                <div class="cart-body">
                    <p>$${data.price}.00</p>
                </div>
            </div>
            <div class="cart-up1">
                <div class="cart-body">
                    <p>$ ${totalprice}.00</p>
                </div>
            </div>
            
        </div>`;
        }
      });
      document.getElementById("item-cart-dynamic").innerHTML = cartdata;
    });
  });
};

shoppingCart();
// New in Fashion section*************************//

const newFahionProducts = (term) => {
  fetchData(apiUrl)
    .then((data) => {
      let fullarr = data['featured'].concat(data['latest']).concat(data['bestsellers']).concat(data['specials']);
      let productsCard = `<div id="new-fashion-${term}" class="right-cards owl-carousel owl-theme">`;
      // console.log(productsCard)
      let itemdata = fullarr.filter((item) => {
        if (item.category == term) {
          return true;
        }
        else {
          return false
        }
      })
      itemdata.forEach((product) => {
        // console.log(product)
        productsCard += `<div class="right-card">
        <div class="left">2-3 days</div>
        <div class="right">
          <p class="right-1">New</p>
          <p class="right-2">hot</p>
        </div>
        <a href="product-page.html?productCategory=${product.productCategory}&productid=${product.id}"><img src="${product.image}" alt=""></a>
        <a href="">${product.title}</a>
        <p style="padding-left: 10px; font-size: 14px;">$399.00</p>
        <hr/>
        <div class="cart-product d-flex justify-content-between">
          <div class="category-cart-btn">
          <input id="quantity${product.id}" type="number" name="number"
          min = "1" max="10" step="1" value="1" hidden>
          
            <button id="${product.id}" onclick="addToCart('${product.id
          }', 'quantity${product.id}', '${product.productCategory}')">Add to cart</button>
          </div>
          <div class="product-icon margin-top-10px">
          <a onclick="addToWishlist('${product.id
          }','${product.productCategory}')"><i id="wishlist${product.id
          }" class="fa-regular fa-heart"></i></a>
            <i class="fa-solid fa-arrow-down-up-across-line fa-rotate-90"></i>
          </div>
      </div>

      </div>`;
      });

      document.getElementById('new-in-fashion').innerHTML = productsCard;

      var owl = $("#new-fashion-" + term);
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
            loop: false,
          },
          767: {
            items: 2,
            nav: false,
            loop: false,
          },
          800: {
            items: 3,
          },
          1000: {
            items: 3,
            nav: true,
            loop: false,
          },
          1200: {
            items: 4,
            nav: true,
            loop: false,
          },
        },
        dots: false,
      });
      $(".play").on("click", function () {
        owl.trigger("play.owl.autoplay", [1000]);
      });
      $(".stop").on("click", function () {
        owl.trigger("stop.owl.autoplay");
      });
    })
    .catch((error) => {
      console.log("error" ,error.name + error.message);
    });
};
newFahionProducts('fashion');

// //checkout now 
// const checkoutNow = () => {
//   if(checkLoggedIn()){
//     const cartItems = JSON.parse(localStorage.getItem('cartItems'));
//   const orderedItems = JSON.parse(localStorage.getItem('orderedItems')) || [];
//   let category = '';
//   let id = '';
//   let quantity = '';
//   let totalprice = '';
//   let cartProducts = ''
//   let orderDate = Date('dd-mm-yyyy');
//   let filtered='';
//   let fp = [];
//   let add=0;
//   fetchData(apiUrl).then(data => {
//     cartProducts = data['featured'].concat(data['latest']).concat(data['bestsellers']).concat(data['specials']);
//     // console.log(cartProducts)
//     cartItems.forEach((item) => {
//       category = item.category;
//       id = item.productId;
//       quantity = item.quantity;
//       // console.log(id)
//       filtered= cartProducts.filter((data) => {
//         if (data.id == id && data.productCategory == category) {
//           totalprice = Number(data.price * quantity);
//           orderedItems.push({
//             totalprice: totalprice,
//             productid: id,
//             category: category,
//             quantity: quantity,
//             orderDate: orderDate,
            
//           });
//           add+=totalprice;
          
//           localStorage.setItem('orderedItems',JSON.stringify(orderedItems));
//           localStorage.removeItem('cartItems');
//           // console.log(orderedItems)
  
//         }
//       });
      
//     })
    
//     alert('Your Order Placed SuccesFully YYour total Amount is '+add);
//     location.reload();
//   })

//   }else{
//     alert("Please Login To Proceed")
//   }
  
// }

// const buyNow = (id, quantity, category) => {
//   addToCart(id, quantity, category)
//   window.location.href='shopping-cart.html'
// }




