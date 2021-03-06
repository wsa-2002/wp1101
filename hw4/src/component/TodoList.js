import React, { Component } from "react";
import Todo from "./Todo";

class TodoList extends Component {
  render() {
    let todos = this.props.todos;
    let check_box_func = this.props.clickCheckbox;
    let x_func = this.props.click_x;
    let filter = this.props.filter;
    let all_count = this.props.all_count;
    if (all_count === 0) return null;
    return (
      <ul className="todo-app__list" id="todo-list">
        {todos.map((item) => (
          <Todo
            key={item.id}
            index={item.id}
            item={item.content}
            isDeleted={item.isDeleted}
            isCompleted={item.isCompleted}
            check_box_func={check_box_func}
            x_func={x_func}
            filter={filter}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;
