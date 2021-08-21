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
  listState: string;
  incrementNextId: () => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  createTodo: (todo: Itodo) => void;
  changeListState: (state: string) => void;
}

export const useTodo = (): UseTodoReturn => {
  const [todoState, setTodoState] = useState(initialTodos);
  const [listState, setListState] = useState("all");
  let nextIdState = 0;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const changeListState = (state: string) => {
    setListState(state);
  };

  const incrementNextId = () => {
    nextIdState = nextIdState + 1;
  };

  const toggleTodo = (id: number) => {
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
    const data = localStorage.getItem("todos");
    if (data) {
      initialTodos = JSON.parse(data);
    }
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
    listState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
    changeListState,
  };
};
