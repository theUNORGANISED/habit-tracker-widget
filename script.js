document.addEventListener('DOMContentLoaded', function () {
  const habitTableBody = document.getElementById('habit-body');
  const newHabitInput = document.getElementById('new-habit');
  const addHabitButton = document.getElementById('add-habit-btn');

  let habits = JSON.parse(localStorage.getItem('habits')) || [];

  // Render the habits and checkboxes
  function renderHabits() {
    habitTableBody.innerHTML = '';
    habits.forEach((habit, habitIndex) => {
      const row = document.createElement('tr');
      
      // Habit name cell
      const habitNameCell = document.createElement('td');
      habitNameCell.textContent = habit.name;
      habitNameCell.contentEditable = true; // Make habit names editable
      habitNameCell.addEventListener('blur', () => {
        habit.name = habitNameCell.textContent;
        saveHabits();
      });
      row.appendChild(habitNameCell);
      
      // Day checkboxes
      habit.days.forEach((checked, dayIndex) => {
        const dayCell = document.createElement('td');
        const checkButton = document.createElement('button');
        checkButton.classList.add(checked ? 'checked' : '');
        checkButton.textContent = checked ? '✔' : '';
        checkButton.addEventListener('click', () => {
          habit.days[dayIndex] = !habit.days[dayIndex];
          saveHabits();
          renderHabits();
        });
        dayCell.appendChild(checkButton);
        row.appendChild(dayCell);
      });

      // Delete habit button
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '❌';
      deleteButton.addEventListener('click', () => {
        habits.splice(habitIndex, 1);
        saveHabits();
        renderHabits();
      });
      row.appendChild(deleteCell);
      deleteCell.appendChild(deleteButton);

      habitTableBody.appendChild(row);
    });
  }

  // Save habits to localStorage
  function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
  }

  // Add new habit
  addHabitButton.addEventListener('click', () => {
    const habitName = newHabitInput.value.trim();
    if (habitName !== '') {
      habits.push({ name: habitName, days: [false, false, false, false, false, false, false] });
      newHabitInput.value = '';
      saveHabits();
      renderHabits();
    }
  });

  // Initial render
  renderHabits();
});
