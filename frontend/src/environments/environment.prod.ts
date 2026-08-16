// Wird nur für Produktions-Builds (ng build --configuration production)
// verwendet (siehe angular.json -> fileReplacements).
//
// Backend läuft auf Azure App Service. Falls die Web App neu erstellt wird,
// ändert sich der zufällige Hostname-Suffix -- dann hier aktualisieren und in
// backend/src/main/java/.../config/CorsConfig.java die passende
// Frontend-Domain über die Umgebungsvariable CORS_ALLOWED_ORIGINS erlauben.
export const environment = {
  apiUrl:
    'https://emre-portfolio-backend-decpfahteubhgraz.canadacentral-01.azurewebsites.net/api',
};
