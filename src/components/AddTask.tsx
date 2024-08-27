import {FC, useState} from "react";
import {Button, Input, message} from "antd";
import {useAddTaskMutation} from "../store/Api/MocksApi/taskApiMocks.ts";

const AddTask: FC = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [addTask] = useAddTaskMutation()

  const handleSaveTask = () => {
    if (newTaskTitle.length === 0)
    {
      message.warning('Введите название задачи')
      return
    }
    if (newTaskTitle.length !== 0) {
      addTask({
        title: newTaskTitle,
        completed: false,
        favorite: false
      }).then(() => {message.success("Задача добавлена успешно!"); setIsAdding(false); setNewTaskTitle('')})
        .catch(() => message.error("Ошибка при добавлении задачи."))
    }
  }

  return (
    <>
      {isAdding && (
        <div className='tasklist-main__add-task-box'>
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Введите название задания"
          />
          <Button type='primary' onClick={handleSaveTask}>
            Сохранить
          </Button>
          <Button onClick={() => setIsAdding(false)} style={{marginLeft: '8px'}}>
            Отмена
          </Button>

        </div>
      )}
      <div className='tasklist-main__add-button-box'>
        <Button onClick={() => setIsAdding(true)} className='tasklist-main__add-button-box__button'>Добавить задание</Button>
      </div>
    </>
  )
}

export default AddTask;