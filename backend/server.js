import express from 'express';
import cors from 'cors';
import { createTask, getAllTasks, toggleTaskStatus, deleteTask } from './tasks.js';

const app = express();
const PORT = 4000;

// JSON 요청을 파싱하고 프론트엔드 요청을 허용합니다.
app.use(cors());
app.use(express.json());

// 모든 작업을 조회합니다.
app.get('/tasks', (req, res) => {
  res.json(getAllTasks());
});

// 새로운 작업을 추가합니다.
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title은 비어있을 수 없습니다.' });
  }

  const task = createTask(title);
  res.status(201).json(task);
});

// 완료/미완료 상태를 토글합니다.
app.patch('/tasks/:id', (req, res) => {
  const task = toggleTaskStatus(req.params.id);
  if (!task) {
    return res.status(404).json({ error: '작업을 찾을 수 없습니다.' });
  }
  res.json(task);
});

// 작업을 삭제합니다.
app.delete('/tasks/:id', (req, res) => {
  const success = deleteTask(req.params.id);
  if (!success) {
    return res.status(404).json({ error: '작업을 찾을 수 없습니다.' });
  }
  res.status(204).send();
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Checklist backend running at http://localhost:${PORT}`);
});
