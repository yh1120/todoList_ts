import { Itodo } from "components/todo/TodoService";
import React from "react";
import styled from "styled-components";
import TodoItem from "./item/TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

interface TodoListProps {
  todos: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  listState: string;
}

const TodoList = ({ toggleTodo, removeTodo, todos, listState }: TodoListProps) => {
  const sortedTodos = todos.slice();
  sortedTodos.sort((a: Itodo, b: Itodo): number => {
    const date1 = new Date(a.date).getTime();
    const date2 = new Date(b.date).getTime();
    return date1 > date2 ? 1 : -1;
  });
  return (
    <TodoListBlock>
      <div>{sortedTodos && listState === "all" && sortedTodos.map((todo) => <TodoItem toggleTodo={toggleTodo} removeTodo={removeTodo} key={todo.id} todo={todo} />)}</div>
      <div>{sortedTodos && listState === "progress" && sortedTodos.map((todo) => !todo.done && <TodoItem toggleTodo={toggleTodo} removeTodo={removeTodo} key={todo.id} todo={todo} />)}</div>
      <div>{sortedTodos && listState === "finish" && sortedTodos.map((todo) => todo.done && <TodoItem toggleTodo={toggleTodo} removeTodo={removeTodo} key={todo.id} todo={todo} />)}</div>
    </TodoListBlock>
  );
};

export default React.memo(TodoList);
