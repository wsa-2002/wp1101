import "./App.css";
// import update from "react-addons-update";
import React, { Component } from "react";
import TodoList from "../component/TodoList.js";
import Footer from "../component/Footer.js";

let total_count = 0; // how many todos are not completed & deleted
let all_count = 0; // how many todos are not deleted
class todo extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], todoText: "", filter: "All" };
    this.id = 0;
  }
  handleChange = (event) => {
    const { todos } = this.state;
    if (event.key === "Enter" && event.target.value !== "") {
      this.setState(
        {
          todos: [
            ...todos,
            {
              id: this.id,
              isCompleted: false,
              isDeleted: false,
              content: event.target.value,
            },
          ],
          todoText: event.target.value,
        }
        // () => console.log(this.state)
      );
      this.id++;
      total_count++;
      all_count++;
      event.target.value = null;
    }
  };
  click_checkbox = (i) => {
    if (this.state.todos[i].isCompleted === true) {
      total_count++;
      let todos = this.state.todos;
      let temptodos = [];
      for (let index = 0; index < todos.length; index++) {
        if (index === parseInt(i)) {
          temptodos.push({
            id: todos[index].id,
            isCompleted: false,
            isDeleted: todos[index].isDeleted,
            content: todos[index].content,
          });
        } else {
          temptodos.push(todos[index]);
        }
      }
      this.setState({
        todos: temptodos,
      });
    } else {
      total_count--;
      let todos = this.state.todos;
      let temptodos = [];
      for (let index = 0; index < todos.length; index++) {
        if (index === parseInt(i)) {
          temptodos.push({
            id: todos[index].id,
            isCompleted: true,
            isDeleted: todos[index].isDeleted,
            content: todos[index].content,
          });
        } else {
          temptodos.push(todos[index]);
        }
      }
      this.setState({
        todos: temptodos,
      });
    }
    let word = document.getElementById(i + "detail");
    if (this.state.todos[i].isCompleted === false) {
      word.classList.add("checked");
    } else {
      word.classList.remove("checked");
    }
  };
  click_x = (i) => {
    all_count--;
    if (this.state.todos[i].isCompleted === false) {
      total_count--;
    }
    let todos = this.state.todos;
    let temptodos = [];
    for (let index = 0; index < todos.length; index++) {
      if (index === parseInt(i)) {
        temptodos.push({
          id: todos[i].id,
          isCompleted: todos[i].isCompleted,
          isDeleted: true,
          content: todos[i].content,
        });
      } else {
        temptodos.push(todos[i]);
      }
    }
    this.setState({
      todos: temptodos,
    });
  };
  click_all = () => {
    this.setState({
      filter: "ALL",
    });
  };
  click_complete = () => {
    this.setState({
      filter: "Completed",
    });
  };
  click_active = () => {
    this.setState({
      filter: "Active",
    });
  };
  click_clear_complete = () => {
    let tempTodo = [];
    let todos = this.state.todos;
    for (let i = 0; i < this.state.todos.length; i++) {
      if (todos[i].isCompleted === true) {
        if (todos[i].isDeleted === false) all_count--;
        tempTodo.push({
          id: todos[i].id,
          isCompleted: todos[i].isCompleted,
          isDeleted: true,
          content: todos[i].content,
        });
      } else {
        tempTodo.push({
          id: todos[i].id,
          isCompleted: todos[i].isCompleted,
          isDeleted: todos[i].isDeleted,
          content: todos[i].content,
        });
      }
      this.setState({
        todos: tempTodo,
      });
    }
  };
  render() {
    return (
      <div className="App">
        <div id="root" className="todo-app__root">
          <header className="todo-app__header">
            <h1 className="todo-app__title">todos</h1>
          </header>
          <section className="todo-app__main" id="main">
            <input
              className="todo-app__input"
              placeholder="What needs to be done?"
              onKeyPress={this.handleChange}
            />
            <TodoList
              todos={this.state.todos}
              filter={this.state.filter}
              clickCheckbox={this.click_checkbox}
              click_x={this.click_x}
              all_count={all_count}
            />
          </section>
          <Footer
            total_count={total_count}
            all_count={all_count}
            click_all={this.click_all}
            click_active={this.click_active}
            click_complete={this.click_complete}
            click_clear_complete={this.click_clear_complete}
          ></Footer>
        </div>
      </div>
    );
  }
}

export default todo;
