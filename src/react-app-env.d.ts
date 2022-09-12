/// <reference types="react-scripts" />

interface Timer {
  id: number;
  content: JSX.Element;
}

interface TimerContextType {
  timer: number;
  addTime: (time: number) => void;
}
