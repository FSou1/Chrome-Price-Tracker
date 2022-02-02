import { useState } from 'react';
import './App.css';
import Watcher from './components/Watcher';
import {
  playAudio,
  showNotification,
  getPriceChangedAudio,
  getPriceChangedNotification,
  getTooManyErrorsNotification
} from './utils/notification';

function App() {
  const [tasks, setTasks] = useState([
    {
      asin: 'B08L8KC1J7',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3070
    },
    {
      asin: 'B08LF1CWT2',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3070
    },
    {
      asin: 'B08LW46GH2',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3070
    },
    {
      asin: 'B08L8LG4M3',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3070
    },
    {
      asin: 'B08KWPDXJZ',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3070
    },
    {
      asin: 'B08QJPBYC4',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3070
    },
    {
      asin: 'B08P7ZKQPP',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3070
    },
    {
      asin: 'B08WM28PVH',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3060
    },
    {
      asin: 'B08WHJPBFX',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3060
    },
    {
      asin: 'B08X4V8N5Q',
      interval: 10000,
      state: 'active',
      errorCount: 0,
      product: 3060
    }
  ]);

  const onPriceChanged = (value) => {
    const { price, title } = value;
    if (price > 0) {
      playAudio(getPriceChangedAudio());

      showNotification(getPriceChangedNotification(price, title));
    }
  }

  const onStart = ({ asin }) => {
    setTasks(tasks.map(task => task.asin === asin ? { ...task, state: 'active', errorCount: 0 } : task));
  }

  const onStop = ({ asin }) => {
    setTasks(tasks.map(task => task.asin === asin ? { ...task, state: 'stopped' } : task));
  }

  const onError = ({ asin, title }) => {
    setTasks(tasks.map(task => {
      if (task.asin === asin) {
        const errorCount = task.errorCount + 1;
        if (errorCount >= 3) {
          showNotification(getTooManyErrorsNotification(title ?? asin))
        }

        let state = task.state;
        if (errorCount >= 3) {
          state = 'stopped';
        }

        return {
          ...task,
          state,
          errorCount: errorCount
        };
      }

      return task;
    }));
  }

  return (
    <div className="container">
      <h1>Watchers</h1>
      <h2>3070</h2>
      {
        tasks
          .filter((task) => task.product === 3070)
          .map((task) => (
            <Watcher
              key={task.asin}
              task={task}
              onPriceChanged={onPriceChanged}
              onError={onError}
              onStart={onStart}
              onStop={onStop}
            />))
      }

      <h2>3060</h2>
      {
        tasks
          .filter((task) => task.product === 3060)
          .map((task) => (
            <Watcher
              key={task.asin}
              task={task}
              onPriceChanged={onPriceChanged}
              onError={onError}
              onStart={onStart}
              onStop={onStop}
            />))
      }
    </div>
  );
}

export default App;
