import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  date: string;
};

let initialTodos: Itodo[] = [];

interface UseTodoReturn {
  todoState: Itodo[];
  nextIdState: number;
  incrementNextId: () => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  createTodo: (todo: Itodo) => void;
}

export const useTodo = (): UseTodoReturn => {
  const [todoState, setTodoState] = useState(initialTodos);
  let nextIdState = 0;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    nextIdState = nextIdState + 1;
  };

  const toggleTodo = (id: number) => {
    //@TODO
    setTodoState((prevState) =>
      prevState.map((state: Itodo) => {
        if (state.id === id) {
          state.done = !state.done;
        }
        return state;
      })
    );
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) => prevState.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo) => {
    const nextId = (todoState.length ? todoState[todoState.length - 1].id : 0) + 1;
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId,
      })
    );
  };

  const loadData = () => {
    let data = localStorage.getItem("todos");
    if (data === undefined) data = "";
    initialTodos = JSON.parse(data!);
    if (initialTodos && initialTodos.length >= 1) {
      incrementNextId();
    }
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
  };
};
