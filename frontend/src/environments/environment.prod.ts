// Wird nur für Produktions-Builds (ng build --configuration production)
// verwendet (siehe angular.json -> fileReplacements).
//
// TODO vor dem echten Go-Live: apiUrl auf die tatsächliche Backend-Domain
// setzen (z. B. 'https://api.emrekilic.dev/api') und in
// backend/src/main/java/.../config/CorsConfig.java die passende
// Frontend-Domain über die Umgebungsvariable CORS_ALLOWED_ORIGINS erlauben.
export const environment = {
  apiUrl: 'http://localhost:8080/api',
};
