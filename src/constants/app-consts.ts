export const general = {
  alarmName: 'pomodoroTimer',
  finishedFileLocation: 'src/pages/finished/index.html'
};

export const timer = {
  options: [
    {
      id: "default-1",
      label: "25 min",
      value: 25 * (60 * 1000),
    },
    {
      id: "default-2",
      label: "45 min",
      value: 45 * (60 * 1000),
    },
    {
      id: "default-3",
      label: "55 min",
      value: 55 * (60 * 1000),
    },
  ],

  get defaultTime() {
    return this.options[0];
  },
};

export const storageKeys = {
  endTime: 'endTime',
  timeSelect: 'timeSelect'
};

export const actions = {
  startTimer: 'startTimer',
  stopTimer: 'stopTimer',
  closeFinishWindow: 'closeFinishWindow'
};

export default {
  general,
  timer,
  storageKeys,
  actions
}