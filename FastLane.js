document.addEventListener("DOMContentLoaded", function () {
  // Obtener los elementos del DOM
  const loader = document.getElementById("loader"); // El loader
  const content = document.querySelector(".content"); // El contenido de la página
  const cartButton = document.getElementById("cart-button");
  const closeCartButton = document.querySelector(".close-cart");
  const cartContainer = document.querySelector(".cart-container");
  const currencySelector = document.getElementById("currency-selector");
  const currencyList = document.querySelector(".language-list");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const clearFilterButton = document.getElementById("clear-filter-button"); // Nuevo botón para quitar el filtro
  const cardContainers = {
    ofertas: document.querySelector(".card-container.ofertas"),
    juegos: document.querySelector(".card-container.juegos"),
  };
  const emptyCartButton = document.getElementById("empty-cart-button");
  const buyButton = document.getElementById("buy-button");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalPrice = document.querySelector(".cart-total-price");

  // Variables para almacenar el carrito y los juegos filtrados
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Recuperamos los productos guardados en el carrito
  let allGames = [
    {
      title: "Juego1",
      image: "./Imagenes/juego1.jpg",
      price: "$59.99",
      platform: "PlayStation",
    },
    {
      title: "Juego2",
      image: "./Imagenes/juego2.jpg",
      price: "$59.99",
      platform: "PC",
    },
    {
      title: "Juego3",
      image: "./Imagenes/juego-3.jpg",
      price: "$59.99",
      platform: "PC",
    },
    {
      title: "Juego4",
      image: "./Imagenes/juego4.jpg",
      price: "$59.99",
      platform: "PlayStation",
    },
    {
      title: "Juego5",
      image: "./Imagenes/juego-5.jpg",
      price: "$59.99",
      platform: "Nintendo",
    },
    {
      title: "Juego6",
      image: "./Imagenes/juego-6.jpg",
      price: "$59.99",
      platform: "Nintendo",
    },
    {
      title: "Juego7",
      image: "./Imagenes/juego-7.jpg",
      price: "$59.99",
      platform: "Nintendo",
    },
    {
      title: "Juego8",
      image: "./Imagenes/juego-8.jpg",
      price: "$59.99",
      platform: "Xbox",
    },
    {
      title: "Juego9",
      image: "./Imagenes/juego-2.jpg",
      price: "$59.99",
      platform: "PlayStation",
    },
    {
      title: "Juego10",
      image: "./Imagenes/juego-10.jpg",
      price: "$59.99",
      platform: "PlayStation",
    },
    {
      title: "Juego11",
      image: "./Imagenes/juego-11.jpg",
      price: "$59.99",
      platform: "PlayStation",
    },
    {
      title: "Juego12",
      image: "./Imagenes/juego-12.jpg",
      price: "$59.99",
      platform: "Xbox",
    },
  ];

  // Array para las ofertas
  let allOffers = [
    {
      title: "Oferta1",
      image: "./Imagenes/Oferta1.jpg",
      originalPrice: "$69.99",
      offerPrice: "$29.99",
      platform: "PlayStation",
    },
    {
      title: "Oferta2",
      image: "./Imagenes/Oferta2.jpg",
      originalPrice: "$39.99",
      offerPrice: "$19.99",
      platform: "PC",
    },
    {
      title: "Oferta3",
      image: "./Imagenes/Oferta3.jpg",
      originalPrice: "$59.99",
      offerPrice: "$39.99",
      platform: "Xbox",
    },
    {
      title: "Oferta5",
      image: "./Imagenes/Oferta5.jpg",
      originalPrice: "$69.99",
      offerPrice: "$49.99",
      platform: "Nintendo",
    },
  ];

  // Función para mostrar u ocultar el carrito
  function toggleCart() {
    cartContainer.style.display =
      cartContainer.style.display === "none" ? "block" : "none";
  }

  // Agregar un juego al carrito
  function addToCart(game) {
    cartItems.push(game);
    updateCart();
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Guardar en localStorage
  }

  // Actualizar el carrito
  function updateCart() {
    cartItemsContainer.innerHTML = ""; // Limpiar carrito actual

    cartItems.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}" />
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">${item.price}</div>
        </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
    });

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price.replace("$", "")),
      0
    );
    cartTotalPrice.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Vaciar el carrito
  function emptyCart() {
    cartItems = [];
    updateCart();
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Guardar el carrito vacío
  }

  // Comprar los productos (función de prueba)
  function buyCart() {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert("¡Compra realizada con éxito!");
    cartItems = [];
    updateCart();
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Guardar el carrito vacío después de la compra
  }

  // Filtrar juegos por plataforma
  function filterGames(platform) {
    const allGameCards = document.querySelectorAll(".game-card-pixel.juegos");
    allGameCards.forEach((gameCard) => {
      const gamePlatform = gameCard.getAttribute("data-platform");
      if (gamePlatform === platform || platform === "Todos") {
        gameCard.style.display = "block";
      } else {
        gameCard.style.display = "none";
      }
    });
  }

  // Quitar filtro
  function clearFilter() {
    const allGameCards = document.querySelectorAll(".game-card-pixel.juegos");
    allGameCards.forEach((gameCard) => {
      gameCard.style.display = "block"; // Mostrar todas las cards
    });
  }

  // Cambiar la moneda
  function changeCurrency(currency) {
    currencySelector.innerHTML = `Seleccionado: ${currency}`;
    currencyList.classList.remove("active");
  }

  // Manejar los eventos
  cartButton.addEventListener("click", toggleCart);
  closeCartButton.addEventListener("click", toggleCart);
  emptyCartButton.addEventListener("click", emptyCart);
  buyButton.addEventListener("click", buyCart);

  // Manejar el dropdown de monedas
  currencySelector.addEventListener("click", () => {
    currencyList.classList.toggle("active");
  });

  document.querySelectorAll(".language-list button").forEach((button) => {
    button.addEventListener("click", () => {
      changeCurrency(button.innerHTML);
    });
  });

  // Manejar los filtros de plataforma
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const platform = button.innerHTML;
      filterGames(platform);
    });
  });

  // Agregar el evento para el botón de quitar filtro
  clearFilterButton.addEventListener("click", clearFilter);

  // Mostrar el loader mientras se cargan los datos
  function showLoader() {
    loader.style.display = "block"; // Mostrar el loader
    content.style.display = "none"; // Ocultar el contenido
  }

  // Ocultar el loader y mostrar el contenido
  function hideLoader() {
    loader.style.display = "none"; // Ocultar el loader
    content.style.display = "block"; // Mostrar el contenido
  }

  // Renderizar las cards de juegos
  function renderGameCards() {
    cardContainers.juegos.innerHTML = ""; // Limpiar el contenedor de juegos

    allGames.forEach((game) => {
      const gameCard = document.createElement("div");
      gameCard.classList.add("game-card-pixel", "juegos");
      gameCard.setAttribute("data-platform", game.platform); // Establecer la plataforma como atributo de la card

      gameCard.innerHTML = `
        <div class="card-image">
          <img src="${game.image}" alt="${game.title}" />
        </div>
        <div class="card-description">
          <h3 contenteditable="true">${game.title}</h3>
          <p contenteditable="true">${game.price}</p>
          <p contenteditable="true" class="platform">${game.platform}</p>
          <button class="add-to-cart">Añadir al Carrito</button>
        </div>
      `;

      // Añadir el evento para agregar el juego al carrito
      gameCard.querySelector(".add-to-cart").addEventListener("click", () => {
        addToCart(game);
      });

      cardContainers.juegos.appendChild(gameCard);
    });
  }

  // Renderizar las cards de ofertas
  function renderOfferCards() {
    cardContainers.ofertas.innerHTML = ""; // Limpiar el contenedor de ofertas

    allOffers.forEach((offer) => {
      const offerCard = document.createElement("div");
      offerCard.classList.add("game-card-pixel", "ofertas");
      offerCard.setAttribute("data-platform", offer.platform);

      offerCard.innerHTML = `
        <div class="card-image">
          <img src="${offer.image}" alt="${offer.title}" />
        </div>
        <div class="card-description">
          <h3 contenteditable="true">${offer.title}</h3>
          <p class="original-price" contenteditable="true"><del>${offer.originalPrice}</del></p>
          <p class="offer-price" contenteditable="true">${offer.offerPrice}</p>
          <p contenteditable="true" class="platform">${offer.platform}</p>
          <button class="add-to-cart">Añadir al Carrito</button>
        </div>
      `;

      // Añadir el evento para agregar la oferta al carrito
      offerCard.querySelector(".add-to-cart").addEventListener("click", () => {
        addToCart(offer);
      });

      cardContainers.ofertas.appendChild(offerCard);
    });
  }

  // Inicializar la renderización de las cards
  showLoader(); // Mostrar el loader al cargar los datos
  renderGameCards();
  renderOfferCards();

  // Después de renderizar los juegos y ofertas, ocultar el loader
  setTimeout(hideLoader, 500); // Simulando un pequeño retraso para ver el loader
});
