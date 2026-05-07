import TaskItem from './TaskItem.jsx';

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <div className="empty-state">아직 등록된 할 일이 없습니다.</div>;
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </section>
  );
}

export default TaskList;
