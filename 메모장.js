const ul = document.querySelector(".memo_list");
const memo = document.querySelector(".memo");
const add = document.querySelector(".add_memo");
const save = document.querySelector(".save_memo"); 
const cancel = document.querySelector(".cancel_memo"); 
const content = document.querySelector(".content");

// +를 눌러 메모창을 키고 취소를 눌러 메모장 끔
memo.style.display = "none";
add.addEventListener("click", () => {
  memo.style.display = "";
  memo.classList.remove("write")
  memo.classList.add("write")
})
cancel.addEventListener("click", () => {
  memo.style.display ="none"
  memo.classList.remove("write")
})

// 로컬스토리지 저장

let memolists = [];

const savememo = () => {
  localStorage.setItem("memolists", JSON.stringify(memolists));
};


// 저장버튼을 누르면 작성포스트잇은 사라지고 상단부터 순서대로 우측으로 나열된다.
const delItem = (event) => {
  const target = event.target.parentElement.parentElement; // 부모의 부모요소

  memolists = memolists.filter((memoitem) => memoitem.id !== parseInt(target.id));
  savememo();
  target.remove();
};

const addItem = (memoitem) => {
  if(memoitem.text !== "") {
    memo.style.display = "none";
    memo.classList.remove("write")
    const li = document.createElement("li");
    const memolist = document.createElement("div");
    ul.appendChild(li);
    memolist.classList.add("list");
    li.appendChild(memolist);
    const memocontent = document.createElement("p");
    memocontent.innerText = memoitem.text;
    memolist.appendChild(memocontent);
    const button = document.createElement("button");
    button.classList.add("del")
    button.innerText = "X";
    memolist.appendChild(button)
    button.addEventListener("click", delItem)
    li.id = memoitem.id
  }
};

const handler = (event) => {
  if(memoitem !== "") {
    alert("내용을 입력하세요!")
  }
  memoitem = {
    id: Date.now(),
    text: content.value,
  };

  memolists.push(memoitem)
  addItem(memoitem);
  savememo();

  content.value = "";
};

save.addEventListener("click", handler);

const init = () => {
  const usermemos = JSON.parse(localStorage.getItem("memolists"));
  
  if(usermemos) {
    usermemos.forEach((memoitem) => {
      addItem(memoitem);
    });
    memolists = usermemos;
  }
};
init();