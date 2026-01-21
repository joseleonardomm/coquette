// Datos iniciales de la tienda
let storeData = {
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%23C5A451'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='14' font-weight='bold' fill='%23000' text-anchor='middle' dy='.3em'%3ECOQUETTE SPORT%3C/text%3E%3C/svg%3E",
    whatsapp: "+1234567890",
    location: "Av. Principal 123, Ciudad",
    description: "Tienda de ropa deportiva de alta calidad.",
    about: "Somos una tienda especializada en ropa deportiva de alta calidad, comprometidos con tu rendimiento y comodidad. Ofrecemos productos diseñados para atletas profesionales y entusiastas del fitness."
};

// Datos iniciales de categorías
let categories = [
    { id: 1, name: "Ropa Deportiva", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Zapatillas", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Accesorios", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Equipamiento", image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
];

// Datos iniciales de productos
let products = [
    { 
        id: 1, 
        name: "Camiseta Deportiva Elite", 
        category: "Ropa Deportiva", 
        price: 29.99, 
        originalPrice: 39.99,
        description: "Camiseta de alta calidad para entrenamientos intensos. Material transpirable y ligero.",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ]
    },
    { 
        id: 2, 
        name: "Zapatillas Running Pro", 
        category: "Zapatillas", 
        price: 89.99, 
        originalPrice: 99.99,
        description: "Zapatillas diseñadas para corredores de alto rendimiento. Amortiguación superior y máxima comodidad.",
        images: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ]
    },
    { 
        id: 3, 
        name: "Short Deportivo Premium", 
        category: "Ropa Deportiva", 
        price: 24.99, 
        originalPrice: 34.99,
        description: "Short ligero y cómodo para cualquier actividad deportiva. Secado rápido y tejido elástico.",
        images: [
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ]
    },
    { 
        id: 4, 
        name: "Mochila Deportiva", 
        category: "Accesorios", 
        price: 45.99, 
        originalPrice: 59.99,
        description: "Mochila espaciosa con compartimentos especializados para equipo deportivo. Impermeable y resistente.",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ]
    },
    { 
        id: 5, 
        name: "Pesas Ajustables", 
        category: "Equipamiento", 
        price: 79.99, 
        originalPrice: 99.99,
        description: "Set de pesas ajustables para entrenamiento en casa. Rango de 2.5kg a 20kg por pesa.",
        images: [
            "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ]
    },
    { 
        id: 6, 
        name: "Gorra Deportiva", 
        category: "Accesorios", 
        price: 19.99, 
        originalPrice: 24.99,
        description: "Gorra ligera y transpirable para protegerte del sol durante tus actividades deportivas.",
        images: [
            "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1514327602138-bc0c2a5e34c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ]
    }
];

// Carrito de compras
let cart = [];

// Sliders de hero
let heroSlides = [
    { 
        id: 1,
        title: "Ropa Deportiva de Alta Calidad", 
        description: "Equípate con lo mejor para tus entrenamientos",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
        id: 2,
        title: "Nueva Colección Verano 2023", 
        description: "Descubre las últimas tendencias en ropa deportiva",
        image: "https://images.unsplash.com/photo-1578763363227-a6c00da1c8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
    }
];

// DOM Elements
let sidebar, overlay, menuToggle, closeSidebar, cartSidebar, cartBtn, closeCart;
let cartItems, cartTotal, cartCount, checkoutBtn, productModal, closeProductModal;
let searchInput, searchButton;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado, inicializando aplicación...");
    
    // Inicializar referencias a elementos del DOM
    initializeDOMElements();
    
    // Configurar acceso invisible al admin
    setupAdminAccess();
    
    // Cargar datos del localStorage si existen
    loadFromLocalStorage();
    
    // Renderizar datos iniciales
    renderStoreData();
    renderCategories();
    renderProducts();
    renderHeroSlides();
    
    // Inicializar eventos
    initEvents();
    
    // Actualizar carrito
    updateCart();
    
    console.log("Aplicación inicializada correctamente");
});

// Configurar acceso invisible al admin
function setupAdminAccess() {
    console.log("Configurando acceso al admin...");
    let typedSequence = '';
    const password = 'abuelamia';
    
    // Solo activar en la página principal (no en admin)
    if (window.location.pathname.includes('admin.html')) {
        console.log("Estás en admin, no se activa el acceso");
        return;
    }
    
    document.addEventListener('keydown', function(e) {
        // Evitar que funcione cuando se está escribiendo en campos de texto
        const activeElement = document.activeElement;
        const isInput = activeElement.tagName === 'INPUT' || 
                       activeElement.tagName === 'TEXTAREA' || 
                       activeElement.isContentEditable;
        
        if (isInput) return;
        
        // Agregar tecla al sequence (solo letras)
        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
            typedSequence += e.key.toLowerCase();
            
            // Mantener solo el largo de la contraseña
            if (typedSequence.length > password.length) {
                typedSequence = typedSequence.substring(1);
            }
            
            console.log("Secuencia actual:", typedSequence);
            
            // Verificar si coincide
            if (typedSequence === password) {
                console.log("¡Contraseña correcta! Redirigiendo al admin...");
                // Redireccionar al admin
                window.location.href = 'admin.html';
                typedSequence = ''; // Resetear
            }
        }
    });
}

// Inicializar referencias a elementos del DOM
function initializeDOMElements() {
    console.log("Inicializando elementos DOM...");
    
    sidebar = document.getElementById('sidebar');
    overlay = document.getElementById('overlay');
    menuToggle = document.getElementById('menu-toggle');
    closeSidebar = document.getElementById('close-sidebar');
    cartSidebar = document.getElementById('cart-sidebar');
    cartBtn = document.getElementById('cart-btn');
    closeCart = document.getElementById('close-cart');
    cartItems = document.getElementById('cart-items');
    cartTotal = document.getElementById('cart-total');
    cartCount = document.getElementById('cart-count');
    checkoutBtn = document.getElementById('checkout-btn');
    productModal = document.getElementById('product-modal');
    closeProductModal = document.getElementById('close-product-modal');
    searchInput = document.getElementById('search-input');
    searchButton = document.getElementById('search-button');
    
    console.log("Elementos DOM inicializados:", {
        sidebar: !!sidebar,
        cartSidebar: !!cartSidebar,
        productModal: !!productModal
    });
}

// Cargar datos del localStorage
function loadFromLocalStorage() {
    try {
        const savedStoreData = localStorage.getItem('coquetteSportStoreData');
        const savedCategories = localStorage.getItem('coquetteSportCategories');
        const savedProducts = localStorage.getItem('coquetteSportProducts');
        const savedHeroSlides = localStorage.getItem('coquetteSportHeroSlides');
        const savedCart = localStorage.getItem('coquetteSportCart');
        
        if (savedStoreData) {
            storeData = JSON.parse(savedStoreData);
            console.log("Datos de tienda cargados desde localStorage");
        }
        if (savedCategories) {
            categories = JSON.parse(savedCategories);
            console.log("Categorías cargadas desde localStorage:", categories.length);
        }
        if (savedProducts) {
            products = JSON.parse(savedProducts);
            console.log("Productos cargados desde localStorage:", products.length);
        }
        if (savedHeroSlides) {
            heroSlides = JSON.parse(savedHeroSlides);
            console.log("Slides cargados desde localStorage:", heroSlides.length);
        }
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log("Carrito cargado desde localStorage:", cart.length);
        }
    } catch (error) {
        console.log("No hay datos guardados o error al cargar:", error);
    }
}

// Guardar datos en localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('coquetteSportStoreData', JSON.stringify(storeData));
        localStorage.setItem('coquetteSportCategories', JSON.stringify(categories));
        localStorage.setItem('coquetteSportProducts', JSON.stringify(products));
        localStorage.setItem('coquetteSportHeroSlides', JSON.stringify(heroSlides));
        localStorage.setItem('coquetteSportCart', JSON.stringify(cart));
    } catch (error) {
        console.error("Error guardando datos en localStorage:", error);
    }
}

// Renderizar datos de la tienda
function renderStoreData() {
    console.log("Renderizando datos de la tienda...");
    
    const logoElement = document.getElementById('store-logo');
    const headerLogo = document.getElementById('header-logo');
    const footerLogo = document.getElementById('footer-logo');
    
    if (logoElement) logoElement.src = storeData.logo;
    if (headerLogo) headerLogo.src = storeData.logo;
    if (footerLogo) footerLogo.src = storeData.logo;
    
    // Actualizar información de contacto
    updateElementText('store-location', storeData.location);
    updateElementText('store-phone', storeData.whatsapp);
    updateElementText('store-description', storeData.description);
    updateElementText('store-about', storeData.about);
    updateElementText('store-address', storeData.location);
    updateElementText('store-contact', storeData.whatsapp);
    updateElementText('footer-location', storeData.location);
    updateElementText('footer-phone', storeData.whatsapp);
    updateElementText('footer-description', storeData.description);
}

// Helper para actualizar texto de elementos
function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

// Renderizar categorías
function renderCategories() {
    console.log("Renderizando categorías...");
    
    const categoriesList = document.getElementById('categories-list');
    const categoriesGrid = document.getElementById('categories-grid');
    
    if (!categoriesList || !categoriesGrid) return;
    
    // Limpiar listas
    categoriesList.innerHTML = '<li><a href="#" data-category="all">Todos los productos</a></li>';
    categoriesGrid.innerHTML = '';
    
    // Agregar filtro "Todos"
    const filterContainer = document.querySelector('.products-filter');
    if (filterContainer) {
        filterContainer.innerHTML = '<button class="filter-btn active" data-filter="all">Todos</button>';
    }
    
    // Renderizar cada categoría
    categories.forEach(category => {
        // Agregar a la lista de sidebar
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#" data-category="${category.id}">${category.name}</a>`;
        categoriesList.appendChild(listItem);
        
        // Agregar a la cuadrícula de categorías
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.setAttribute('data-category', category.id);
        categoryCard.innerHTML = `
            <div class="category-image">
                <img src="${category.image}" alt="${category.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22300%22%3E%3Crect width=%22600%22 height=%22300%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22300%22 y=%22150%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3E${category.name}%3C/text%3E%3C/svg%3E'">
            </div>
            <h3>${category.name}</h3>
        `;
        categoriesGrid.appendChild(categoryCard);
        
        // Agregar filtro de categoría
        if (filterContainer) {
            const filterBtn = document.createElement('button');
            filterBtn.className = 'filter-btn';
            filterBtn.setAttribute('data-filter', category.id);
            filterBtn.textContent = category.name;
            filterContainer.appendChild(filterBtn);
        }
    });
    
    console.log("Categorías renderizadas:", categories.length);
}

// Renderizar productos
function renderProducts(filter = 'all') {
    console.log("Renderizando productos, filtro:", filter);
    
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    let filteredProducts = products;
    
    if (filter !== 'all') {
        const category = categories.find(c => c.id == filter);
        if (category) {
            filteredProducts = products.filter(product => product.category === category.name);
        }
    }
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros términos de búsqueda</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-id', product.id);
        
        // Verificar si el producto está en el carrito
        const inCart = cart.some(item => item.id === product.id);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect width=%22600%22 height=%22600%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22300%22 y=%22300%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
                <div class="product-overlay">
                    <button class="view-product" data-id="${product.id}">Ver Detalles</button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart" data-id="${product.id}" ${inCart ? 'disabled' : ''}>
                    ${inCart ? 'En el carrito' : 'Agregar al carrito'}
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    console.log("Productos renderizados:", filteredProducts.length);
}

// Filtrar productos por categoría
function filterProducts(category) {
    console.log("Filtrando productos por categoría:", category);
    renderProducts(category);
    
    // Desplazarse a la sección de productos
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Renderizar slides del hero
function renderHeroSlides() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;
    
    heroSlider.innerHTML = '';
    
    if (heroSlides.length === 0) {
        heroSlider.innerHTML = `
            <div class="hero-slide active" style="background: linear-gradient(135deg, #000 0%, #333 100%);">
                <div class="hero-content">
                    <h1>Coquette Sport</h1>
                    <p>Tu tienda de ropa deportiva de confianza</p>
                    <a href="#products" class="hero-btn">Ver Colección</a>
                </div>
            </div>
        `;
        return;
    }
    
    heroSlides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slideElement.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${slide.image}')`;
        slideElement.style.backgroundSize = 'cover';
        slideElement.style.backgroundPosition = 'center';
        slideElement.innerHTML = `
            <div class="hero-content">
                <h1>${slide.title}</h1>
                <p>${slide.description}</p>
                <a href="#products" class="hero-btn">Ver Colección</a>
            </div>
        `;
        heroSlider.appendChild(slideElement);
    });
}

// Abrir modal de producto
function openProductModal(productId) {
    console.log("Abriendo modal para producto ID:", productId);
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error("Producto no encontrado:", productId);
        return;
    }
    
    // Actualizar contenido del modal
    updateElementText('modal-product-name', product.name);
    updateElementText('modal-product-price', `$${product.price.toFixed(2)}`);
    
    const originalPriceElement = document.getElementById('modal-original-price');
    if (originalPriceElement) {
        if (product.originalPrice) {
            originalPriceElement.textContent = `$${product.originalPrice.toFixed(2)}`;
            originalPriceElement.style.display = 'inline';
        } else {
            originalPriceElement.style.display = 'none';
        }
    }
    
    updateElementText('modal-product-description', product.description);
    updateElementText('modal-product-category', product.category);
    
    // Actualizar imágenes
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.innerHTML = `<img src="${product.images[0]}" alt="${product.name}">`;
    }
    
    const thumbnails = document.getElementById('modal-thumbnails');
    if (thumbnails) {
        thumbnails.innerHTML = '';
        
        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="${product.name}">`;
            thumbnail.addEventListener('click', () => {
                // Cambiar imagen principal
                const mainImg = mainImage.querySelector('img');
                if (mainImg) mainImg.src = image;
                
                // Actualizar miniaturas activas
                document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
            });
            thumbnails.appendChild(thumbnail);
        });
    }
    
    // Configurar cantidad
    const quantityInput = document.getElementById('modal-quantity');
    if (quantityInput) quantityInput.value = 1;
    
    // Configurar botón de agregar al carrito
    const addToCartBtn = document.getElementById('modal-add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.setAttribute('data-id', product.id);
    }
    
    // Mostrar modal
    if (productModal) {
        productModal.style.display = 'flex';
        console.log("Modal mostrado");
    }
}

// Agregar producto al carrito
function addToCart(productId, quantity = 1) {
    console.log("Agregando al carrito producto ID:", productId, "cantidad:", quantity);
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error("Producto no encontrado:", productId);
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
    }
    
    updateCart();
    saveToLocalStorage();
    
    // Mostrar notificación
    showNotification(`"${product.name}" agregado al carrito`);
}

// Actualizar carrito
function updateCart() {
    console.log("Actualizando carrito...");
    
    // Actualizar contador
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        console.log("Total items en carrito:", totalItems);
    }
    
    // Actualizar lista de productos
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="decrease-quantity" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-quantity" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Actualizar total
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
        console.log("Total carrito: $", total.toFixed(2));
    }
}

// Actualizar cantidad de producto en el carrito
function updateCartItemQuantity(productId, change) {
    console.log("Actualizando cantidad producto ID:", productId, "cambio:", change);
    
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
        saveToLocalStorage();
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    console.log("Eliminando del carrito producto ID:", productId);
    
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveToLocalStorage();
    
    // Actualizar botones de agregar al carrito
    const productButton = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (productButton) {
        productButton.textContent = 'Agregar al carrito';
        productButton.disabled = false;
    }
    
    showNotification('Producto eliminado del carrito');
}

// Completar pedido por WhatsApp
function completeOrder() {
    console.log("Completando pedido por WhatsApp...");
    
    if (cart.length === 0) {
        showNotification('El carrito está vacío');
        return;
    }
    
    const phone = storeData.whatsapp.replace(/\D/g, '');
    let message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: $${total.toFixed(2)}\n\n`;
    message += `Por favor, confirmen disponibilidad y forma de pago.`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // Vaciar carrito después de enviar
    cart = [];
    updateCart();
    saveToLocalStorage();
    
    // Cerrar carrito
    if (cartSidebar) cartSidebar.classList.remove('open');
    
    // Mostrar notificación
    showNotification('Pedido enviado por WhatsApp');
}

// Mostrar notificación
function showNotification(message) {
    console.log("Mostrando notificación:", message);
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }
    }, 3000);
}

// Inicializar eventos
function initEvents() {
    console.log("Inicializando eventos...");
    
    // Sidebar
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("Abriendo sidebar");
            if (sidebar) sidebar.classList.add('open');
            if (overlay) overlay.classList.add('active');
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("Cerrando sidebar");
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            console.log("Clic en overlay, cerrando todo");
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            if (cartSidebar) cartSidebar.classList.remove('open');
        });
    }
    
    // Carrito
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("Abriendo carrito");
            if (cartSidebar) cartSidebar.classList.add('open');
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("Cerrando carrito");
            if (cartSidebar) cartSidebar.classList.remove('open');
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            completeOrder();
        });
    }
    
    // Modal de producto
    if (closeProductModal) {
        closeProductModal.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("Cerrando modal de producto");
            if (productModal) productModal.style.display = 'none';
        });
    }
    
    // Cerrar modal al hacer clic fuera
    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                console.log("Clic fuera del modal, cerrando");
                productModal.style.display = 'none';
            }
        });
    }
    
    // Buscador
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.stopPropagation();
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Agregar al carrito desde el modal
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-id'));
            const quantityInput = document.getElementById('modal-quantity');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            
            console.log("Agregando al carrito desde modal:", productId, quantity);
            addToCart(productId, quantity);
            if (productModal) productModal.style.display = 'none';
            
            // Actualizar botón en la lista de productos
            const productButton = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
            if (productButton) {
                productButton.textContent = 'En el carrito';
                productButton.disabled = true;
            }
        });
    }
    
    // Botones de cantidad en el modal de producto
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (minusBtn) {
        minusBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const quantityInput = document.getElementById('modal-quantity');
            if (quantityInput && quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
    }
    
    if (plusBtn) {
        plusBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const quantityInput = document.getElementById('modal-quantity');
            if (quantityInput && quantityInput.value < 10) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        });
    }
    
    // Configurar delegación de eventos PARA ELEMENTOS DINÁMICOS
    setupEventDelegation();
    
    console.log("Eventos inicializados");
}

// Configurar delegación de eventos para elementos dinámicos
function setupEventDelegation() {
    console.log("Configurando delegación de eventos...");
    
    // Delegación de eventos para elementos dinámicos
    document.addEventListener('click', function(e) {
        console.log("Evento click detectado en:", e.target);
        
        // Categorías
        const categoryCard = e.target.closest('.category-card');
        if (categoryCard) {
            e.preventDefault();
            e.stopPropagation();
            const category = categoryCard.getAttribute('data-category');
            console.log("Clic en categoría:", category);
            filterProducts(category);
            
            // Actualizar botones activos
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            if (filterBtn) {
                filterBtn.classList.add('active');
            }
            
            // Cerrar sidebar si está abierto
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        }
        
        // Enlaces de categorías en sidebar
        const categoryLink = e.target.closest('a[data-category]');
        if (categoryLink) {
            e.preventDefault();
            e.stopPropagation();
            const category = categoryLink.getAttribute('data-category');
            console.log("Clic en categoría del sidebar:", category);
            filterProducts(category);
            
            // Actualizar botones activos
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            if (filterBtn) {
                filterBtn.classList.add('active');
            }
            
            // Cerrar sidebar
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        }
        
        // Botones de filtro
        const filterBtn = e.target.closest('.filter-btn');
        if (filterBtn) {
            e.preventDefault();
            e.stopPropagation();
            const category = filterBtn.getAttribute('data-filter');
            console.log("Clic en filtro:", category);
            
            // Actualizar botones activos
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            filterBtn.classList.add('active');
            
            filterProducts(category);
        }
        
        // Productos - Ver detalles
        const viewBtn = e.target.closest('.view-product');
        if (viewBtn) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(viewBtn.getAttribute('data-id'));
            console.log("Clic en ver detalles:", productId);
            openProductModal(productId);
        }
        
        // Productos - Agregar al carrito (botones en la lista de productos)
        const addToCartBtn = e.target.closest('.add-to-cart');
        if (addToCartBtn) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(addToCartBtn.getAttribute('data-id'));
            console.log("Clic en agregar al carrito:", productId);
            addToCart(productId);
            addToCartBtn.textContent = 'En el carrito';
            addToCartBtn.disabled = true;
        }
        
        // Carrito - Disminuir cantidad
        const decreaseBtn = e.target.closest('.decrease-quantity');
        if (decreaseBtn) {
            e.stopPropagation();
            const productId = parseInt(decreaseBtn.getAttribute('data-id'));
            console.log("Disminuir cantidad:", productId);
            updateCartItemQuantity(productId, -1);
        }
        
        // Carrito - Aumentar cantidad
        const increaseBtn = e.target.closest('.increase-quantity');
        if (increaseBtn) {
            e.stopPropagation();
            const productId = parseInt(increaseBtn.getAttribute('data-id'));
            console.log("Aumentar cantidad:", productId);
            updateCartItemQuantity(productId, 1);
        }
        
        // Carrito - Eliminar producto
        const removeBtn = e.target.closest('.remove-item');
        if (removeBtn) {
            e.stopPropagation();
            const productId = parseInt(removeBtn.getAttribute('data-id'));
            console.log("Eliminar producto:", productId);
            removeFromCart(productId);
        }
        
        // Enlaces del footer y navegación
        const footerLink = e.target.closest('a[href^="#"]');
        if (footerLink && !footerLink.hasAttribute('data-category') && !footerLink.hasAttribute('data-id')) {
            e.preventDefault();
            const targetId = footerLink.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Realizar búsqueda
function performSearch() {
    console.log("Realizando búsqueda...");
    
    if (!searchInput) return;
    
    const query = searchInput.value.trim().toLowerCase();
    console.log("Término de búsqueda:", query);
    
    if (query === '') {
        renderProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros términos de búsqueda</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-id', product.id);
        
        const inCart = cart.some(item => item.id === product.id);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="view-product" data-id="${product.id}">Ver Detalles</button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart" data-id="${product.id}" ${inCart ? 'disabled' : ''}>
                    ${inCart ? 'En el carrito' : 'Agregar al carrito'}
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    console.log("Resultados de búsqueda:", filteredProducts.length);
}