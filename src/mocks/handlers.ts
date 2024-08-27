import {db} from "./db.ts";
import {HttpResponse, http, HttpResponseResolver} from 'msw';
import {Task} from "./type.ts";
import {HttpStatus} from "./HttpStatus.ts";
import {isIdCounterExists, setMaxId} from "./functions.ts";

const getTasksResolver: HttpResponseResolver = ({ request }) => {

const url = new URL(request.url);

  const limit = url.searchParams.get('_limit');
  const offset = url.searchParams.get('_offset');

  // Если в параметр передано некорректное значение, например строка, то Number(limit) вернет NaN
  // если это так, то для смещения возвращаем undefined
  // В противном случае мы получим валидную цифру.

  if (limit === null && offset === null) {
    return HttpResponse.json(db.todo.getAll())
  }

  const take = Number.isNaN(Number(limit)) ? undefined : Number(limit);
  const skip = Number.isNaN(Number(offset)) ? undefined : Number(offset);

  const todos = db.todo.findMany({
    take,
    skip,
  })

  return HttpResponse.json(todos, { status: HttpStatus.OK })
}

const createTaskResolver: HttpResponseResolver<never, Task> = async ({ request }) => {
  const data = await request.json();

  if (!isIdCounterExists('todo')) {
    const [lastTodo] = db.todo.findMany({
      orderBy: {
        id: "desc"
      },
      take: 1
    })

    setMaxId('todo', lastTodo.id);
  }

  const res = db.todo.create({...data});

  return HttpResponse.json({
    id: res.id
  }, { status: 201});
}

const deleteTaskResolver: HttpResponseResolver<{id: string}> = async ({ params }) => {
  const { id } = params;

  db.todo.delete({
    where: {
      id: {
        equals: Number(id)
      }
    }
  })

  return HttpResponse.json(void 0, { status: HttpStatus.NO_CONTENT })
}

const updateTaskResolver: HttpResponseResolver<{id: string}, Task> = async ({ params, request }) => {
  const data = await request.json();
  const { id } = params;

  const todo = db.todo.update({
    where: {
      id: {
        equals: Number(id)
      }
    },
    data: {
      ...data
    }
  })

  return HttpResponse.json(todo, { status: HttpStatus.OK })
}

// request resolver

export const handlers = [
  http.get('/api/tasks', getTasksResolver),
  http.post('/api/tasks', createTaskResolver),
  http.delete('/api/tasks/:id', deleteTaskResolver),
  http.put('/api/tasks/:id', updateTaskResolver),
];