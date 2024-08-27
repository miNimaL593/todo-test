import {db} from './db.ts';
import todos from './todos.json' assert { type: 'json' }
import {Task} from "./type.ts";
import {generateId} from "./functions.ts";


function startDatabaseMigration() {

  if(db.todo.count() > 0) {
    return;
  }

  (todos as Task[]).forEach((todo) => {
    db.todo.create({
      ...todo,
      id: generateId('todo'),
      favorite: false
    })
  })
}

export {
  startDatabaseMigration
}