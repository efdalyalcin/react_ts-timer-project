/// <reference types="react-scripts" />

interface Timer {
  id: number;
  time: number;
  createdTime: number;
}

interface TimerContextType {
  timer: number;
  addTime: (time: number) => void;
}
