import { useState } from 'react';
import styles from './AuvBuilderPage.module.css';

type Role = 'survey' | 'rescue' | null;
type ModalType = 'task' | 'result' | 'end' | null;

interface Choice {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

interface Task {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  points: { core: number; advanced: number };
  position: { left: string; top: string };
  getChoices: (role: Role) => Choice[];
  evaluate: (choiceId: string, role: Role) => { success: boolean; advanced: boolean; points: number; explanation: string };
}

const tasks: Task[] = [
  {
    id: 1,
    title: 'Task 1: Begin Assessment',
    subtitle: 'Gate',
    description: 'Head out to assess the environment. Pass through the gate and choose your role by picking which side to pass under. The gate is divided by a red plate — Survey & Repair on one side, Search & Rescue on the other.',
    points: { core: 10, advanced: 20 },
    position: { left: '18%', top: '55%' },
    getChoices: () => [
      { id: 'survey', emoji: '🧭', label: 'Survey & Repair', description: 'Pass under the compass/hammer side — assess and repair infrastructure.' },
      { id: 'rescue', emoji: '🛟', label: 'Search & Rescue', description: 'Pass under the life ring/SOS side — search debris and restore safety.' },
    ],
    evaluate: (choiceId) => ({
      success: true, advanced: true, points: 20,
      explanation: choiceId === 'survey'
        ? '🧭 You chose Survey & Repair! Your AUV passes under the compass side. Your role for the rest of the mission is damage assessment and infrastructure repair.'
        : '🛟 You chose Search & Rescue! Your AUV passes under the life ring side. Your role for the rest of the mission is searching debris and restoring safety.',
    }),
  },
  {
    id: 2,
    title: 'Task 2: Avoid Debris',
    subtitle: 'Slalom',
    description: 'Navigate a channel blocked with debris. Three sets of RED and WHITE pipes are moored at different heights. Stay on the same side of the red pipe as your gate choice for maximum points.',
    points: { core: 10, advanced: 20 },
    position: { left: '38%', top: '25%' },
    getChoices: (role) => [
      {
        id: 'correct',
        emoji: role === 'survey' ? '🔴' : '⚪',
        label: role === 'survey' ? 'Keep RED pipe on the right' : 'Keep RED pipe on the left',
        description: 'Stay consistent with the side you chose at the gate.',
      },
      {
        id: 'wrong',
        emoji: role === 'survey' ? '⚪' : '🔴',
        label: role === 'survey' ? 'Keep RED pipe on the left' : 'Keep RED pipe on the right',
        description: 'Switch sides from your gate choice.',
      },
      {
        id: 'above',
        emoji: '⬆️',
        label: 'Navigate above the pipes',
        description: 'Go over the top of the pipe arrangement.',
      },
    ],
    evaluate: (choiceId, role) => {
      if (choiceId === 'correct') return {
        success: true, advanced: true, points: 20,
        explanation: `Excellent! You stayed on the ${role === 'survey' ? 'right' : 'left'} side of the red pipe, consistent with your gate choice. Full points for correct depth and correct side.`,
      };
      if (choiceId === 'wrong') return {
        success: true, advanced: false, points: 10,
        explanation: 'You navigated the slalom but on the wrong side of the red pipe. Core points only — stay consistent with your gate choice for advanced points.',
      };
      return {
        success: false, advanced: false, points: 0,
        explanation: 'Navigating above the pipes means leaving the required depth zone. No points — the AUV must stay within the area of the pipes.',
      };
    },
  },
  {
    id: 4,
    title: 'Task 4: Deploy',
    subtitle: 'Torpedoes',
    description: 'Provide necessary assistance. Fire torpedoes through the openings on the board. The board shows 🔥🚒 for Survey & Repair and 🩸🚑 for Search & Rescue. Fire through the large opening first, then the small one for maximum points.',
    points: { core: 10, advanced: 30 },
    position: { left: '75%', top: '30%' },
    getChoices: () => [
      {
        id: 'correct-sequence',
        emoji: '🎯',
        label: 'Large opening first, then small',
        description: 'Fire through the large opening (🔥/🩸), then the small opening (🚒/🚑).',
      },
      {
        id: 'wrong-sequence',
        emoji: '↩️',
        label: 'Small opening first, then large',
        description: 'Fire through the small opening first.',
      },
      {
        id: 'any-opening',
        emoji: '💨',
        label: 'Fire through any opening',
        description: 'Fire without targeting the correct sequence.',
      },
    ],
    evaluate: (choiceId) => {
      if (choiceId === 'correct-sequence') return {
        success: true, advanced: true, points: 30,
        explanation: '🎯 Perfect sequence! Large opening first, then small. Maximum points. In the real competition, firing from 1m or 1.5m away earns even more.',
      };
      if (choiceId === 'wrong-sequence') return {
        success: true, advanced: false, points: 10,
        explanation: 'Torpedo fired but in the wrong sequence. Core points only — always target the large opening first, then the small one.',
      };
      return {
        success: true, advanced: false, points: 10,
        explanation: 'Torpedo passed through an opening — core points awarded. Fire large opening first then small for maximum points.',
      };
    },
  },
  {
    id: 6,
    title: 'Task 6: Return Home',
    subtitle: 'Return Home',
    description: 'At the end of the run, while underwater, the AUV passes back through the start gate to complete the mission.',
    points: { core: 10, advanced: 20 },
    position: { left: '25%', top: '72%' },
    getChoices: () => [
      {
        id: 'correct',
        emoji: '🏁',
        label: 'Navigate back through the gate underwater',
        description: 'Return through the start gate while remaining submerged.',
      },
      {
        id: 'surface',
        emoji: '🌊',
        label: 'Surface before reaching the gate',
        description: 'Breach the surface before passing back through.',
      },
      {
        id: 'miss',
        emoji: '❌',
        label: 'Miss the gate',
        description: 'Fail to navigate back through the gate opening.',
      },
    ],
    evaluate: (choiceId) => {
      if (choiceId === 'correct') return {
        success: true, advanced: true, points: 20,
        explanation: '🏁 Mission complete! The AUV successfully returned through the start gate while underwater. Full points awarded.',
      };
      if (choiceId === 'surface') return {
        success: false, advanced: false, points: 0,
        explanation: 'The AUV breached the surface before returning through the gate. The run is terminated when the vehicle surfaces.',
      };
      return {
        success: false, advanced: false, points: 0,
        explanation: 'The AUV missed the gate on the return. Navigation back through the start gate is required to score points for this task.',
      };
    },
  },
];

interface ResultInfo {
  success: boolean;
  advanced: boolean;
  points: number;
  explanation: string;
  taskId: number;
}

function AuvBuilderPage() {
  const [role, setRole]                     = useState<Role>(null);
  const [auvPos, setAuvPos]                 = useState({ left: '85%', top: '85%' });
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [totalScore, setTotalScore]         = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [modal, setModal]                   = useState<ModalType>('task');
  const [resultInfo, setResultInfo]         = useState<ResultInfo | null>(null);

  const currentTaskData = tasks[currentIndex];

  const getStatus = (id: number) => {
    if (completedTasks.includes(id)) return 'completed';
    if (id === currentTaskData.id) return 'active';
    return 'pending';
  };

  const handleChoice = (choiceId: string) => {
    const result = currentTaskData.evaluate(choiceId, role);
    if (currentTaskData.id === 1) setRole(choiceId as Role);
    setTotalScore(prev => prev + result.points);
    setCompletedTasks(prev => [...prev, currentTaskData.id]);
    setAuvPos(currentTaskData.position);
    setResultInfo({ ...result, taskId: currentTaskData.id });
    setModal('result');
  };

  // index-based so non-sequential ids (1,2,4,6) work correctly
  const continueGame = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= tasks.length) { setModal('end'); return; }
    setCurrentIndex(nextIndex);
    setModal(null);
    setTimeout(() => setModal('task'), 400);
  };

  const resetGame = () => {
    setRole(null);
    setAuvPos({ left: '85%', top: '85%' });
    setCurrentIndex(0);
    setTotalScore(0);
    setCompletedTasks([]);
    setResultInfo(null);
    setModal(null);
    setTimeout(() => setModal('task'), 400);
  };

  const getFinalText = () => {
    const max = tasks.reduce((sum, t) => sum + t.points.advanced, 0);
    const pct = totalScore / max;
    if (pct >= 0.85) return "🏆 Outstanding! Your AUV mastered every task — you're ready for RoboSub!";
    if (pct >= 0.6)  return '🎯 Great run! Solid performance. Review the advanced criteria to push your score higher.';
    return "📚 Good effort! Study each task's advanced requirements and try again.";
  };

  const maxScore = tasks.reduce((sum, t) => sum + t.points.advanced, 0);
  const progress = (totalScore / maxScore) * 100;

  return (
    <div className={styles.page}>
      <div className={styles.gameContainer}>

        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>🤿 Mission Brief</h2>

          {role && (
            <div className={styles.roleBox}>
              <strong>Current Role:</strong><br />
              {role === 'survey' ? '🧭 Survey & Repair' : '🛟 Search & Rescue'}
            </div>
          )}

          <div className={styles.taskList}>
            {tasks.map(task => (
              <div key={task.id} className={`${styles.taskListItem} ${getStatus(task.id) === 'active' ? styles.activeItem : getStatus(task.id) === 'completed' ? styles.completedItem : styles.pendingItem}`}>
                <span className={styles.taskListNum}>{task.id}</span>
                <div>
                  <div className={styles.taskListTitle}>{task.subtitle}</div>
                  <div className={styles.taskListPoints}>up to {task.points.advanced} pts</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.missionObjective}>
            <h4 className={styles.objectiveTitle}>📋 Mission Progress</h4>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.totalScore}>
              <strong>Score: {totalScore} / {maxScore}</strong>
            </div>
          </div>
        </aside>

        <main className={styles.gameArea}>
          <div className={styles.gameHeader}>
            <h2 className={styles.headerTitle}>Navigate through the course and complete all tasks!</h2>
            <div className={styles.scoreDisplay}>
              Task {currentIndex + 1} of {tasks.length} | Score: {totalScore}
            </div>
          </div>

          <div className={styles.pool}>
            <div className={styles.auv} style={{ left: auvPos.left, top: auvPos.top }}>🚢</div>
            {tasks.map(task => (
              <div
                key={task.id}
                className={`${styles.taskMarker} ${styles[getStatus(task.id)]}`}
                style={{ left: task.position.left, top: task.position.top }}
                onClick={() => getStatus(task.id) === 'active' && setModal('task')}
                title={task.subtitle}
              >
                {task.id}
              </div>
            ))}
          </div>

          <div className={styles.gameControls}>
            <button className={styles.controlBtn} onClick={resetGame}>🔄 Reset Game</button>
            <button className={styles.controlBtn} onClick={continueGame} disabled={!completedTasks.includes(currentTaskData.id)}>
              ➡️ Next Task
            </button>
            <button className={styles.controlBtn} onClick={() => alert(`Hint: ${currentTaskData.description}`)}>
              💡 Hint
            </button>
          </div>
        </main>
      </div>

      {modal === 'task' && (
        <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={() => setModal(null)}>×</button>
            <h2>{currentTaskData.title}</h2>
            <span className={styles.taskPoints}>
              Core: {currentTaskData.points.core}pts &nbsp;|&nbsp; Advanced: {currentTaskData.points.advanced}pts
            </span>
            <p className={styles.taskDesc}>{currentTaskData.description}</p>
            <p className={styles.choicePrompt}><strong>What does your AUV do?</strong></p>
            <div className={styles.choices}>
              {currentTaskData.getChoices(role).map(choice => (
                <button key={choice.id} className={styles.choiceBtn} onClick={() => handleChoice(choice.id)}>
                  <span className={styles.choiceEmoji}>{choice.emoji}</span>
                  <span className={styles.choiceLabel}>{choice.label}</span>
                  <span className={styles.choiceSub}>{choice.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modal === 'result' && resultInfo && (
        <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={() => setModal(null)}>×</button>
            <h2 className={resultInfo.success ? styles.success : styles.failure}>
              {resultInfo.advanced ? '🌟 Advanced!' : resultInfo.success ? '✅ Core Complete' : '❌ Mission Failed'}
            </h2>
            <span className={styles.taskPoints} style={{
              background: resultInfo.advanced ? '#6a0dad' : resultInfo.success ? '#51cf66' : '#ff6b6b'
            }}>
              +{resultInfo.points} Points
            </span>
            <p className={styles.taskDesc}>{resultInfo.explanation}</p>
            <button className={styles.startBtn} onClick={continueGame}>Continue</button>
          </div>
        </div>
      )}

      {modal === 'end' && (
        <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={() => setModal(null)}>×</button>
            <h2>Mission Complete!</h2>
            <span className={styles.taskPoints}>Final Score: {totalScore} / {maxScore}</span>
            <p className={styles.taskDesc}>{getFinalText()}</p>
            <button className={styles.startBtn} onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuvBuilderPage;