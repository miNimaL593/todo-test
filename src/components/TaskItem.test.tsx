import {test, expect, describe, vi} from 'vitest'
import TaskItem from "./TaskItem.tsx";
import {fireEvent, render, screen} from "@testing-library/react";

describe("TaskItem testing", () => {
  test('simple render', () => {
    render(<TaskItem
      item={{
        title: "title",
        favorite: true,
        completed: false,
        id: 22,
        userId: 1
      }}
      onUpdate={() => Promise.resolve()}
      onDelete={() => Promise.resolve(true)}
    />);

    expect(screen.getByTestId('title-without-edit')).toBeDefined()
    expect(screen.getByTestId('edit-button')).toBeDefined()

    expect(screen.queryByTestId('save-button')).toBeNull()
    expect(screen.queryByTestId('title-with-edit')).toBeNull()

    expect(screen.getByTestId("heart")).toBeDefined()
    expect(screen.getByTestId("check")).toBeDefined()
    expect(screen.getByTestId("delete")).toBeDefined()
  });

  test('right render with text: [Какой-то текст.]', () => {
    const title = "Какой-то текст.";
    render(<TaskItem
      item={{
        title,
        favorite: true,
        completed: false,
        id: 22,
        userId: 1
      }}
      onUpdate={() => Promise.resolve()}
      onDelete={() => Promise.resolve(true)}
    />);

    expect(screen.getByTestId('title-without-edit').textContent).toBe(title)
  })

  test('right render with right params: favorite, not completed', () => {
    render(<TaskItem
      item={{
        title: 'title',
        favorite: true,
        completed: false,
        id: 22,
        userId: 1
      }}
      onUpdate={() => Promise.resolve()}
      onDelete={() => Promise.resolve(true)}
    />);

    expect(screen.getByTestId('heart').querySelector('[fill="green"]')).toBeTruthy()
    expect(screen.getByTestId('check').style.borderColor).toBe('#1677ff')
  })

  test('right render with right params: not favorite, completed', () => {
    render(<TaskItem
      item={{
        title: 'title',
        favorite: false,
        completed: true,
        id: 22,
        userId: 1
      }}
      onUpdate={() => Promise.resolve()}
      onDelete={() => Promise.resolve(true)}
    />);

    expect(screen.getByTestId('heart').querySelector('[fill="currentColor"]')).toBeTruthy()
    expect(screen.getByTestId('check').style.color).toBe('green')
  })

  test('edit task', () => {
    const newTitle = "new title";
    const item = {
      title: "title",
      favorite: false,
      completed: true,
      id: 22,
      userId: 1
    }

    const mockOnUpdate = vi.fn(() => Promise.resolve());

    const {rerender} = render(<TaskItem
      item={item}
      onUpdate={mockOnUpdate}
      onDelete={() => Promise.resolve(true)}
    />);

    expect(screen.queryByTestId('save-button')).toBeNull()

    fireEvent.click(screen.getByTestId('edit-button'))

    expect(screen.queryByTestId('save-button')).toBeTruthy()


    const input = screen.getByTestId<HTMLInputElement>('title-input');
    expect(input).toBeTruthy();

    fireEvent.change(input, { target: { value: newTitle} })
    expect(input.value).toBe(newTitle)

    fireEvent.click(screen.getByTestId('save-button'))
    expect(mockOnUpdate).toBeCalledWith(item.id, {title: newTitle})
    expect(screen.queryByTestId('save-button')).toBeNull()

    item.title = newTitle;
    rerender(<TaskItem
      item={item}
      onUpdate={mockOnUpdate}
      onDelete={() => Promise.resolve(true)}
    />)

    expect(screen.queryByTestId('title-without-edit')?.textContent).toBe(item.title)
  })

  test('add to/remove from favorite', () => {
    const item = {
      title: "title",
      favorite: false,
      completed: false,
      id: 22,
      userId: 1
    }
    const mockOnUpdate = vi.fn(() => Promise.resolve());

    const {rerender} = render(<TaskItem
      item={item}
      onUpdate={mockOnUpdate}
      onDelete={() => Promise.resolve(true)}
    />);

    const heart = screen.getByTestId('heart');

    expect(heart).toBeTruthy();

    fireEvent.click(heart);
    expect(mockOnUpdate).toBeCalledWith(item.id, {favorite: true})
    item.favorite = true;

    rerender(<TaskItem
      item={item}
      onUpdate={mockOnUpdate}
      onDelete={() => Promise.resolve(true)}
    />)

    expect(heart.querySelector('[fill="green"]')).toBeTruthy()

    fireEvent.click(heart);
    expect(mockOnUpdate).toBeCalledWith(item.id, {favorite: false})
    item.favorite = false;

    rerender(<TaskItem
      item={item}
      onUpdate={mockOnUpdate}
      onDelete={() => Promise.resolve(true)}
    />)

    expect(heart.querySelector('[fill="currentColor"]')).toBeTruthy()
  })

  test('check/uncheck task', () => {
    const item = {
      title: "title",
      favorite: false,
      completed: false,
      id: 22,
      userId: 1
    }
    const mockOnUpdate = vi.fn(() => Promise.resolve());

    const {rerender} = render(<TaskItem
      item={item}
      onUpdate={mockOnUpdate}
      onDelete={() => Promise.resolve(true)}
    />);

    const check = screen.getByTestId('check');

    expect(check).toBeTruthy();

    fireEvent.click(check);
    expect(mockOnUpdate).toBeCalledWith(item.id, {completed: true})
    item.completed = true;

    rerender(<TaskItem
      item={item}
      onUpdate={mockOnUpdate}
      onDelete={() => Promise.resolve(true)}
    />)

    expect(check.style.color).toBe('green');

    fireEvent.click(check);
    expect(mockOnUpdate).toBeCalledWith(item.id, {completed: false})
    item.completed = false;

    rerender(<TaskItem
      item={item}
      onUpdate={mockOnUpdate}
      onDelete={() => Promise.resolve(true)}
    />)

    expect(check.style.borderColor).toBe('#1677ff')
  })

  test('delete task', () => {
    const item = {
      title: "title",
      favorite: false,
      completed: false,
      id: 22,
      userId: 1
    }
    const mockOnDelete = vi.fn(() => Promise.resolve(true));

    render(<TaskItem
      item={item}
      onUpdate={() => Promise.resolve()}
      onDelete={mockOnDelete}
    />)

    const deleteBtn = screen.getByTestId('delete');

    expect(deleteBtn).toBeTruthy();
    fireEvent.click(deleteBtn);
    expect(mockOnDelete).toBeCalledWith(item.id)
  })
})

