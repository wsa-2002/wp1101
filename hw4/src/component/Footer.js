import React, { Component } from "react";

class Footer extends Component {
  render() {
    let not_deleted_count = this.props.all_count;
    let not_complete_count = this.props.total_count;
    let click_all = this.props.click_all;
    let click_active = this.props.click_active;
    let click_complete = this.props.click_complete;
    let click_clear = this.props.click_clear_complete;
    if (not_deleted_count === 0) return null;
    let clear = (
      <div className="todo-app__clean hidden">
        <button id="clear_complete" onClick={() => click_clear()}>
          Clear completed
        </button>
      </div>
    );
    if (not_deleted_count > not_complete_count) {
      clear = (
        <div className="todo-app__clean">
          <button id="clear_complete" onClick={() => click_clear()}>
            Clear completed
          </button>
        </div>
      );
    }
    return (
      <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">{not_complete_count} left</div>
        <ul className="todo-app__view-buttons">
          <button id="All" onClick={() => click_all()}>
            All
          </button>
          <button id="Active" onClick={() => click_active()}>
            Active
          </button>
          <button id="Completed" onClick={() => click_complete()}>
            Completed
          </button>
        </ul>
        {clear}
      </footer>
    );
  }
}

export default Footer;
