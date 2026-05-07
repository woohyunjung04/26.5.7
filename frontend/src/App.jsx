import { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput.jsx';
import TaskList from './components/TaskList.jsx';

const API_BASE = 'http://localhost:4000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 초기 작업 목록 조회
    fetch(`${API_BASE}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인하세요.');
        setLoading(false);
      });
  }, []);

  const addTask = async (title) => {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || '작업 추가에 실패했습니다.');
    }

    const task = await response.json();
    setTasks((prev) => [task, ...prev]);
  };

  const toggleTask = async (id) => {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PATCH'
    });

    if (!response.ok) {
      throw new Error('상태 변경에 실패했습니다.');
    }

    const updatedTask = await response.json();
    setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
  };

  const removeTask = async (id) => {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('삭제에 실패했습니다.');
    }

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="page-shell">
      <main className="panel">
        <header className="panel-header">
          <h1>Checklist</h1>
          <p className="subtitle">심플하고 세련된 할 일 관리.</p>
        </header>

        <TaskInput onAdd={addTask} />

        {error && <div className="message message-error">{error}</div>}
        {loading ? (
          <div className="message">로딩 중...</div>
        ) : (
          <>
            <div className="progress-section">
              <div className="progress-info">
                <span>{completedCount} / {totalCount}</span>
                <span className="progress-percent">{progressPercent}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
