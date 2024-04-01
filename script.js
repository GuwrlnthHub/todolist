window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const actionMenu = document.getElementById('action-menu');
    const editBtn = document.getElementById('edit-btn');
    const deleteBtn = document.getElementById('delete-btn');
    let currentTask;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        list_el.appendChild(task_el);

        input.value = '';

        task_el.addEventListener('mouseenter', () => {
            currentTask = task_el;
            showActionMenu();
        });

        task_el.addEventListener('mouseleave', () => {
            hideActionMenu();
        });
    });

    editBtn.addEventListener('click', () => {
        if (editBtn.innerText.toLowerCase() == "edit") {
            const task_input_el = currentTask.querySelector('.text');
            const newText = prompt("Enter the updated message:");
            if (newText !== null) {
                task_input_el.value = newText;
            }
        } else {
            const task_input_el = currentTask.querySelector('.text');
            editBtn.innerText = "Edit";
            task_input_el.setAttribute("readonly", "readonly");
        }
    });

    deleteBtn.addEventListener('click', () => {
        const confirmDelete = confirm("Are you sure you want to delete this message?");
        if (confirmDelete) {
            list_el.removeChild(currentTask);
            hideActionMenu();
        }
    });

    function showActionMenu() {
        actionMenu.style.display = 'block';
        actionMenu.style.top = currentTask.offsetTop + 'px';
        actionMenu.style.left = currentTask.offsetWidth + 'px';
    }

    function hideActionMenu() {
        actionMenu.style.display = 'none';
    }
});
