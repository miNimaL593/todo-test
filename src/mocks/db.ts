import { factory, primaryKey, persist } from '@mswjs/data';
import {generateId} from "./functions.ts";

// Создаем базу данных с одной сущностью 'todo'
export const db = factory({
  todo: {
    id: primaryKey(() => {
      return generateId('todo')
    }),  // Идентификатор задачи
    userId: Number,          // Идентификатор пользователя
    title: String,           // Название задачи
    completed: Boolean,     // Завершена ли задача
    favorite: Boolean,      // Помечена ли задача как избранная
  }
});

// Инициализируем сохранение данных в localStorage
persist(db, {
  storage: localStorage,    // Используем localStorage для сохранения
  keyPrefix: "todo-sputnik" // Префикс для ключей в localStorage
});
