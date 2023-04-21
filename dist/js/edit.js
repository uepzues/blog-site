const options = document.querySelectorAll(".option");
const editBtns = document.querySelectorAll(".edit");

const toggleEdit = () => {
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const parent = option.parentElement;
      const getEdit = parent.querySelectorAll(".edit");
      getEdit.forEach((edits) => {
        edits.classList.toggle("toggle");
      });
    });
  });
};

toggleEdit();

const deleteBtn = () => {
  editBtns.forEach((del) => {
    console.log(del.closest(".postDiv"));
    del.addEventListener("click", () => {
      del.closest(".postDiv").remove();
    });
  });
};

deleteBtn();
