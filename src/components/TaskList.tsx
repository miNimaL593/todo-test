import {FC} from "react";
import {Task} from "../mocks/type.ts";
import TaskItem from "./TaskItem.tsx";
import {List, message} from "antd";
import {useRemoveTaskMutation, useUpdateTaskMutation} from "../store/Api/taskApi.ts";

type TaskListProps = {
  tasks: Task[];
  filter: 'all' | 'completed' | 'uncompleted' | 'favorite';
}

const TaskList: FC<TaskListProps> = ({
  filter,
  tasks,
}) => {

  const [removeTask] = useRemoveTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const onTaskUpdate = (id: number, data: Partial<Pick<Task, 'favorite' | 'title' | 'completed'>>): Promise<boolean | void> => {
    return updateTask({
      id: id,
      updates: data
    }).then(() => message.success("Задача успешно обновлена!"))
      .catch(() => message.error('Ошибка при обновлении задачи.'));
  }

  const onTaskDelete = (id: number): Promise<boolean> => {
    return removeTask(id)
      .then(() => message.success("Задача у спешно удалена."))
      .catch(() => message.error("Ошибка при удалении задачи."))
  }

  return (
    <List
      dataSource={tasks.filter((task) => {
        switch (filter) {
          case "all":
            return true;
          case "completed":
            return task.completed;
          case "uncompleted":
            return !task.completed;
          case "favorite":
            return task.favorite;
        }
      })}
      renderItem={(item) => (<TaskItem item={item} onUpdate={onTaskUpdate} onDelete={onTaskDelete} />)}
    />
  )
}

export default TaskList;