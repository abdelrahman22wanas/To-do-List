# To-do List

A modern, feature-rich todo list application built with vanilla JavaScript, HTML, and CSS.

## Features

- ✅ **Add Tasks** - Create new tasks with custom text
- 🎯 **Priority Levels** - Assign High, Medium, or Low priority to tasks
- 📅 **Due Dates** - Set deadlines for your tasks with overdue highlighting
- ✏️ **Edit Tasks** - Click the edit icon to modify task text inline
- ✔️ **Mark Complete** - Check off tasks as you complete them
- 🗑️ **Delete Tasks** - Remove individual tasks or clear all completed ones
- 🔍 **Filter Views** - View All, Active, or Completed tasks
- 🔄 **Sort Options** - Sort by Date, Priority, or Name
- 💾 **Auto-Save** - Tasks are automatically saved to browser localStorage
- 📊 **Statistics** - View count of active and completed tasks

## How to Use

1. **Open the App**: Double-click `index.html` or open it in your web browser
2. **Add a Task**: 
   - Type your task in the input field
   - Optionally select a due date
   - Choose a priority level (High, Medium, Low)
   - Click "Add Task" or press Enter
3. **Manage Tasks**:
   - Check the box to mark as complete
   - Click the edit icon to modify task text
   - Click the trash icon to delete
4. **Filter & Sort**:
   - Use filter buttons to view All, Active, or Completed tasks
   - Use the dropdown to sort by Date, Priority, or Name
5. **Clear Completed**: Click "Clear Completed" to remove all finished tasks

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Custom Scrollbars)
- Vanilla JavaScript (ES6+)
- LocalStorage API
- Font Awesome Icons

## File Structure

```
Todo-List/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and design
├── script.js           # Application logic and functionality
└── README.md           # Project documentation
```

## Features Breakdown

### Priority System
- **High Priority**: Red indicator, displayed first when sorted
- **Medium Priority**: Yellow indicator, default selection
- **Low Priority**: Green indicator

### Due Date Management
- Tasks with due dates show the date
- Overdue tasks are highlighted in red
- Tasks without dates show "No date"

### Data Persistence
All tasks are saved to your browser's localStorage, so your data persists between sessions. Tasks are automatically saved when you:
- Add a new task
- Complete/uncomplete a task
- Edit a task
- Delete a task

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Installation

No installation required! Simply:
1. Download or clone the repository
2. Open `index.html` in your web browser
3. Start organizing your tasks

## Color Scheme

- Primary: Teal/Green gradient (#11998e to #38ef7d)
- High Priority: Red (#dc3545)
- Medium Priority: Yellow (#ffc107)
- Low Priority: Green (#28a745)

## Future Enhancements

Potential features for future versions:
- Task categories/tags
- Search functionality
- Dark mode toggle
- Export/import tasks
- Recurring tasks
- Task notes/descriptions

## License

Free to use and modify for personal or commercial projects.

## Author

Created with ❤️ for better productivity

---

**Enjoy organizing your tasks! 📝✨**
