// firebase-config.js
// Configuración e inicialización de Firebase

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAP44JZQ8z6XQBxGLRGSvfoJ00ChZIzqT8",
  authDomain: "coquette-sport.firebaseapp.com",
  databaseURL: "https://coquette-sport-default-rtdb.firebaseio.com", // ¡AGREGA ESTA LÍNEA!
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

// Exportar referencias CORREGIDAS para coincidir con tu estructura
const databaseRefs = {
  // Referencias principales (ajustadas a tu estructura)
  store: db.ref('tienda'),  // Cambiado de 'store' a 'tienda'
  categories: db.ref('categorias'),
  products: db.ref('productos'),
  promotions: db.ref('promociones'),  // Cambiado de 'promotions' a 'promociones'
  slides: db.ref('slides'),
  
  // Métodos de ayuda
  getStoreData: () => db.ref('tienda').once('value'),  // Cambiado
  getCategories: () => db.ref('categorias').once('value'),
  getProducts: () => db.ref('productos').once('value'),
  getPromotions: () => db.ref('promociones').once('value'),  // Cambiado
  getSlides: () => db.ref('slides').once('value'),
  
  // Guardar datos
  saveStoreData: (data) => db.ref('tienda').set(data),  // Cambiado
  saveCategory: (id, data) => db.ref('categorias/' + id).set(data),
  saveProduct: (id, data) => db.ref('productos/' + id).set(data),
  savePromotion: (id, data) => db.ref('promociones/' + id).set(data),  // Cambiado
  saveSlide: (id, data) => db.ref('slides/' + id).set(data),
  
  // Eliminar datos
  deleteCategory: (id) => db.ref('categorias/' + id).remove(),
  deleteProduct: (id) => db.ref('productos/' + id).remove(),
  deletePromotion: (id) => db.ref('promociones/' + id).remove(),  // Cambiado
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
  productsRef: storageRef.child('productos'),
  categoriesRef: storageRef.child('categorias'),
  slidesRef: storageRef.child('slides'),
  storeRef: storageRef.child('tienda')
};

// Exportar todo
window.firebaseApp = app;
window.db = databaseRefs;
window.storageFunctions = storageFunctions;