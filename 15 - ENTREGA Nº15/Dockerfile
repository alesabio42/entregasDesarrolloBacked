# Usa una imagen base oficial de Node.js
FROM node:18.17.0

# Copia todos los archivos de tu proyecto al directorio de trabajo del contenedor
COPY . .

# Instala las dependencias de tu proyecto
RUN npm install

# Expone el puerto 8080, lo que indica que tu aplicación se ejecutará en este puerto
EXPOSE 8080

# Define el comando predeterminado para ejecutar cuando el contenedor se inicie
CMD ["npm", "run", "dev"]
