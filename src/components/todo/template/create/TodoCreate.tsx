import React, { useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import { Select, Modal, Button, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 16px;
  padding-right: 60px;
  padding-bottom: 16px;
`;

const SelectForm = styled.div`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-right: 60px;
  padding-bottom: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 75%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
  changeListState: (state: string) => void;
}

const TodoCreate = ({ nextId, createTodo, incrementNextId, changeListState }: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [date, setDate] = useState(moment(new Date()));
  const [dateString, setDateString] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const handleToggle = () => {
    !value && setOpen(!open);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      createTodo({
        id: nextId,
        text: value,
        done: false,
        date: dateString,
      });
      incrementNextId();
      setValue("");
      setOpen(false);
    }
  };

  const handleDate = (value: moment.Moment | null, valueString: string): void => {
    if (value) {
      setDate(value);
      setDateString(valueString);
    }
  };

  const handleChangeList = (value: string) => {
    changeListState(value);
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input autoFocus placeholder="What's need to be done?" onChange={handleChange} value={value} />
          <DatePicker onChange={handleDate} value={date} />
          <CircleButton onClick={handleToggle} open={open}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
        <SelectForm>
          <Select defaultValue="all" style={{ width: 100 }} onChange={handleChangeList}>
            <Option value="all">전체 목록</Option>
            <Option value="progress">진행 목록</Option>
            <Option value="finish">완료 목록</Option>
          </Select>
        </SelectForm>
      </InsertFormPositioner>
      <Modal
        title="Error"
        visible={open}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <p>할 일을 기록해주세요.</p>
      </Modal>
    </>
  );
};

export default React.memo(TodoCreate);
