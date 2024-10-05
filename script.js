document.addEventListener('DOMContentLoaded', () => {
  const habitTableBody = document.getElementById('habits-body');
  const addHabitButton = document.getElementById('add-habit');
  const newHabitInput = document.getElementById('new-habit');
  
  let habits = JSON.parse(localStorage.getItem('habits')) || [];

  function createHabitRow(habit, index) {
    const row = document.createElement('tr');
    row.setAttribute('data-index', index);

    const habitCell = document.createElement('td');
    habitCell.contentEditable = "true";
    habitCell.textContent = habit.name;

    const checkboxCells = [];
    for (let i = 0; i < 7; i++) {
      const td = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      checkbox.checked = habit.days[i];
      td.appendChild(checkbox);
      checkbox.addEventListener('change', () => {
        habits[index].days[i] = checkbox.checked;
        saveHabits();
      });
      checkboxCells.push(td);
    }

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(habitCell);
    checkboxCells.forEach(td => row.appendChild(td));
    row.appendChild(actionsCell);
    habitTableBody.appendChild(row);

    habitCell.addEventListener('blur', () => {
      habits[index].name = habitCell.textContent;
      saveHabits();
    });
  }

  function renderHabits() {
    habitTableBody.innerHTML = '';
    habits.forEach((habit, index) => {
      createHabitRow(habit, index);
    });
  }

  function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
  }

  addHabitButton.addEventListener('click', () => {
    const habitName = newHabitInput.value.trim();
    if (habitName !== '') {
      habits.push({ name: habitName, days: [false, false, false, false, false, false, false] });
      newHabitInput.value = '';
      saveHabits();
      renderHabits();
    }
  });

  renderHabits();
});
