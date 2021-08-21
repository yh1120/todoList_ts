import { useTodo } from "./TodoService";
import TodoTemplate from "./template/TodoTemplate";
import TodoHead from "./template/head/TodoHead";
import TodoList from "./template/list/TodoList";
import TodoCreate from "./template/create/TodoCreate";
import TodoFooter from "./template/footer/TodoFooter";
import { ReactElement } from "react";

const TodoContainer = (): ReactElement => {
  const { todoState, nextIdState, listState, incrementNextId, toggleTodo, removeTodo, createTodo, changeListState } = useTodo();

  return (
    <>
      <TodoTemplate>
        <TodoHead />
        <TodoCreate nextId={nextIdState} createTodo={createTodo} incrementNextId={incrementNextId} changeListState={changeListState} />
        <TodoList toggleTodo={toggleTodo} removeTodo={removeTodo} todos={todoState} listState={listState} />
        <TodoFooter todos={todoState} />
      </TodoTemplate>
    </>
  );
};

export default TodoContainer;
