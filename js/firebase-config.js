// firebase-config.js
// Configuración e inicialización de Firebase

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAP44JZQ8z6XQBxGLRGSvfoJ00ChZIzqT8",
  authDomain: "coquette-sport.firebaseapp.com",
  projectId: "coquette-sport",
  storageBucket: "coquette-sport.firebasestorage.app",
  messagingSenderId: "433999067952",
  appId: "1:433999067952:web:042000b97feff3e339e6f5"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);

// Inicializar servicios
const db = firebase.database();
const storage = firebase.storage();
const storageRef = storage.ref();

// Exportar referencias
const databaseRefs = {
  // Referencias principales
  store: db.ref('store'),
  categories: db.ref('categories'),
  products: db.ref('products'),
  promotions: db.ref('promotions'),
  slides: db.ref('slides'),
  
  // Métodos de ayuda
  getStoreData: () => db.ref('store').once('value'),
  getCategories: () => db.ref('categories').once('value'),
  getProducts: () => db.ref('products').once('value'),
  getPromotions: () => db.ref('promotions').once('value'),
  getSlides: () => db.ref('slides').once('value'),
  
  // Guardar datos
  saveStoreData: (data) => db.ref('store').set(data),
  saveCategory: (id, data) => db.ref('categories/' + id).set(data),
  saveProduct: (id, data) => db.ref('products/' + id).set(data),
  savePromotion: (id, data) => db.ref('promotions/' + id).set(data),
  saveSlide: (id, data) => db.ref('slides/' + id).set(data),
  
  // Eliminar datos
  deleteCategory: (id) => db.ref('categories/' + id).remove(),
  deleteProduct: (id) => db.ref('products/' + id).remove(),
  deletePromotion: (id) => db.ref('promotions/' + id).remove(),
  deleteSlide: (id) => db.ref('slides/' + id).remove()
};

// Exportar referencias de Storage
const storageFunctions = {
  // Subir imagen
  uploadImage: (file, path) => {
    return new Promise((resolve, reject) => {
      const uploadRef = storageRef.child(path + '/' + Date.now() + '_' + file.name);
      const uploadTask = uploadRef.put(file);
      
      uploadTask.on('state_changed',
        (snapshot) => {
          // Progreso de la subida
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Error
          reject(error);
        },
        () => {
          // Completado
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  },
  
  // Eliminar imagen
  deleteImage: (url) => {
    // Crear referencia desde la URL
    const imageRef = storage.refFromURL(url);
    return imageRef.delete();
  },
  
  // Referencias específicas
  productsRef: storageRef.child('products'),
  categoriesRef: storageRef.child('categories'),
  slidesRef: storageRef.child('slides'),
  storeRef: storageRef.child('store')
};

// Exportar todo
window.firebaseApp = app;
window.db = databaseRefs;
window.storageFunctions = storageFunctions;