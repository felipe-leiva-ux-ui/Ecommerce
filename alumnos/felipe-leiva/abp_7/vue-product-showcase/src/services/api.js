import axios from "axios";

// Esta instancia centraliza la configuración base de todas las peticiones.
// Así evitamos repetir la URL en cada archivo.
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

export default api;
