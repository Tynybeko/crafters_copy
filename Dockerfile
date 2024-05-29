# Используем официальный образ Node.js в качестве базового
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Сборка приложения
RUN npm run build

# Указываем порт, который будет прослушивать приложение
EXPOSE ${PORT}

# Запуск приложения
CMD ["npm", "start"]
