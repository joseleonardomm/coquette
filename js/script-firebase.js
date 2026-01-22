// script-firebase.js - OPTIMIZADO Y CORREGIDO
// Tienda principal con Firebase Realtime Database

// Datos iniciales
let storeData = {
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%23C5A451'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='14' font-weight='bold' fill='%23000' text-anchor='middle' dy='.3em'%3ECOQUETTE SPORT%3C/text%3E%3C/svg%3E",
    whatsapp: "+1234567890",
    location: "Av. Principal 123, Ciudad",
    description: "Tienda de ropa deportiva de alta calidad.",
    about: "Somos una tienda especializada en ropa deportiva de alta calidad, comprometidos con tu rendimiento y comodidad. Ofrecemos productos diseñados para atletas profesionales y entusiastas del fitness."
};

let categories = [];
let products = [];
let heroSlides = [];

// Carrito de compras
let cart = [];

// Variables para control de eventos táctiles
let isScrolling = false;
let scrollTimeout;
let lastClickTime = 0;
const CLICK_DELAY = 300; // 300ms entre clics

// Variables para acceso al admin
let adminInputSequence = '';
const ADMIN_PASSWORD = 'abuelamia';

// DOM Elements
let sidebar, overlay, menuToggle, closeSidebar, cartSidebar, cartBtn, closeCart;
let cartItems, cartTotal, cartCount, checkoutBtn, productModal, closeProductModal;
let searchInput, searchButton;
let adminAccessInput;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM cargado, inicializando aplicación con Firebase...");
    
    // Inicializar referencias a elementos del DOM
    initializeDOMElements();
    
    // Configurar acceso al admin (DEBE IR ANTES DE CUALQUIER OTRA COSA)
    setupAdminAccess();
    
    // Inicializar Firebase
    const firebaseInitialized = await initializeFirebase();
    
    if (!firebaseInitialized) {
        console.error("No se pudo inicializar Firebase. Cargando datos por defecto...");
        showNotification('Error: Firebase no está configurado', 'error');
        loadDefaultData();
        renderStoreData();
        renderCategories();
        renderProducts();
        initEvents();
        updateCart();
        return;
    }
    
    // Cargar datos de Firebase
    await loadDataFromFirebase();
    
    // Cargar carrito del localStorage
    loadCartFromLocalStorage();
    
    // Renderizar datos iniciales
    renderStoreData();
    renderCategories();
    renderProducts();
    renderHeroSlides();
    
    // Inicializar eventos
    initEvents();
    
    // Actualizar carrito
    updateCart();
    
    console.log("Aplicación con Firebase inicializada correctamente");
    
    // Verificar conexión a Firebase
    checkFirebaseConnection();
    
    // Limpiar placeholders de carga
    setTimeout(() => {
        const loadingElements = document.querySelectorAll('.firebase-loading, .loading-placeholder');
        loadingElements.forEach(el => {
            if (el.parentNode) el.style.display = 'none';
        });
    }, 1000);
});

// Inicializar Firebase con mejor manejo de errores
async function initializeFirebase() {
    try {
        console.log("Inicializando Firebase...");
        
        // Verificar si Firebase está cargado
        if (typeof firebase === 'undefined') {
            console.error("Firebase SDK no está cargado");
            
            // Cargar Firebase dinámicamente si no está cargado
            await loadFirebaseSDK();
        }
        
        // Configuración de Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAP44JZQ8z6XQBxGLRGSvfoJ00ChZIzqT8",
            authDomain: "coquette-sport.firebaseapp.com",
            databaseURL: "https://coquette-sport-default-rtdb.firebaseio.com",
            projectId: "coquette-sport",
            storageBucket: "coquette-sport.firebasestorage.app",
            messagingSenderId: "433999067952",
            appId: "1:433999067952:web:042000b97feff3e339e6f5"
        };
        
        // Inicializar Firebase solo si no está inicializado
        if (!firebase.apps || firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
            console.log("Firebase inicializado correctamente");
        } else {
            console.log("Firebase ya estaba inicializado");
        }
        
        return true;
        
    } catch (error) {
        console.error("Error inicializando Firebase:", error);
        return false;
    }
}

// Cargar Firebase SDK dinámicamente
async function loadFirebaseSDK() {
    return new Promise((resolve, reject) => {
        // Verificar si ya está cargado
        if (typeof firebase !== 'undefined') {
            resolve();
            return;
        }
        
        // Cargar Firebase SDK
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
        script.async = true;
        
        script.onload = () => {
            // Cargar módulos adicionales necesarios
            const databaseScript = document.createElement('script');
            databaseScript.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js';
            databaseScript.async = true;
            
            databaseScript.onload = () => {
                console.log("Firebase SDK cargado dinámicamente");
                resolve();
            };
            
            databaseScript.onerror = () => {
                console.error("Error cargando Firebase Database SDK");
                reject();
            };
            
            document.head.appendChild(databaseScript);
        };
        
        script.onerror = () => {
            console.error("Error cargando Firebase SDK");
            reject();
        };
        
        document.head.appendChild(script);
    });
}

// Configurar acceso al admin - MEJORADO PARA MÓVILES
function setupAdminAccess() {
    console.log("Configurando acceso al admin...");
    
    // Solo activar en la página principal (no en admin)
    if (window.location.pathname.includes('admin.html')) {
        console.log("Estás en admin, no se activa el acceso");
        return;
    }
    
    // Crear input oculto si no existe
    if (!document.getElementById('admin-access-input')) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'admin-access-input';
        input.className = 'hidden-input';
        input.placeholder = 'Escribe aquí para acceder al admin';
        document.body.appendChild(input);
        adminAccessInput = input;
    } else {
        adminAccessInput = document.getElementById('admin-access-input');
    }
    
    // Función para manejar la entrada
    function handleAdminInput(e) {
        // Solo procesar si es una letra
        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
            adminInputSequence += e.key.toLowerCase();
            
            // Mantener solo el largo de la contraseña
            if (adminInputSequence.length > ADMIN_PASSWORD.length) {
                adminInputSequence = adminInputSequence.substring(1);
            }
            
            console.log("Secuencia admin actual:", adminInputSequence);
            
            // Verificar si coincide
            if (adminInputSequence === ADMIN_PASSWORD) {
                console.log("¡Contraseña correcta! Redirigiendo al admin...");
                // Redireccionar al admin
                window.location.href = 'admin.html';
                adminInputSequence = ''; // Resetear
            }
        }
    }
    
    // Eventos para desktop (keydown)
    document.addEventListener('keydown', function(e) {
        // Evitar que funcione cuando se está escribiendo en campos de texto visibles
        const activeElement = document.activeElement;
        const isVisibleInput = activeElement.tagName === 'INPUT' || 
                              activeElement.tagName === 'TEXTAREA';
        
        // Solo si no es un campo de texto visible
        if (!isVisibleInput || activeElement === adminAccessInput) {
            handleAdminInput(e);
        }
    });
    
    // Eventos para móviles (input en campo oculto)
    if (adminAccessInput) {
        adminAccessInput.addEventListener('input', function(e) {
            const value = this.value.toLowerCase();
            
            // Verificar si la contraseña está contenida en el texto ingresado
            if (value.includes(ADMIN_PASSWORD)) {
                console.log("¡Contraseña detectada! Redirigiendo al admin...");
                // Redireccionar al admin
                window.location.href = 'admin.html';
                this.value = ''; // Limpiar campo
            }
            
            // Mantener el campo corto para mejor rendimiento
            if (this.value.length > ADMIN_PASSWORD.length * 2) {
                this.value = this.value.slice(-ADMIN_PASSWORD.length * 2);
            }
        });
        
        // Permitir que el campo reciba foco cuando se toca la pantalla
        document.addEventListener('touchstart', function(e) {
            // Solo si no se toca un elemento interactivo
            if (!e.target.closest('button, a, input, select, textarea')) {
                adminAccessInput.focus();
            }
        });
        
        // Enfocar automáticamente al cargar en móviles
        if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            setTimeout(() => {
                adminAccessInput.focus();
            }, 1000);
        }
    }
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
    adminAccessInput = document.getElementById('admin-access-input');
    
    console.log("Elementos DOM inicializados:", {
        sidebar: !!sidebar,
        cartSidebar: !!cartSidebar,
        productModal: !!productModal,
        adminAccessInput: !!adminAccessInput
    });
}

// Cargar datos desde Firebase Realtime Database
async function loadDataFromFirebase() {
    try {
        console.log("Cargando datos desde Firebase Realtime Database...");
        
        const database = firebase.database();
        
        // Función helper para convertir objetos de Firebase a arrays
        const firebaseObjectToArray = (obj) => {
            if (!obj) return [];
            return Object.keys(obj).map(key => ({
                id: key, // Usar la clave de Firebase como ID
                ...obj[key]
            }));
        };
        
        // Cargar datos de la tienda
        const storeSnapshot = await database.ref('tienda').once('value');
        if (storeSnapshot.exists()) {
            storeData = { ...storeData, ...storeSnapshot.val() };
            console.log("Datos de tienda cargados desde Firebase");
        }
        
        // Cargar categorías
        const categoriesSnapshot = await database.ref('categorias').once('value');
        const cats = categoriesSnapshot.val();
        categories = firebaseObjectToArray(cats);
        console.log("Categorías cargadas desde Firebase:", categories.length);
        
        // Cargar productos
        const productsSnapshot = await database.ref('productos').once('value');
        const prods = productsSnapshot.val();
        const productsArray = firebaseObjectToArray(prods);
        
        // Procesar productos para asegurar tipos de datos correctos
        products = productsArray.map(product => ({
            ...product,
            price: parseFloat(product.price) || 0,
            originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
            images: Array.isArray(product.images) ? product.images : [product.image || ''],
            description: product.description || '',
            category: product.category || ''
        }));
        
        console.log("Productos cargados desde Firebase:", products.length);
        
        // Cargar slides
        const slidesSnapshot = await database.ref('slides').once('value');
        const sls = slidesSnapshot.val();
        heroSlides = firebaseObjectToArray(sls);
        console.log("Slides cargados desde Firebase:", heroSlides.length);
        
        // Si no hay datos, cargar datos por defecto
        if (categories.length === 0 && products.length === 0) {
            console.log("No hay datos en Firebase, cargando datos por defecto...");
            loadDefaultData();
        }
        
    } catch (error) {
        console.error("Error cargando datos desde Firebase:", error);
        showNotification('Error al cargar datos desde Firebase', 'error');
        
        // Cargar datos por defecto en caso de error
        loadDefaultData();
    }
}

// Cargar datos por defecto
function loadDefaultData() {
    categories = [
        { id: 'cat1', name: "Ropa Deportiva", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { id: 'cat2', name: "Zapatillas", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { id: 'cat3', name: "Accesorios", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
        { id: 'cat4', name: "Equipamiento", image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
    ];
    
    products = [
        { 
            id: 'prod1', 
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
            id: 'prod2', 
            name: "Zapatillas Running Pro", 
            category: "Zapatillas", 
            price: 89.99, 
            originalPrice: 99.99,
            description: "Zapatillas diseñadas para corredores de alto rendimiento. Amortiguación superior y máxima comodidad.",
            images: [
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        }
    ];
    
    heroSlides = [
        { 
            id: 'slide1',
            title: "Ropa Deportiva de Alta Calidad", 
            description: "Equípate con lo mejor para tus entrenamientos",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        }
    ];
}

// Cargar carrito desde localStorage
function loadCartFromLocalStorage() {
    try {
        const savedCart = localStorage.getItem('coquetteSportCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log("Carrito cargado desde localStorage:", cart.length);
        }
    } catch (error) {
        console.log("No hay carrito guardado o error al cargar:", error);
        cart = [];
    }
}

// Guardar carrito en localStorage
function saveCartToLocalStorage() {
    try {
        localStorage.setItem('coquetteSportCart', JSON.stringify(cart));
    } catch (error) {
        console.error("Error guardando carrito en localStorage:", error);
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
        
        // Imagen con mejor manejo de errores
        const imageHTML = category.image ? 
            `<img src="${category.image}" alt="${category.name}" loading="lazy" 
                 onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22300%22%3E%3Crect width=%22600%22 height=%22300%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22300%22 y=%22150%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3E${encodeURIComponent(category.name)}%3C/text%3E%3C/svg%3E';">` :
            `<div class="placeholder-image">${category.name}</div>`;
        
        categoryCard.innerHTML = `
            <div class="category-image">
                ${imageHTML}
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
        // Buscar categoría por ID
        const category = categories.find(c => c.id === filter || c.id == filter);
        if (category) {
            filteredProducts = products.filter(product => product.category === category.name || product.category === category.id);
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
        
        // Primera imagen con mejor manejo de errores
        const firstImage = product.images && product.images.length > 0 ? product.images[0] : 
            'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect width=%22600%22 height=%22600%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22300%22 y=%22300%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3EProducto%3C/text%3E%3C/svg%3E';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${firstImage}" alt="${product.name}" loading="lazy" 
                     onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect width=%22600%22 height=%22600%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22300%22 y=%22300%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3E${encodeURIComponent(product.name)}%3C/text%3E%3C/svg%3E';">
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
    
    console.log("Productos renderizadas:", filteredProducts.length);
}

// Filtrar productos por categoría
function filterProducts(category) {
    console.log("Filtrando productos por categoría:", category);
    renderProducts(category);
    
    // Desplazarse a la sección de productos
    const productsSection = document.getElementById('products');
    if (productsSection) {
        setTimeout(() => {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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
        
        // Usar imagen o color de fondo
        if (slide.image) {
            slideElement.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${slide.image}')`;
            slideElement.style.backgroundSize = 'cover';
            slideElement.style.backgroundPosition = 'center';
            slideElement.style.backgroundRepeat = 'no-repeat';
        } else {
            slideElement.style.background = 'linear-gradient(135deg, #000 0%, #333 100%)';
        }
        
        slideElement.innerHTML = `
            <div class="hero-content">
                <h1>${slide.title || 'Coquette Sport'}</h1>
                <p>${slide.description || 'Tu tienda de ropa deportiva de confianza'}</p>
                <a href="#products" class="hero-btn">Ver Colección</a>
            </div>
        `;
        heroSlider.appendChild(slideElement);
    });
}

// Abrir modal de producto - CORREGIDO
function openProductModal(productId) {
    console.log("Abriendo modal para producto ID:", productId);
    
    // Cerrar cualquier sidebar abierto primero
    closeAllModals();
    
    // Usar comparación flexible para IDs
    const product = products.find(p => p.id == productId);
    if (!product) {
        console.error("Producto no encontrado:", productId);
        showNotification('Producto no encontrado', 'error');
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
    
    updateElementText('modal-product-description', product.description || 'Sin descripción disponible');
    updateElementText('modal-product-category', product.category);
    
    // Actualizar imágenes
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        const firstImage = product.images && product.images.length > 0 ? product.images[0] : 
            'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect width=%22600%22 height=%22600%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22300%22 y=%22300%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3E${encodeURIComponent(product.name)}%3C/text%3E%3C/svg%3E';
        
        mainImage.innerHTML = `<img src="${firstImage}" alt="${product.name}" loading="lazy" 
            onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect width=%22600%22 height=%22600%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22300%22 y=%22300%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3E${encodeURIComponent(product.name)}%3C/text%3E%3C/svg%3E';">`;
    }
    
    const thumbnails = document.getElementById('modal-thumbnails');
    if (thumbnails) {
        thumbnails.innerHTML = '';
        
        const images = product.images || (product.image ? [product.image] : []);
        
        if (images.length === 0) {
            thumbnails.innerHTML = '<div class="no-images">No hay imágenes disponibles</div>';
        } else {
            images.forEach((image, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
                thumbnail.innerHTML = `<img src="${image}" alt="${product.name} ${index + 1}" loading="lazy"
                    onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22%3E%3Crect width=%2280%22 height=%2280%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%2240%22 y=%2240%22 font-family=%22Arial%22 font-size=%2210%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3EImg ${index + 1}%3C/text%3E%3C/svg%3E';">`;
                
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
    }
    
    // Configurar cantidad
    const quantityInput = document.getElementById('modal-quantity');
    if (quantityInput) quantityInput.value = 1;
    
    // Configurar botón de agregar al carrito
    const addToCartBtn = document.getElementById('modal-add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.setAttribute('data-id', product.id);
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = 'Agregar al carrito';
    }
    
    // Mostrar modal
    if (productModal) {
        productModal.style.display = 'flex';
        document.body.classList.add('modal-open');
        console.log("Modal mostrado");
    }
}

// Agregar producto al carrito
function addToCart(productId, quantity = 1) {
    console.log("Agregando al carrito producto ID:", productId, "cantidad:", quantity);
    
    // Usar comparación flexible para IDs
    const product = products.find(p => p.id == productId);
    if (!product) {
        console.error("Producto no encontrado:", productId);
        showNotification('Producto no encontrado', 'error');
        return;
    }
    
    // Verificar si ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id == productId);
    
    if (existingItemIndex !== -1) {
        // Actualizar cantidad si ya existe
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Agregar nuevo item al carrito
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: (product.images && product.images[0]) || product.image || '',
            quantity: quantity
        });
    }
    
    updateCart();
    saveCartToLocalStorage();
    
    // Mostrar notificación
    showNotification(`"${product.name}" agregado al carrito`);
}

// Actualizar carrito
function updateCart() {
    console.log("Actualizando carrito...");
    
    // Actualizar contador del carrito
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        console.log("Total items en carrito:", totalItems);
    }
    
    // Actualizar lista de productos del carrito
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
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" 
                     onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%2250%22 y=%2250%22 font-family=%22Arial%22 font-size=%2212%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3E${encodeURIComponent(item.name)}%3C/text%3E%3C/svg%3E';">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="decrease-quantity" data-id="${item.id}">-</button>
                            <span>${item.quantity || 1}</span>
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
        const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
        console.log("Total carrito: $", total.toFixed(2));
    }
}

// Actualizar cantidad de producto en el carrito
function updateCartItemQuantity(productId, change) {
    console.log("Actualizando cantidad producto ID:", productId, "cambio:", change);
    
    // Usar comparación flexible para IDs
    const itemIndex = cart.findIndex(item => item.id == productId);
    if (itemIndex === -1) return;
    
    // Actualizar cantidad
    cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + change;
    
    // Si la cantidad es 0 o menor, eliminar del carrito
    if (cart[itemIndex].quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
        saveCartToLocalStorage();
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    console.log("Eliminando del carrito producto ID:", productId);
    
    // Usar comparación flexible para IDs
    const itemIndex = cart.findIndex(item => item.id == productId);
    if (itemIndex === -1) return;
    
    const removedItem = cart[itemIndex];
    cart.splice(itemIndex, 1);
    
    updateCart();
    saveCartToLocalStorage();
    
    // Actualizar botones de agregar al carrito en la lista de productos
    const productButton = document.querySelector(`.add-to-cart[data-id="${removedItem.id}"]`);
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
    if (!phone) {
        showNotification('Número de WhatsApp no configurado', 'error');
        return;
    }
    
    let message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.quantity || 1} x $${item.price.toFixed(2)} = $${((item.quantity || 1) * item.price).toFixed(2)}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    message += `\nTotal: $${total.toFixed(2)}\n\n`;
    message += `Por favor, confirmen disponibilidad y forma de pago.\n\n`;
    message += `---\nPedido de: Coquette Sport`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp en nueva ventana
    window.open(url, '_blank');
    
    // Vaciar carrito después de enviar (opcional)
    // cart = [];
    // updateCart();
    // saveCartToLocalStorage();
    
    // Cerrar carrito
    if (cartSidebar) cartSidebar.classList.remove('open');
    
    // Mostrar notificación
    showNotification('Pedido enviado por WhatsApp');
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    console.log("Mostrando notificación:", message);
    
    // Eliminar notificaciones anteriores
    document.querySelectorAll('.notification').forEach(notification => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Agregar icono según tipo
    let icon = '';
    if (type === 'error') {
        icon = '<i class="fas fa-exclamation-circle"></i>';
        notification.style.background = 'linear-gradient(135deg, #ff4444 0%, #ff6666 100%)';
    } else if (type === 'warning') {
        icon = '<i class="fas fa-exclamation-triangle"></i>';
        notification.style.background = 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)';
    } else {
        icon = '<i class="fas fa-check-circle"></i>';
        notification.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
    }
    
    notification.innerHTML = `${icon} ${message}`;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
}

// Inicializar eventos
function initEvents() {
    console.log("Inicializando eventos con prevención de clics rápidos...");
    
    // Función para prevenir clics rápidos
    function preventFastClicks(e) {
        const currentTime = new Date().getTime();
        const timeSinceLastClick = currentTime - lastClickTime;
        
        if (timeSinceLastClick < CLICK_DELAY) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Clic rápido prevenido");
            return true;
        }
        
        lastClickTime = currentTime;
        return false;
    }
    
    // Sidebar con prevención de clics rápidos
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            e.stopPropagation();
            console.log("Abriendo sidebar");
            
            // Añadir clase al body
            document.body.classList.add('sidebar-open');
            
            if (sidebar) sidebar.classList.add('open');
            if (overlay) {
                overlay.classList.add('active');
                overlay.style.zIndex = '999';
            }
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            e.stopPropagation();
            console.log("Cerrando sidebar");
            
            // Remover clase del body
            document.body.classList.remove('sidebar-open');
            
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) {
                overlay.classList.remove('active');
                overlay.style.zIndex = '';
            }
        });
    }
    
    // Carrito con prevención de clics rápidos
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            e.stopPropagation();
            console.log("Abriendo carrito");
            
            // Añadir clase al body
            document.body.classList.add('cart-open');
            
            if (cartSidebar) cartSidebar.classList.add('open');
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            e.stopPropagation();
            console.log("Cerrando carrito");
            
            // Remover clase del body
            document.body.classList.remove('cart-open');
            
            if (cartSidebar) cartSidebar.classList.remove('open');
        });
    }
    
    // Overlay - cierra todo
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            console.log("Clic en overlay, cerrando todo");
            closeAllModals();
        });
        
        // Prevenir scroll en overlay
        overlay.addEventListener('touchmove', function(e) {
            if (overlay.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // Modal de producto
    if (closeProductModal) {
        closeProductModal.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            e.stopPropagation();
            console.log("Cerrando modal de producto");
            closeProductModalFunc();
        });
    }
    
    // Cerrar modal al hacer clic fuera
    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            if (e.target === productModal) {
                console.log("Clic fuera del modal, cerrando");
                closeProductModalFunc();
            }
        });
        
        // Prevenir scroll en modal
        productModal.addEventListener('touchmove', function(e) {
            if (productModal.style.display === 'flex') {
                e.stopPropagation();
            }
        }, { passive: false });
    }
    
    // Buscador
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            e.stopPropagation();
            performSearch();
        });
    }
    
    // Agregar al carrito desde el modal
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            e.stopPropagation();
            const productId = this.getAttribute('data-id');
            const quantityInput = document.getElementById('modal-quantity');
            const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            
            console.log("Agregando al carrito desde modal:", productId, quantity);
            addToCart(productId, quantity);
            
            closeProductModalFunc();
        });
    }
    
    // Botones de cantidad
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (minusBtn) {
        minusBtn.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            e.stopPropagation();
            const quantityInput = document.getElementById('modal-quantity');
            if (quantityInput && quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
    }
    
    if (plusBtn) {
        plusBtn.addEventListener('click', function(e) {
            if (preventFastClicks(e)) return;
            
            e.stopPropagation();
            const quantityInput = document.getElementById('modal-quantity');
            if (quantityInput && quantityInput.value < 10) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        });
    }
    
    // Configurar delegación de eventos con prevención de clics rápidos
    setupEventDelegation(preventFastClicks);
    
    // Prevenir scroll no deseado en móviles
    setupScrollPrevention();
    
    console.log("Eventos inicializados con prevención de clics rápidos");
}

// Nueva función para prevenir scroll no deseado
function setupScrollPrevention() {
    // Prevenir scroll cuando hay elementos abiertos
    document.addEventListener('touchmove', function(e) {
        const isSidebarOpen = sidebar && sidebar.classList.contains('open');
        const isCartOpen = cartSidebar && cartSidebar.classList.contains('open');
        const isModalOpen = productModal && productModal.style.display === 'flex';
        
        if (isSidebarOpen || isCartOpen || isModalOpen) {
            // Permitir scroll solo en el elemento abierto
            const target = e.target;
            const isScrollableElement = 
                target.closest('.sidebar-content') ||
                target.closest('.cart-items') ||
                target.closest('.product-modal-content');
            
            if (!isScrollableElement) {
                e.preventDefault();
            }
        }
    }, { passive: false });
    
    // Detectar scroll para evitar conflictos con clics
    window.addEventListener('scroll', function() {
        isScrolling = true;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
        }, 100);
    });
}

// Configurar delegación de eventos para elementos dinámicos
function setupEventDelegation(preventFastClicks) {
    console.log("Configurando delegación de eventos...");
    
    // Función manejadora para eventos
    function handleEvent(e) {
        // Prevenir clics durante scroll
        if (isScrolling) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        
        // Prevenir clics rápidos si se pasa la función
        if (preventFastClicks && preventFastClicks(e)) {
            return;
        }
        
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
            closeAllModals();
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
            closeAllModals();
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
            const productId = viewBtn.getAttribute('data-id');
            console.log("Clic en ver detalles:", productId);
            openProductModal(productId);
        }
        
        // Productos - Agregar al carrito (botones en la lista de productos)
        const addToCartBtn = e.target.closest('.add-to-cart');
        if (addToCartBtn && !addToCartBtn.disabled) {
            e.preventDefault();
            e.stopPropagation();
            const productId = addToCartBtn.getAttribute('data-id');
            console.log("Clic en agregar al carrito:", productId);
            addToCart(productId);
            addToCartBtn.textContent = 'En el carrito';
            addToCartBtn.disabled = true;
        }
        
        // Carrito - Disminuir cantidad
        const decreaseBtn = e.target.closest('.decrease-quantity');
        if (decreaseBtn) {
            e.stopPropagation();
            const productId = decreaseBtn.getAttribute('data-id');
            console.log("Disminuir cantidad:", productId);
            updateCartItemQuantity(productId, -1);
        }
        
        // Carrito - Aumentar cantidad
        const increaseBtn = e.target.closest('.increase-quantity');
        if (increaseBtn) {
            e.stopPropagation();
            const productId = increaseBtn.getAttribute('data-id');
            console.log("Aumentar cantidad:", productId);
            updateCartItemQuantity(productId, 1);
        }
        
        // Carrito - Eliminar producto
        const removeBtn = e.target.closest('.remove-item');
        if (removeBtn) {
            e.stopPropagation();
            const productId = removeBtn.getAttribute('data-id');
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
    }
    
    // Usar solo click, no touchstart
    document.addEventListener('click', handleEvent);
    
    // Para móviles, agregar touchstart con prevención
    document.addEventListener('touchstart', function(e) {
        // Solo prevenir comportamiento por defecto en elementos interactivos
        const tag = e.target.tagName.toLowerCase();
        if (['button', 'a', 'input', 'select'].includes(tag)) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Función para cerrar todos los modales
function closeAllModals() {
    console.log("Cerrando todos los modales");
    
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (productModal) productModal.style.display = 'none';
    
    // Remover todas las clases de bloqueo
    document.body.classList.remove('sidebar-open', 'cart-open', 'modal-open');
    document.body.style.overflow = '';
}

// Función para cerrar modal de producto
function closeProductModalFunc() {
    if (productModal) productModal.style.display = 'none';
    document.body.classList.remove('modal-open');
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
        (product.name && product.name.toLowerCase().includes(query)) || 
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query))
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
        
        const inCart = cart.some(item => item.id == product.id);
        const firstImage = product.images && product.images.length > 0 ? product.images[0] : 
            'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect width=%22600%22 height=%22600%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22300%22 y=%22300%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3EProducto%3C/text%3E%3C/svg%3E';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${firstImage}" alt="${product.name}" loading="lazy"
                     onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect width=%22600%22 height=%22600%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22300%22 y=%22300%22 font-family=%22Arial%22 font-size=%2218%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23666%22%3E${encodeURIComponent(product.name)}%3C/text%3E%3C/svg%3E';">
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

// Función para verificar la conexión a Firebase
function checkFirebaseConnection() {
    try {
        const database = firebase.database();
        database.ref('.info/connected').on('value', function(snap) {
            if (snap.val() === true) {
                console.log("✅ Conectado a Firebase Realtime Database");
            } else {
                console.log("❌ Desconectado de Firebase Realtime Database");
            }
        });
    } catch (error) {
        console.error("Error verificando conexión a Firebase:", error);
    }
}

// Función para recargar datos (útil para debugging)
function reloadData() {
    console.log("Recargando datos...");
    loadDataFromFirebase().then(() => {
        renderStoreData();
        renderCategories();
        renderProducts();
        renderHeroSlides();
        updateCart();
        showNotification('Datos recargados correctamente');
    });
}

// Exportar funciones para debugging
if (typeof window !== 'undefined') {
    window.reloadData = reloadData;
    window.debugCart = () => console.log('Carrito:', cart);
    window.debugProducts = () => console.log('Productos:', products);
    window.debugCategories = () => console.log('Categorías:', categories);
}