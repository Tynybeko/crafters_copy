# Используем официальный образ Node.js в качестве базового образа
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если используется)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в рабочую директорию контейнера
COPY . .

# Собираем приложение
RUN npm run build

# Указываем порт, который будет использоваться приложением (значение по умолчанию 3000)
ENV PORT=$PORT
EXPOSE $PORT

# Команда для запуска приложения
CMD ["npm", "start"]
