let inpCtnr = document.querySelector(".inp-ctnr");
let inps = document.querySelectorAll(".task");
let formBtn = document.querySelector(".form-btn");
let remBtn = document.querySelector("#rem-tasks");
let form = document.querySelector("form");
let taskDetail = document.querySelector(".task-detl");
let count = 0;
let arrOfData = [];
let arrOfClass = [];

const enable_DisbleCheckBtnFunc = (value) => {
  document.querySelectorAll(".inp-btn").forEach((element) => {
    element.disabled = value;
  });
};

const getData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const fetchingDataFromLS = () => {
  arrOfData = [];
  for (let index = 0; index < inps.length; index++) {
    arrOfData.push(inps[index].value);
  }
  localStorage.setItem("tasks", JSON.stringify(arrOfData));
};

const showHideAddTaskBtn = () => {
  inps.forEach((element) => {
    if (element.value !== "") {
      formBtn.classList.remove("hide");
    } else {
      formBtn.classList.add("hide");
      enable_DisbleCheckBtnFunc(true);
    }
  });
};

const showHideRemTaskBtn = () => {
  formBtn.classList.add("hide");
  remBtn.classList.remove("hide");
};

let storedData = getData("tasks") || [];
storedData.forEach((element, i) => {
  if (inps[i]) {
    inps[i].value = element;
  }
});

inpCtnr.addEventListener("input", (e) => {
  if (e.target.classList.contains("task")) {
    showHideAddTaskBtn();
  }
});

inpCtnr.addEventListener("click", (e) => {
  if (e.target.classList.contains("form-btn")) {
    enable_DisbleCheckBtnFunc(false);
    fetchingDataFromLS();
  } else if (e.target.tagName === "I") {
    e.target.classList.add("inp-btn-icon");
    e.target
      .closest(".inp-sec")
      .querySelector("input")
      .classList.add("newInp-val");
    count++;
    taskDetail.innerText = `You have completed ${
      count > 1 ? count + " tasks" : count + " task"
    }`;

    if (count >= inps.length) {
      showHideRemTaskBtn();
    }
  } else if (e.target.id === "rem-tasks") {
    inps.forEach((element) => {
      element.value = "";
      element.classList.remove("newInp-val");
    });
    localStorage.removeItem("tasks");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

window.addEventListener("load", () => {
  showHideAddTaskBtn();
  if (!formBtn.classList.contains("hide")) {
    enable_DisbleCheckBtnFunc(false);
  } else {
    enable_DisbleCheckBtnFunc(true);
  }
});