const modular = {};
const bpm = 120;
const on = false;

const runModular = () => {
  initLfo();
  initClockDivider();
}

const generateLfo = target => {
  if (target.value === 0) {
    target.value = 1;
  } else {
    target.value = 0;
  }
}

const initLfo = () => {
  modular.quadLfo = {
    one: {
      value: 0,
      rate: 100,
      intervalID: null,
      outputTarget: null,
    },
    two: {
      value: 0,
      rate: 100,
      intervalID: null,
      outputTarget: null,
    },
    three: {
      value: 0,
      rate: 100,
      intervalID: null,
      outputTarget: null
    },
    four: {
      value: 0,
      rate: 100,
      intervalID: null,
      outputTarget: null
    }
  }

  for (lfo in modular.quadLfo) {
    lfo.intervalID = setInterval(
      generateLfo(lfo), 
      lfo.rate
    );
  }
}

const initClockDivider = () => {
  modular.clockDivider = {
    clockInput: null,
    dividers: {
      two: null,
      four: null,
      eight: null,
      sixteen: null,
      thirtyTwo: null,
      sixtyFour: null
    } 
  }
}

runModular();