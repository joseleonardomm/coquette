// Variables globales para almacenar datos
let storeData = {
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%23C5A451'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='14' font-weight='bold' fill='%23000' text-anchor='middle' dy='.3em'%3ECOQUETTE SPORT%3C/text%3E%3C/svg%3E",
    whatsapp: "+51987654321",
    location: "Av. Principal 123, Miraflores, Lima",
    description: "Tienda de ropa deportiva de alta calidad para atletas profesionales y entusiastas del fitness.",
    about: "Somos una tienda especializada en ropa deportiva de alta calidad, comprometidos con tu rendimiento y comodidad. Ofrecemos productos diseñados para atletas profesionales y entusiastas del fitness. Nuestra misión es proporcionar equipo deportivo de la mejor calidad para ayudarte a alcanzar tus metas."
};

let categories = [];
let products = [];
let promotions = [];
let heroSlides = [];

// Variables para imágenes temporales
let productImages = [];

// Referencias a elementos del DOM
let navButtons, adminSections, saveStoreBtn, addCategoryBtn, addProductBtn, addPromotionBtn, addSlideBtn;
let notification, categoryModal, productModal, promotionModal, slideModal, confirmModal;

// Inicializar el panel de administración
document.addEventListener('DOMContentLoaded', function() {
    console.log("Panel de administración inicializando...");
    
    // Inicializar referencias a elementos del DOM
    initializeDOMElements();
    
    // Cargar datos del localStorage
    loadAllData();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Renderizar datos iniciales
    renderCategoriesTable();
    renderProductsTable();
    renderPromotions();
    renderSlides();
    
    // Cargar datos en formulario de tienda
    populateStoreForm();
    
    // Configurar contadores de caracteres
    setupCharacterCounters();
    
    console.log("Panel de administración listo");
});

// Inicializar referencias a elementos del DOM
function initializeDOMElements() {
    navButtons = document.querySelectorAll('.nav-btn');
    adminSections = document.querySelectorAll('.admin-section');
    saveStoreBtn = document.getElementById('save-store-btn');
    addCategoryBtn = document.getElementById('add-category-btn');
    addProductBtn = document.getElementById('add-product-btn');
    addPromotionBtn = document.getElementById('add-promotion-btn');
    addSlideBtn = document.getElementById('add-slide-btn');
    notification = document.getElementById('admin-notification');
    
    // Modales
    categoryModal = document.getElementById('category-modal');
    productModal = document.getElementById('product-modal');
    promotionModal = document.getElementById('promotion-modal');
    slideModal = document.getElementById('slide-modal');
    confirmModal = document.getElementById('confirm-modal');
}

// Configurar contadores de caracteres
function setupCharacterCounters() {
    // Tienda
    setupCharacterCounter('store-description', 'desc-chars', 200);
    setupCharacterCounter('store-about', 'about-chars', 1000);
    
    // Categorías
    setupCharacterCounter('category-name', 'category-name-chars', 50);
    
    // Productos
    setupCharacterCounter('product-name', 'product-name-chars', 100);
    setupCharacterCounter('product-description', 'product-desc-chars', 500);
    
    // Promociones
    setupCharacterCounter('promotion-title', 'promotion-title-chars', 100);
    setupCharacterCounter('promotion-description', 'promotion-desc-chars', 300);
    
    // Slides
    setupCharacterCounter('slide-title', 'slide-title-chars', 100);
    setupCharacterCounter('slide-description', 'slide-desc-chars', 200);
}

function setupCharacterCounter(inputId, counterId, maxLength) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    
    if (input && counter) {
        // Actualizar contador inicial
        counter.textContent = input.value.length;
        updateCounterStyle(counter, input.value.length, maxLength);
        
        // Escuchar cambios
        input.addEventListener('input', function() {
            counter.textContent = this.value.length;
            updateCounterStyle(counter, this.value.length, maxLength);
        });
    }
}

function updateCounterStyle(counter, length, maxLength) {
    counter.classList.remove('warning', 'error');
    
    if (length > maxLength * 0.8) {
        counter.classList.add('warning');
    }
    
    if (length > maxLength) {
        counter.classList.add('error');
    }
}

// Cargar todos los datos del localStorage
function loadAllData() {
    try {
        console.log("Cargando datos del localStorage...");
        
        const savedStoreData = localStorage.getItem('coquetteSportStoreData');
        const savedCategories = localStorage.getItem('coquetteSportCategories');
        const savedProducts = localStorage.getItem('coquetteSportProducts');
        const savedPromotions = localStorage.getItem('coquetteSportPromotions');
        const savedHeroSlides = localStorage.getItem('coquetteSportHeroSlides');
        
        if (savedStoreData) {
            storeData = JSON.parse(savedStoreData);
            console.log("Datos de tienda cargados:", storeData);
        }
        
        if (savedCategories) {
            categories = JSON.parse(savedCategories);
            console.log("Categorías cargadas:", categories.length);
        }
        
        if (savedProducts) {
            products = JSON.parse(savedProducts);
            console.log("Productos cargados:", products.length);
        }
        
        if (savedPromotions) {
            promotions = JSON.parse(savedPromotions);
            console.log("Promociones cargadas:", promotions.length);
        }
        
        if (savedHeroSlides) {
            heroSlides = JSON.parse(savedHeroSlides);
            console.log("Slides cargados:", heroSlides.length);
        }
        
    } catch (error) {
        console.error("Error cargando datos:", error);
        showNotification('Error al cargar datos guardados', 'error');
    }
}

// Guardar todos los datos en localStorage
function saveAllData() {
    try {
        localStorage.setItem('coquetteSportStoreData', JSON.stringify(storeData));
        localStorage.setItem('coquetteSportCategories', JSON.stringify(categories));
        localStorage.setItem('coquetteSportProducts', JSON.stringify(products));
        localStorage.setItem('coquetteSportPromotions', JSON.stringify(promotions));
        localStorage.setItem('coquetteSportHeroSlides', JSON.stringify(heroSlides));
        console.log("Datos guardados en localStorage");
    } catch (error) {
        console.error("Error guardando datos:", error);
        showNotification('Error al guardar datos', 'error');
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación entre secciones
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const section = this.getAttribute('data-section');
            
            // Actualizar botones activos
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar sección correspondiente
            adminSections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === `${section}-section`) {
                    sec.classList.add('active');
                }
            });
        });
    });
    
    // Guardar configuración de la tienda
    if (saveStoreBtn) {
        saveStoreBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            saveStoreData();
        });
    }
    
    // Guardar automáticamente al cambiar campos de la tienda
    const storeInputs = ['whatsapp-number', 'store-location', 'store-description', 'store-about'];
    storeInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('blur', function() {
                saveStoreData();
            });
        }
    });
    
    // Configurar eventos de imágenes
    setupImageUploadEvents();
    
    // Configurar eventos de categorías
    setupCategoryEvents();
    
    // Configurar eventos de productos
    setupProductEvents();
    
    // Configurar eventos de promociones
    setupPromotionEvents();
    
    // Configurar eventos de slides
    setupSlideEvents();
    
    // Configurar eventos del modal de confirmación
    setupConfirmationEvents();
}

// Configurar eventos de subida de imágenes
function setupImageUploadEvents() {
    // Logo de la tienda
    const logoUploadBtn = document.getElementById('logo-upload-btn');
    const logoUpload = document.getElementById('logo-upload');
    
    if (logoUploadBtn && logoUpload) {
        logoUploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            logoUpload.click();
        });
        
        logoUpload.addEventListener('change', function(e) {
            handleImageUpload(e, 'logo-preview');
        });
    }
}

// Configurar eventos de categorías
function setupCategoryEvents() {
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openCategoryModal();
        });
    }
    
    const categoryUploadBtn = document.getElementById('category-upload-btn');
    const categoryImageUpload = document.getElementById('category-image-upload');
    
    if (categoryUploadBtn && categoryImageUpload) {
        categoryUploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            categoryImageUpload.click();
        });
        
        categoryImageUpload.addEventListener('change', function(e) {
            handleImageUpload(e, 'category-image-preview');
        });
    }
    
    const saveCategoryBtn = document.getElementById('save-category');
    const cancelCategoryBtn = document.getElementById('cancel-category');
    const closeCategoryModalBtn = document.getElementById('close-category-modal');
    
    if (saveCategoryBtn) {
        saveCategoryBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            saveCategory();
        });
    }
    
    if (cancelCategoryBtn) {
        cancelCategoryBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(categoryModal);
            resetCategoryForm();
        });
    }
    
    if (closeCategoryModalBtn) {
        closeCategoryModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(categoryModal);
            resetCategoryForm();
        });
    }
}

// Configurar eventos de productos
function setupProductEvents() {
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openProductModal();
        });
    }
    
    const productImagesUploadBtn = document.getElementById('product-images-upload-btn');
    const productImagesUpload = document.getElementById('product-images-upload');
    
    if (productImagesUploadBtn && productImagesUpload) {
        productImagesUploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            productImagesUpload.click();
        });
        
        productImagesUpload.addEventListener('change', function(e) {
            handleMultipleImageUpload(e);
        });
    }
    
    const saveProductBtn = document.getElementById('save-product');
    const cancelProductBtn = document.getElementById('cancel-product');
    const closeProductModalBtn = document.getElementById('close-product-modal');
    
    if (saveProductBtn) {
        saveProductBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            saveProduct();
        });
    }
    
    if (cancelProductBtn) {
        cancelProductBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(productModal);
            resetProductForm();
        });
    }
    
    if (closeProductModalBtn) {
        closeProductModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(productModal);
            resetProductForm();
        });
    }
}

// Configurar eventos de promociones
function setupPromotionEvents() {
    if (addPromotionBtn) {
        addPromotionBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openPromotionModal();
        });
    }
    
    const savePromotionBtn = document.getElementById('save-promotion');
    const cancelPromotionBtn = document.getElementById('cancel-promotion');
    const closePromotionModalBtn = document.getElementById('close-promotion-modal');
    
    if (savePromotionBtn) {
        savePromotionBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            savePromotion();
        });
    }
    
    if (cancelPromotionBtn) {
        cancelPromotionBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(promotionModal);
            resetPromotionForm();
        });
    }
    
    if (closePromotionModalBtn) {
        closePromotionModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(promotionModal);
            resetPromotionForm();
        });
    }
}

// Configurar eventos de slides
function setupSlideEvents() {
    if (addSlideBtn) {
        addSlideBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openSlideModal();
        });
    }
    
    const slideUploadBtn = document.getElementById('slide-upload-btn');
    const slideImageUpload = document.getElementById('slide-image-upload');
    
    if (slideUploadBtn && slideImageUpload) {
        slideUploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            slideImageUpload.click();
        });
        
        slideImageUpload.addEventListener('change', function(e) {
            handleImageUpload(e, 'slide-image-preview');
        });
    }
    
    const saveSlideBtn = document.getElementById('save-slide');
    const cancelSlideBtn = document.getElementById('cancel-slide');
    const closeSlideModalBtn = document.getElementById('close-slide-modal');
    
    if (saveSlideBtn) {
        saveSlideBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            saveSlide();
        });
    }
    
    if (cancelSlideBtn) {
        cancelSlideBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(slideModal);
            resetSlideForm();
        });
    }
    
    if (closeSlideModalBtn) {
        closeSlideModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(slideModal);
            resetSlideForm();
        });
    }
}

// Configurar eventos del modal de confirmación
function setupConfirmationEvents() {
    const cancelConfirmBtn = document.getElementById('cancel-confirm');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const closeConfirmModalBtn = document.getElementById('close-confirm-modal');
    
    if (cancelConfirmBtn) {
        cancelConfirmBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(confirmModal);
        });
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            executeDelete();
        });
    }
    
    if (closeConfirmModalBtn) {
        closeConfirmModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal(confirmModal);
        });
    }
}

// Manejar subida de una sola imagen
function handleImageUpload(event, previewId) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Verificar que sea una imagen
    if (!file.type.match('image.*')) {
        showNotification('Por favor, selecciona un archivo de imagen (JPG, PNG, GIF)', 'error');
        return;
    }
    
    // Verificar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('La imagen es demasiado grande (máximo 5MB)', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById(previewId);
        if (preview) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
}

// Manejar subida de múltiples imágenes
function handleMultipleImageUpload(event) {
    const files = Array.from(event.target.files);
    if (!files || files.length === 0) return;
    
    // Verificar que no exceda el límite de 5 imágenes
    if (productImages.length + files.length > 5) {
        showNotification('Solo puedes subir un máximo de 5 imágenes', 'error');
        return;
    }
    
    let validFiles = 0;
    
    files.forEach((file, index) => {
        // Verificar que sea una imagen
        if (!file.type.match('image.*')) {
            showNotification(`El archivo "${file.name}" no es una imagen válida`, 'error');
            return;
        }
        
        // Verificar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification(`La imagen "${file.name}" es demasiado grande (máximo 5MB)`, 'error');
            return;
        }
        
        validFiles++;
        
        const reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
                productImages.push({
                    data: e.target.result,
                    name: file.name
                });
                renderProductImagesPreview();
                updateImageCounter();
            };
        })(file);
        reader.readAsDataURL(file);
    });
    
    if (validFiles > 0) {
        showNotification(`${validFiles} imagen(es) cargada(s) correctamente`);
    }
}

// Renderizar vista previa de imágenes de producto
function renderProductImagesPreview() {
    const previewContainer = document.getElementById('product-images-preview');
    if (!previewContainer) return;
    
    previewContainer.innerHTML = '';
    
    productImages.forEach((image, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'image-preview-item';
        previewItem.innerHTML = `
            <img src="${image.data}" alt="Imagen ${index + 1}">
            <button class="remove-image" data-index="${index}" title="Eliminar imagen">
                <i class="fas fa-times"></i>
            </button>
        `;
        previewContainer.appendChild(previewItem);
    });
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.remove-image').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const index = parseInt(this.getAttribute('data-index'));
            productImages.splice(index, 1);
            renderProductImagesPreview();
            updateImageCounter();
            showNotification('Imagen eliminada');
        });
    });
}

// Actualizar contador de imágenes
function updateImageCounter() {
    const counter = document.getElementById('image-counter');
    if (counter) {
        counter.textContent = `${productImages.length}/5 imágenes seleccionadas`;
    }
}

// Rellenar formulario de la tienda con datos existentes
function populateStoreForm() {
    const logoPreview = document.getElementById('logo-preview');
    const whatsappInput = document.getElementById('whatsapp-number');
    const locationInput = document.getElementById('store-location');
    const descriptionInput = document.getElementById('store-description');
    const aboutInput = document.getElementById('store-about');
    
    if (logoPreview && storeData.logo) logoPreview.src = storeData.logo;
    if (whatsappInput) whatsappInput.value = storeData.whatsapp || '';
    if (locationInput) locationInput.value = storeData.location || '';
    if (descriptionInput) descriptionInput.value = storeData.description || '';
    if (aboutInput) aboutInput.value = storeData.about || '';
    
    // Actualizar contadores
    if (descriptionInput) {
        document.getElementById('desc-chars').textContent = descriptionInput.value.length;
    }
    if (aboutInput) {
        document.getElementById('about-chars').textContent = aboutInput.value.length;
    }
}

// Guardar configuración de la tienda
function saveStoreData() {
    const logoPreview = document.getElementById('logo-preview');
    const whatsappInput = document.getElementById('whatsapp-number');
    const locationInput = document.getElementById('store-location');
    const descriptionInput = document.getElementById('store-description');
    const aboutInput = document.getElementById('store-about');
    
    if (!logoPreview || !whatsappInput || !locationInput || !descriptionInput || !aboutInput) {
        showNotification('Error: No se encontraron todos los campos del formulario', 'error');
        return;
    }
    
    // Validar WhatsApp
    const whatsappRegex = /^\+[1-9]\d{1,14}$/;
    if (whatsappInput.value && !whatsappRegex.test(whatsappInput.value)) {
        showNotification('Formato de WhatsApp inválido. Use: +51987654321', 'error');
        whatsappInput.focus();
        return;
    }
    
    storeData = {
        logo: logoPreview.src,
        whatsapp: whatsappInput.value.trim(),
        location: locationInput.value.trim(),
        description: descriptionInput.value.trim(),
        about: aboutInput.value.trim()
    };
    
    saveAllData();
    showNotification('Configuración de la tienda guardada exitosamente');
}

// Abrir modal para agregar/editar categoría
function openCategoryModal(categoryId = null) {
    if (!categoryModal) return;
    
    const title = document.getElementById('category-modal-title');
    const categoryNameInput = document.getElementById('category-name');
    const categoryImagePreview = document.getElementById('category-image-preview');
    const categoryIdInput = document.getElementById('category-id');
    
    if (!title || !categoryNameInput || !categoryImagePreview || !categoryIdInput) return;
    
    if (categoryId) {
        // Modo edición
        title.innerHTML = '<i class="fas fa-edit"></i> Editar Categoría';
        const category = categories.find(c => c.id == categoryId);
        
        if (category) {
            categoryNameInput.value = category.name;
            categoryImagePreview.src = category.image;
            categoryIdInput.value = category.id;
            
            // Actualizar contador
            document.getElementById('category-name-chars').textContent = category.name.length;
        }
    } else {
        // Modo agregar
        title.innerHTML = '<i class="fas fa-plus"></i> Agregar Categoría';
        categoryNameInput.value = '';
        categoryImagePreview.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"%3E%3Crect width="300" height="150" fill="%23f0f0f0"/%3E%3Ctext x="150" y="75" font-family="Arial" font-size="16" text-anchor="middle" dominant-baseline="middle" fill="%23666"%3EVista previa%3C/text%3E%3C/svg%3E';
        categoryIdInput.value = '';
        
        // Resetear contador
        document.getElementById('category-name-chars').textContent = '0';
    }
    
    openModal(categoryModal);
}

// Guardar categoría
function saveCategory() {
    const categoryNameInput = document.getElementById('category-name');
    const categoryImagePreview = document.getElementById('category-image-preview');
    const categoryIdInput = document.getElementById('category-id');
    
    if (!categoryNameInput || !categoryImagePreview || !categoryIdInput) {
        showNotification('Error: No se encontraron todos los campos del formulario', 'error');
        return;
    }
    
    const name = categoryNameInput.value.trim();
    const image = categoryImagePreview.src;
    const id = categoryIdInput.value;
    
    // Validaciones
    if (!name) {
        showNotification('Por favor, ingresa un nombre para la categoría', 'error');
        categoryNameInput.focus();
        return;
    }
    
    if (categoryImagePreview.src.includes('Vista previa')) {
        showNotification('Por favor, sube una imagen para la categoría', 'error');
        return;
    }
    
    if (id) {
        // Editar categoría existente
        const index = categories.findIndex(c => c.id == id);
        if (index !== -1) {
            categories[index].name = name;
            categories[index].image = image;
        }
    } else {
        // Agregar nueva categoría
        const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
        categories.push({
            id: newId,
            name: name,
            image: image
        });
    }
    
    // Guardar en localStorage
    saveAllData();
    
    // Actualizar tabla
    renderCategoriesTable();
    
    // Cerrar modal y resetear
    closeModal(categoryModal);
    resetCategoryForm();
    
    // Mostrar notificación
    showNotification(id ? 'Categoría actualizada exitosamente' : 'Categoría agregada exitosamente');
}

// Resetear formulario de categoría
function resetCategoryForm() {
    const categoryImageUpload = document.getElementById('category-image-upload');
    if (categoryImageUpload) categoryImageUpload.value = '';
}

// Renderizar tabla de categorías
function renderCategoriesTable() {
    const tableBody = document.getElementById('categories-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (categories.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px;">
                    <div class="empty-state">
                        <i class="fas fa-tags" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                        <h3>No hay categorías</h3>
                        <p>Agrega tu primera categoría para organizar los productos</p>
                    </div>
                </td>
            </tr>
        `;
        updateCategoriesCount();
        return;
    }
    
    // Contar productos por categoría
    const productCounts = {};
    products.forEach(product => {
        if (product.category) {
            productCounts[product.category] = (productCounts[product.category] || 0) + 1;
        }
    });
    
    categories.forEach(category => {
        const row = document.createElement('tr');
        const productCount = productCounts[category.name] || 0;
        
        row.innerHTML = `
            <td>${category.id}</td>
            <td><strong>${category.name}</strong></td>
            <td>
                <div class="image-cell">
                    <img src="${category.image}" alt="${category.name}">
                </div>
            </td>
            <td>
                <span class="product-count-badge">${productCount} producto${productCount !== 1 ? 's' : ''}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" data-id="${category.id}" title="Editar categoría">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="delete-btn" data-id="${category.id}" data-type="category" title="Eliminar categoría">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Agregar eventos a los botones
    setupTableEvents(tableBody, 'category');
    updateCategoriesCount();
}

// Actualizar contador de categorías
function updateCategoriesCount() {
    const countElement = document.getElementById('categories-count');
    if (countElement) {
        const count = categories.length;
        countElement.textContent = `${count} categoría${count !== 1 ? 's' : ''}`;
    }
}

// Abrir modal para agregar/editar producto
function openProductModal(productId = null) {
    if (!productModal) return;
    
    const title = document.getElementById('product-modal-title');
    const productNameInput = document.getElementById('product-name');
    const productCategorySelect = document.getElementById('product-category');
    const productPriceInput = document.getElementById('product-price');
    const productOriginalPriceInput = document.getElementById('product-original-price');
    const productDescriptionInput = document.getElementById('product-description');
    const productIdInput = document.getElementById('product-id');
    
    if (!title || !productNameInput || !productCategorySelect || !productPriceInput || !productDescriptionInput || !productIdInput) {
        return;
    }
    
    // Resetear imágenes temporales
    productImages = [];
    renderProductImagesPreview();
    updateImageCounter();
    
    // Cargar categorías en el select
    productCategorySelect.innerHTML = '<option value="">Seleccione una categoría</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        productCategorySelect.appendChild(option);
    });
    
    if (productId) {
        // Modo edición
        title.innerHTML = '<i class="fas fa-edit"></i> Editar Producto';
        const product = products.find(p => p.id == productId);
        
        if (product) {
            productNameInput.value = product.name;
            productCategorySelect.value = product.category;
            productPriceInput.value = product.price;
            productOriginalPriceInput.value = product.originalPrice || '';
            productDescriptionInput.value = product.description;
            productIdInput.value = product.id;
            
            // Cargar imágenes existentes
            if (product.images && Array.isArray(product.images)) {
                product.images.forEach(image => {
                    productImages.push({
                        data: image,
                        name: 'Imagen existente'
                    });
                });
                renderProductImagesPreview();
                updateImageCounter();
            }
            
            // Actualizar contadores
            document.getElementById('product-name-chars').textContent = product.name.length;
            document.getElementById('product-desc-chars').textContent = product.description.length;
        }
    } else {
        // Modo agregar
        title.innerHTML = '<i class="fas fa-plus"></i> Agregar Producto';
        productNameInput.value = '';
        productCategorySelect.value = '';
        productPriceInput.value = '';
        productOriginalPriceInput.value = '';
        productDescriptionInput.value = '';
        productIdInput.value = '';
        
        // Resetear contadores
        document.getElementById('product-name-chars').textContent = '0';
        document.getElementById('product-desc-chars').textContent = '0';
    }
    
    openModal(productModal);
}

// Guardar producto
function saveProduct() {
    const productNameInput = document.getElementById('product-name');
    const productCategorySelect = document.getElementById('product-category');
    const productPriceInput = document.getElementById('product-price');
    const productOriginalPriceInput = document.getElementById('product-original-price');
    const productDescriptionInput = document.getElementById('product-description');
    const productIdInput = document.getElementById('product-id');
    
    if (!productNameInput || !productCategorySelect || !productPriceInput || !productDescriptionInput || !productIdInput) {
        showNotification('Error: No se encontraron todos los campos del formulario', 'error');
        return;
    }
    
    const name = productNameInput.value.trim();
    const category = productCategorySelect.value;
    const price = parseFloat(productPriceInput.value);
    const originalPrice = productOriginalPriceInput.value ? parseFloat(productOriginalPriceInput.value) : null;
    const description = productDescriptionInput.value.trim();
    const id = productIdInput.value;
    
    // Validaciones
    if (!name) {
        showNotification('Por favor, ingresa un nombre para el producto', 'error');
        productNameInput.focus();
        return;
    }
    
    if (!category) {
        showNotification('Por favor, selecciona una categoría', 'error');
        productCategorySelect.focus();
        return;
    }
    
    if (isNaN(price) || price <= 0) {
        showNotification('Por favor, ingresa un precio válido', 'error');
        productPriceInput.focus();
        return;
    }
    
    if (originalPrice && originalPrice <= price) {
        showNotification('El precio original debe ser mayor que el precio actual', 'error');
        productOriginalPriceInput.focus();
        return;
    }
    
    if (!description) {
        showNotification('Por favor, ingresa una descripción para el producto', 'error');
        productDescriptionInput.focus();
        return;
    }
    
    if (productImages.length === 0) {
        showNotification('Por favor, sube al menos una imagen para el producto', 'error');
        return;
    }
    
    // Extraer solo los datos de las imágenes
    const images = productImages.map(img => img.data);
    
    if (id) {
        // Editar producto existente
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            products[index].name = name;
            products[index].category = category;
            products[index].price = price;
            products[index].originalPrice = originalPrice;
            products[index].description = description;
            products[index].images = images;
        }
    } else {
        // Agregar nuevo producto
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({
            id: newId,
            name: name,
            category: category,
            price: price,
            originalPrice: originalPrice,
            description: description,
            images: images
        });
    }
    
    // Guardar en localStorage
    saveAllData();
    
    // Actualizar tabla
    renderProductsTable();
    
    // Cerrar modal y resetear
    closeModal(productModal);
    resetProductForm();
    
    // Mostrar notificación
    showNotification(id ? 'Producto actualizado exitosamente' : 'Producto agregado exitosamente');
}

// Resetear formulario de producto
function resetProductForm() {
    productImages = [];
    const productImagesUpload = document.getElementById('product-images-upload');
    if (productImagesUpload) productImagesUpload.value = '';
}

// Renderizar tabla de productos
function renderProductsTable() {
    const tableBody = document.getElementById('products-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (products.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <div class="empty-state">
                        <i class="fas fa-tshirt" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                        <h3>No hay productos</h3>
                        <p>Agrega tu primer producto para comenzar a vender</p>
                    </div>
                </td>
            </tr>
        `;
        updateProductsCount();
        return;
    }
    
    products.forEach(product => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>
                <div class="product-name-cell">
                    <strong>${product.name}</strong>
                    <small class="product-desc-preview">${product.description.substring(0, 50)}${product.description.length > 50 ? '...' : ''}</small>
                </div>
            </td>
            <td>
                <span class="category-badge">${product.category}</span>
            </td>
            <td>
                <div class="price-cell">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<small class="original-price">$${product.originalPrice.toFixed(2)}</small>` : ''}
                </div>
            </td>
            <td>
                <span class="stock-badge in-stock">En stock</span>
            </td>
            <td>
                <div class="image-gallery-preview">
                    <img src="${product.images[0]}" alt="${product.name}">
                    ${product.images.length > 1 ? `<span class="image-count">+${product.images.length - 1}</span>` : ''}
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" data-id="${product.id}" title="Editar producto">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="delete-btn" data-id="${product.id}" data-type="product" title="Eliminar producto">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Agregar eventos a los botones
    setupTableEvents(tableBody, 'product');
    updateProductsCount();
}

// Actualizar contador de productos
function updateProductsCount() {
    const countElement = document.getElementById('products-count');
    if (countElement) {
        const count = products.length;
        countElement.textContent = `${count} producto${count !== 1 ? 's' : ''}`;
    }
}

// Abrir modal para agregar/editar promoción
function openPromotionModal(promotionId = null) {
    if (!promotionModal) return;
    
    const title = document.getElementById('promotion-modal-title');
    const promotionTitleInput = document.getElementById('promotion-title');
    const promotionDescriptionInput = document.getElementById('promotion-description');
    const promotionActiveInput = document.getElementById('promotion-active');
    const promotionIdInput = document.getElementById('promotion-id');
    
    if (!title || !promotionTitleInput || !promotionDescriptionInput || !promotionActiveInput || !promotionIdInput) return;
    
    if (promotionId) {
        // Modo edición
        title.innerHTML = '<i class="fas fa-edit"></i> Editar Promoción';
        const promotion = promotions.find(p => p.id == promotionId);
        
        if (promotion) {
            promotionTitleInput.value = promotion.title;
            promotionDescriptionInput.value = promotion.description;
            promotionActiveInput.checked = promotion.active;
            promotionIdInput.value = promotion.id;
            
            // Actualizar contadores
            document.getElementById('promotion-title-chars').textContent = promotion.title.length;
            document.getElementById('promotion-desc-chars').textContent = promotion.description.length;
        }
    } else {
        // Modo agregar
        title.innerHTML = '<i class="fas fa-plus"></i> Agregar Promoción';
        promotionTitleInput.value = '';
        promotionDescriptionInput.value = '';
        promotionActiveInput.checked = true;
        promotionIdInput.value = '';
        
        // Resetear contadores
        document.getElementById('promotion-title-chars').textContent = '0';
        document.getElementById('promotion-desc-chars').textContent = '0';
    }
    
    openModal(promotionModal);
}

// Guardar promoción
function savePromotion() {
    const promotionTitleInput = document.getElementById('promotion-title');
    const promotionDescriptionInput = document.getElementById('promotion-description');
    const promotionActiveInput = document.getElementById('promotion-active');
    const promotionIdInput = document.getElementById('promotion-id');
    
    if (!promotionTitleInput || !promotionDescriptionInput || !promotionActiveInput || !promotionIdInput) {
        showNotification('Error: No se encontraron todos los campos del formulario', 'error');
        return;
    }
    
    const title = promotionTitleInput.value.trim();
    const description = promotionDescriptionInput.value.trim();
    const active = promotionActiveInput.checked;
    const id = promotionIdInput.value;
    
    // Validaciones
    if (!title) {
        showNotification('Por favor, ingresa un título para la promoción', 'error');
        promotionTitleInput.focus();
        return;
    }
    
    if (!description) {
        showNotification('Por favor, ingresa una descripción para la promoción', 'error');
        promotionDescriptionInput.focus();
        return;
    }
    
    if (id) {
        // Editar promoción existente
        const index = promotions.findIndex(p => p.id == id);
        if (index !== -1) {
            promotions[index].title = title;
            promotions[index].description = description;
            promotions[index].active = active;
        }
    } else {
        // Agregar nueva promoción
        const newId = promotions.length > 0 ? Math.max(...promotions.map(p => p.id)) + 1 : 1;
        promotions.push({
            id: newId,
            title: title,
            description: description,
            active: active
        });
    }
    
    // Guardar en localStorage
    saveAllData();
    
    // Actualizar vista
    renderPromotions();
    
    // Cerrar modal
    closeModal(promotionModal);
    resetPromotionForm();
    
    // Mostrar notificación
    showNotification(id ? 'Promoción actualizada exitosamente' : 'Promoción agregada exitosamente');
}

// Resetear formulario de promoción
function resetPromotionForm() {
    // No hay nada que resetear
}

// Renderizar promociones
function renderPromotions() {
    const container = document.getElementById('promotion-cards');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (promotions.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-percentage" style="font-size: 64px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No hay promociones</h3>
                <p>Crea promociones especiales para atraer más clientes</p>
            </div>
        `;
        updatePromotionsCount();
        return;
    }
    
    promotions.forEach(promotion => {
        const card = document.createElement('div');
        card.className = 'promotion-card';
        card.innerHTML = `
            <div class="promotion-header">
                <h3>${promotion.title}</h3>
                <span class="promotion-status ${promotion.active ? 'status-active' : 'status-inactive'}">
                    <i class="fas fa-circle"></i> ${promotion.active ? 'Activa' : 'Inactiva'}
                </span>
            </div>
            <p>${promotion.description}</p>
            <div class="promotion-actions">
                <div class="action-buttons">
                    <button class="edit-btn" data-id="${promotion.id}" data-type="promotion" title="Editar promoción">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" data-id="${promotion.id}" data-type="promotion" title="Eliminar promoción">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Agregar eventos a los botones
    setupCardEvents(container, 'promotion');
    updatePromotionsCount();
}

// Actualizar contador de promociones
function updatePromotionsCount() {
    const countElement = document.getElementById('promotions-count');
    if (countElement) {
        const activeCount = promotions.filter(p => p.active).length;
        const totalCount = promotions.length;
        countElement.textContent = `${totalCount} promoción${totalCount !== 1 ? 'es' : ''} (${activeCount} activa${activeCount !== 1 ? 's' : ''})`;
    }
}

// Abrir modal para agregar/editar slide
function openSlideModal(slideId = null) {
    if (!slideModal) return;
    
    const title = document.getElementById('slide-modal-title');
    const slideTitleInput = document.getElementById('slide-title');
    const slideDescriptionInput = document.getElementById('slide-description');
    const slideImagePreview = document.getElementById('slide-image-preview');
    const slideIdInput = document.getElementById('slide-id');
    
    if (!title || !slideTitleInput || !slideDescriptionInput || !slideImagePreview || !slideIdInput) return;
    
    if (slideId) {
        // Modo edición
        title.innerHTML = '<i class="fas fa-edit"></i> Editar Slide';
        const slide = heroSlides.find(s => s.id == slideId);
        
        if (slide) {
            slideTitleInput.value = slide.title;
            slideDescriptionInput.value = slide.description;
            slideImagePreview.src = slide.image;
            slideIdInput.value = slide.id;
            
            // Actualizar contadores
            document.getElementById('slide-title-chars').textContent = slide.title.length;
            document.getElementById('slide-desc-chars').textContent = slide.description.length;
        }
    } else {
        // Modo agregar
        title.innerHTML = '<i class="fas fa-plus"></i> Agregar Slide';
        slideTitleInput.value = '';
        slideDescriptionInput.value = '';
        slideImagePreview.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"%3E%3Crect width="300" height="150" fill="%23f0f0f0"/%3E%3Ctext x="150" y="75" font-family="Arial" font-size="16" text-anchor="middle" dominant-baseline="middle" fill="%23666"%3EVista previa%3C/text%3E%3C/svg%3E';
        slideIdInput.value = '';
        
        // Resetear contadores
        document.getElementById('slide-title-chars').textContent = '0';
        document.getElementById('slide-desc-chars').textContent = '0';
    }
    
    openModal(slideModal);
}

// Guardar slide
function saveSlide() {
    const slideTitleInput = document.getElementById('slide-title');
    const slideDescriptionInput = document.getElementById('slide-description');
    const slideImagePreview = document.getElementById('slide-image-preview');
    const slideIdInput = document.getElementById('slide-id');
    
    if (!slideTitleInput || !slideDescriptionInput || !slideImagePreview || !slideIdInput) {
        showNotification('Error: No se encontraron todos los campos del formulario', 'error');
        return;
    }
    
    const title = slideTitleInput.value.trim();
    const description = slideDescriptionInput.value.trim();
    const image = slideImagePreview.src;
    const id = slideIdInput.value;
    
    // Validaciones
    if (!title) {
        showNotification('Por favor, ingresa un título para el slide', 'error');
        slideTitleInput.focus();
        return;
    }
    
    if (!description) {
        showNotification('Por favor, ingresa una descripción para el slide', 'error');
        slideDescriptionInput.focus();
        return;
    }
    
    if (slideImagePreview.src.includes('Vista previa')) {
        showNotification('Por favor, sube una imagen para el slide', 'error');
        return;
    }
    
    if (id) {
        // Editar slide existente
        const index = heroSlides.findIndex(s => s.id == id);
        if (index !== -1) {
            heroSlides[index].title = title;
            heroSlides[index].description = description;
            heroSlides[index].image = image;
        }
    } else {
        // Agregar nuevo slide
        const newId = heroSlides.length > 0 ? Math.max(...heroSlides.map(s => s.id)) + 1 : 1;
        heroSlides.push({
            id: newId,
            title: title,
            description: description,
            image: image
        });
    }
    
    // Guardar en localStorage
    saveAllData();
    
    // Actualizar vista
    renderSlides();
    
    // Cerrar modal y resetear
    closeModal(slideModal);
    resetSlideForm();
    
    // Mostrar notificación
    showNotification(id ? 'Slide actualizado exitosamente' : 'Slide agregado exitosamente');
}

// Resetear formulario de slide
function resetSlideForm() {
    const slideImageUpload = document.getElementById('slide-image-upload');
    if (slideImageUpload) slideImageUpload.value = '';
}

// Renderizar slides
function renderSlides() {
    const container = document.getElementById('slide-cards');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (heroSlides.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-images" style="font-size: 64px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No hay slides</h3>
                <p>Agrega slides para mostrar en el banner principal de la tienda</p>
            </div>
        `;
        updateSlidesCount();
        return;
    }
    
    heroSlides.forEach(slide => {
        const card = document.createElement('div');
        card.className = 'slide-card';
        card.innerHTML = `
            <div class="slide-card-image">
                <img src="${slide.image}" alt="${slide.title}">
            </div>
            <div class="slide-card-content">
                <h3>${slide.title}</h3>
                <p>${slide.description}</p>
                <div class="slide-actions">
                    <div class="action-buttons">
                        <button class="edit-btn" data-id="${slide.id}" data-type="slide" title="Editar slide">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" data-id="${slide.id}" data-type="slide" title="Eliminar slide">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Agregar eventos a los botones
    setupCardEvents(container, 'slide');
    updateSlidesCount();
}

// Actualizar contador de slides
function updateSlidesCount() {
    const countElement = document.getElementById('slides-count');
    if (countElement) {
        const count = heroSlides.length;
        countElement.textContent = `${count} slide${count !== 1 ? 's' : ''}`;
    }
}

// Configurar eventos en tablas
function setupTableEvents(container, type) {
    container.addEventListener('click', function(e) {
        const target = e.target;
        const editBtn = target.closest('.edit-btn');
        const deleteBtn = target.closest('.delete-btn');
        
        if (editBtn) {
            const itemId = parseInt(editBtn.getAttribute('data-id'));
            if (type === 'category') {
                openCategoryModal(itemId);
            } else if (type === 'product') {
                openProductModal(itemId);
            }
        }
        
        if (deleteBtn) {
            const itemId = parseInt(deleteBtn.getAttribute('data-id'));
            const itemType = deleteBtn.getAttribute('data-type');
            showDeleteConfirmation(itemId, itemType);
        }
    });
}

// Configurar eventos en tarjetas
function setupCardEvents(container, type) {
    container.addEventListener('click', function(e) {
        const target = e.target;
        const editBtn = target.closest('.edit-btn');
        const deleteBtn = target.closest('.delete-btn');
        
        if (editBtn) {
            const itemId = parseInt(editBtn.getAttribute('data-id'));
            if (type === 'promotion') {
                openPromotionModal(itemId);
            } else if (type === 'slide') {
                openSlideModal(itemId);
            }
        }
        
        if (deleteBtn) {
            const itemId = parseInt(deleteBtn.getAttribute('data-id'));
            const itemType = deleteBtn.getAttribute('data-type');
            showDeleteConfirmation(itemId, itemType);
        }
    });
}

// Mostrar modal de confirmación para eliminar
function showDeleteConfirmation(itemId, itemType) {
    const confirmMessage = document.getElementById('confirm-message');
    const itemIdInput = document.getElementById('confirm-item-id');
    const itemTypeInput = document.getElementById('confirm-item-type');
    
    if (!confirmMessage || !itemIdInput || !itemTypeInput) return;
    
    let message = '';
    let itemName = '';
    
    // Obtener el nombre del item según el tipo
    switch (itemType) {
        case 'category':
            const category = categories.find(c => c.id == itemId);
            if (category) {
                itemName = category.name;
                message = `¿Está seguro de que desea eliminar la categoría "${itemName}"? Los productos asociados se marcarán como "Sin categoría".`;
            }
            break;
            
        case 'product':
            const product = products.find(p => p.id == itemId);
            if (product) {
                itemName = product.name;
                message = `¿Está seguro de que desea eliminar el producto "${itemName}"? Esta acción no se puede deshacer.`;
            }
            break;
            
        case 'promotion':
            const promotion = promotions.find(p => p.id == itemId);
            if (promotion) {
                itemName = promotion.title;
                message = `¿Está seguro de que desea eliminar la promoción "${itemName}"?`;
            }
            break;
            
        case 'slide':
            const slide = heroSlides.find(s => s.id == itemId);
            if (slide) {
                itemName = slide.title;
                message = `¿Está seguro de que desea eliminar el slide "${itemName}"?`;
            }
            break;
    }
    
    if (!message) {
        showNotification('Error: No se pudo encontrar el elemento', 'error');
        return;
    }
    
    confirmMessage.textContent = message;
    itemIdInput.value = itemId;
    itemTypeInput.value = itemType;
    
    openModal(confirmModal);
}

// Ejecutar eliminación
function executeDelete() {
    const itemId = parseInt(document.getElementById('confirm-item-id').value);
    const itemType = document.getElementById('confirm-item-type').value;
    
    if (!itemId || !itemType) {
        showNotification('Error: No se especificó el elemento a eliminar', 'error');
        return;
    }
    
    switch (itemType) {
        case 'category':
            deleteCategory(itemId);
            break;
            
        case 'product':
            deleteProduct(itemId);
            break;
            
        case 'promotion':
            deletePromotion(itemId);
            break;
            
        case 'slide':
            deleteSlide(itemId);
            break;
    }
    
    closeModal(confirmModal);
}

// Eliminar categoría
function deleteCategory(categoryId) {
    // Eliminar la categoría
    categories = categories.filter(c => c.id !== categoryId);
    
    // Actualizar productos que tenían esta categoría
    products.forEach(product => {
        if (product.categoryId == categoryId) {
            product.category = "Sin categoría";
        }
    });
    
    saveAllData();
    renderCategoriesTable();
    renderProductsTable();
    showNotification('Categoría eliminada exitosamente');
}

// Eliminar producto
function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    saveAllData();
    renderProductsTable();
    showNotification('Producto eliminado exitosamente');
}

// Eliminar promoción
function deletePromotion(promotionId) {
    promotions = promotions.filter(p => p.id !== promotionId);
    saveAllData();
    renderPromotions();
    showNotification('Promoción eliminada exitosamente');
}

// Eliminar slide
function deleteSlide(slideId) {
    heroSlides = heroSlides.filter(s => s.id !== slideId);
    saveAllData();
    renderSlides();
    showNotification('Slide eliminado exitosamente');
}

// Abrir modal
function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Cerrar modal
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    if (!notification) return;
    
    const notificationText = document.getElementById('notification-text');
    if (notificationText) {
        notificationText.textContent = message;
    }
    
    // Cambiar estilo según el tipo
    notification.className = 'admin-notification';
    
    if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff4444 0%, #ff6666 100%)';
        notification.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + notification.innerHTML;
    } else if (type === 'warning') {
        notification.style.background = 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)';
        notification.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + notification.innerHTML;
    } else {
        notification.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
        notification.innerHTML = '<i class="fas fa-check-circle"></i> ' + notification.innerHTML;
    }
    
    notification.classList.add('active');
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('active');
    }, 4000);
}

// Cargar datos de ejemplo si no hay datos
function loadSampleDataIfEmpty() {
    if (categories.length === 0) {
        categories = [
            { 
                id: 1, 
                name: "Ropa Deportiva", 
                image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            },
            { 
                id: 2, 
                name: "Zapatillas", 
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            },
            { 
                id: 3, 
                name: "Accesorios", 
                image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
            }
        ];
    }
    
    if (products.length === 0) {
        products = [
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
            }
        ];
    }
    
    if (heroSlides.length === 0) {
        heroSlides = [
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
    }
    
    saveAllData();
}

// Si no hay datos, cargar datos de ejemplo
if (categories.length === 0 && products.length === 0) {
    loadSampleDataIfEmpty();
}