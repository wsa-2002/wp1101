todo_list = [];
todo_count = 0;
class element {
  constructor(id, class_name, tag) {
    this.node = document.createElement(tag);
    this.node.setAttribute("id", id);
    this.node.setAttribute("class", class_name);
  }
  get element() {
    return this.node;
  }
}

class button {
  constructor(id, content) {
    this.node = document.createElement("button");
    this.node.setAttribute("id", id);
    this.node.innerHTML = content;
  }
  get button() {
    return this.node;
  }
}

function clear_completed_item() {
  for (let i = 0; i < todo_list.length; i++) {
    if (todo_list[i][2] === true) {
      todo_list[i][3] = true;
    }
  }
  refresh_todo_list();
  if (set_list() === true) {
    let footer = document.getElementById("todo-footer");
    let todolist = document.getElementById("todo-list");
    root.removeChild(footer);
    main.removeChild(todolist);
  }
}

function tryfunc(ele) {
  if (event.key === "Enter") {
    if (set_list() === true) {
      main = document.getElementById("main");
      if (!document.getElementById("todo-list")) {
        todoListNode = document.createElement("ul");
        todoListNode.setAttribute("class", "todo-app__list");
        todoListNode.setAttribute("id", "todo-list");
        main.appendChild(todoListNode);

        root = document.getElementById("root");
        footerNode = document.createElement("footer");
        footerNode.setAttribute("class", "todo-app__footer");
        footerNode.setAttribute("id", "todo-footer");
        root.appendChild(footerNode);
      }
      if (!document.getElementById("todo-footer")) {
        footerNode = document.createElement("footer");
        footerNode.setAttribute("class", "todo-app__footer");
        footerNode.setAttribute("id", "todo-footer");
        root.appendChild(footerNode);
      }
    }
    todo_list.push([todo_list.length, ele.value, false, false]); // id, value, is_checked, is_deleted
    todo_count++;
    refresh_todo_list();
    event.key = null;
  }
}

function refresh_todo_list() {
  list = document.getElementById("todo-list");
  footer = document.getElementById("todo-footer");
  list.innerHTML = "";
  for (let i = 0; i < todo_list.length; i++) {
    if (todo_list[i][3] === true) continue;
    newChild = new element(`list${i}`, "todo-app__item", "li").element;
    child_div = new element(`${i}-child-div`, "todo-app__checkbox", "div")
      .element;

    checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `${todo_list[i][0]}-checkbox`);

    label = document.createElement("label");
    label.setAttribute("for", `${todo_list[i][0]}-checkbox`);

    child_div.appendChild(checkbox);
    child_div.appendChild(label);

    child_h1 = document.createElement("h1");
    child_h1.setAttribute("class", "todo-app__item-detail");
    child_h1.setAttribute("id", `${todo_list[i][0]}-h1`);
    child_h1.innerHTML = String(todo_list[i][1]);

    checkbox.addEventListener("click", function () {
      word = document.getElementById(`${todo_list[i][0]}-h1`);
      if (todo_list[i][2] === false) {
        todo_list[i][2] = true;
        todo_count--;
        word.classList.add("checked");
        set_footer();
      } else {
        todo_list[i][2] = false;
        todo_count++;
        word.classList.remove("checked");
        set_footer();
      }
    });
    child_img = document.createElement("img");
    child_img.setAttribute("class", "todo-app__item-x");
    child_img.setAttribute("src", "./img/x.png");
    child_img.addEventListener("click", function () {
      removed_child = document.getElementById(`list${i}`);
      list.removeChild(removed_child);
      todo_list[i][3] = true;
      if (todo_list[i][2] == false) todo_count--;
      set_footer();
      if (set_list() === true) {
        let main = document.getElementById("main");
        let todoList = document.getElementById("todo-list");
        let footer = document.getElementById("todo-footer");
        main.removeChild(todoList);
        root.removeChild(footer);
      }
    });

    newChild.appendChild(child_div);
    newChild.appendChild(child_h1);
    newChild.appendChild(child_img);
    list.appendChild(newChild);
  }
  set_footer();
}

function set_footer() {
  if (set_list() === false) {
    footer.innerHTML = "";
    footer_total = document.createElement("div");
    footer_total.setAttribute("class", "todo-app__total");
    footer_total.textContent = `${todo_count} left`;

    footer_ul = document.createElement("ul");
    footer_ul.setAttribute("class", "todo-app__view-buttons");

    all_button = new button("All", "All").button;
    all_button.addEventListener("click", function () {
      show_todo_list("All");
    });

    active_button = new button("Active", "Active").button;
    active_button.addEventListener("click", function () {
      show_todo_list("Active");
    });

    completed_button = new button("Completed", "Completed").button;
    completed_button.addEventListener("click", function () {
      show_todo_list("Completed");
    });

    footer_ul.appendChild(all_button);
    footer_ul.appendChild(active_button);
    footer_ul.appendChild(completed_button);

    footer_clean = document.createElement("div");
    footer_clean.setAttribute("class", "todo-app__clean");

    clear_complete = new button("clear_complete", "Clear completed").button;
    clear_complete.addEventListener("click", clear_completed_item);

    footer_clean.appendChild(clear_complete);

    footer.appendChild(footer_total);
    footer.appendChild(footer_ul);
    footer.appendChild(footer_clean);
    footer_clean.classList.add("hidden");
    for (let i = 0; i < todo_list.length; i++) {
      if (todo_list[i][2] === true && todo_list[i][3] === false) {
        footer_clean.classList.remove("hidden");
      }
    }
  }
}

function set_list() {
  // return true if all of item are deleted
  if (todo_list.length === 0) return true;
  let count = 0;
  for (let i = 0; i < todo_list.length; i++)
    if (todo_list[i][3] === true) {
      count++;
    }
  if (count === todo_list.length) return true;
  return false;
}

function show_todo_list(type) {
  list = document.getElementById("todo-list");
  footer = document.getElementById("todo-footer");
  list.innerHTML = "";

  for (let i = 0; i < todo_list.length; i++) {
    if (todo_list[i][3] === true) continue;
    if (type === "Active" && todo_list[i][2] === true) continue;
    if (type === "Completed" && todo_list[i][2] === false) continue;
    newChild = new element(`list${i}`, "todo-app__item", "li").element;
    child_div = new element(`${i}-child-div`, "todo-app__checkbox", "div")
      .element;

    checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `${todo_list[i][0]}-checkbox`);

    label = document.createElement("label");
    label.setAttribute("for", `${todo_list[i][0]}-checkbox`);

    child_div.appendChild(checkbox);
    child_div.appendChild(label);

    child_h1 = document.createElement("h1");
    child_h1.setAttribute("class", "todo-app__item-detail");
    child_h1.setAttribute("id", `${todo_list[i][0]}-h1`);
    child_h1.innerHTML = String(todo_list[i][1]);
    if (todo_list[i][2] === true) {
      child_h1.classList.add("checked");
      // document.getElementById("checkbox").checked = true;
      checkbox.checked = true;
    }
    checkbox.addEventListener("click", function () {
      word = document.getElementById(`${todo_list[i][0]}-h1`);
      if (todo_list[i][2] === false) {
        todo_list[i][2] = true;
        todo_count--;
        word.classList.add("checked");
        set_footer();
      } else {
        todo_list[i][2] = false;
        todo_count++;
        word.classList.remove("checked");
        set_footer();
      }
    });
    child_img = document.createElement("img");
    child_img.setAttribute("class", "todo-app__item-x");
    child_img.setAttribute("src", "./img/x.png");
    child_img.addEventListener("click", function () {
      removed_child = document.getElementById(`list${i}`);
      list.removeChild(removed_child);
      todo_list[i][3] = true;
      if (todo_list[i][2] == false) todo_count--;
      set_footer();
      if (set_list() === true) {
        let main = document.getElementById("main");
        let todoList = document.getElementById("todo-list");
        let footer = document.getElementById("todo-footer");
        main.removeChild(todoList);
        root.removeChild(footer);
      }
    });

    newChild.appendChild(child_div);
    newChild.appendChild(child_h1);
    newChild.appendChild(child_img);
    list.appendChild(newChild);
  }
  set_footer;
}
