const options = document.querySelectorAll(".option");

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
