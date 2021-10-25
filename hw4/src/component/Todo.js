import React, { Component } from "react";
import item_x from "../img/x.png";

class Todo extends Component {
  render() {
    if (this.props.isDeleted === true) return null;
    if (this.props.filter === "Completed" && this.props.isCompleted === false)
      return null;
    if (this.props.filter === "Active" && this.props.isCompleted === true)
      return null;
    return (
      <li className="todo-app__item">
        <div className="todo-app__checkbox">
          <input
            id={this.props.index + this.props.item}
            type="checkbox"
            defaultChecked={this.props.isCompleted}
            onClick={() =>
              this.props.check_box_func(this.props.index, this.props.item)
            }
          />
          <label htmlFor={this.props.index + this.props.item} />
        </div>
        {this.props.isCompleted ? (
          <h1
            className="todo-app__detail checked"
            id={this.props.index + "detail"}
          >
            {this.props.item}
          </h1>
        ) : (
          <h1 className="todo-app__detail" id={this.props.index + "detail"}>
            {this.props.item}
          </h1>
        )}
        <img
          src={item_x}
          alt="delete"
          className="todo-app__item-x"
          onClick={() => this.props.x_func(this.props.index)}
        />
      </li>
    );
  }
}

export default Todo;
