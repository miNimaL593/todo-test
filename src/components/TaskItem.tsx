import {FC, useState} from "react";
import {Input, List} from "antd";
import {CheckCircleOutlined, DeleteTwoTone, EditTwoTone, HeartTwoTone, SaveTwoTone} from "@ant-design/icons";
import {Task} from "../mocks/type.ts";

type TaskItemProps = {
  item: Task,
  onUpdate: (id: number, data: Partial<Pick<Task, 'favorite' | 'title' | 'completed'>>) => Promise<boolean | void>
  onDelete: (id: number) => Promise<boolean>
}

const TaskItem: FC<TaskItemProps> = ({
                                       item,
                                       onUpdate,
                                       onDelete,
                                     }) => {

  const [edit, setEdit] = useState<boolean>(false)
  const [editedTitle, setEditedTitle] = useState<string>(item.title)

  const handleSaveEdit = (data: Partial<Task>) => {
    void onUpdate(item.id, data);
    setEdit(false)
  }

  return (
    <List.Item className='tasklist-main__list-box__item-box' key={item.id}>
      <div className='tasklist-main__list-box__item-box__item'>
        <div className='tasklist-main__list-box__item-box__item__title'>
          { edit ? (
            <div data-testid="title-with-edit" className='tasklist-main__list-box__item-box__item__title__input-box'>
              <Input
                data-testid="title-input"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onPressEnter={() => handleSaveEdit({ title: editedTitle })}
              />
            </div>
          ) : (
            <div data-testid="title-without-edit" className='tasklist-main__list-box__item-box__item__title'>
              {item.title}
            </div>
          )}
        </div>
        <div className='tasklist-main__list-box__item-box__item__icons-box'>
                 <span onClick={() => onUpdate(item.id, { favorite: !item.favorite})} className='tasklist-main__list-box__item-box__item__icons-box__icon' style={{ cursor: 'pointer' }}>
                      <HeartTwoTone data-testid="heart" twoToneColor={item.favorite ? 'green' : undefined} />
                 </span>
          {edit ? (
            <SaveTwoTone data-testid="save-button" className='tasklist-main__list-box__item-box__item__icons-box__icon' onClick={() => handleSaveEdit({ title: editedTitle })} />
          ) : (
            <EditTwoTone data-testid="edit-button" className='tasklist-main__list-box__item-box__item__icons-box__icon' onClick={() => setEdit(true)} />
          )}
          <CheckCircleOutlined
            data-testid="check"
            onClick={() => onUpdate(item.id, {
              completed: !item.completed
            })}
            style={{
              color: item.completed ? 'green' : '#1677ff', // Заливка
              borderColor: item.completed ? 'white' : '#1677ff', // Цвет линии
              borderWidth: item.completed ? '2px' : '0', // Ширина линии
            }}
            className='tasklist-main__list-box__item-box__item__icons-box__icon' />
          <DeleteTwoTone
            data-testid="delete"
            className='tasklist-main__list-box__item-box__item__icons-box__icon'
            onClick={() => onDelete(item.id)}
          />
        </div>
      </div>
    </List.Item>
  );
}

export default TaskItem;