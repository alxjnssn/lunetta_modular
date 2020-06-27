const modular =  {  
  clockDivider: {
    clockInput: null,
    dividers: {
      two: {
        division: 2,
        output: null
      },
      four: {
        division: 4,
        output: null
      },
      eight: {
        division: 8,
        output: null
      },
      sixteen: {
        division: 16,
        output: null
      },
      thirtyTwo: {
        division: 32,
        output: null
      },
      sixtyFour: {
        division: 64,
        output: null
      }
    } 
  },
  quadLfo: {
    one: {
      value: 0,
      rate: 200,
      intervalID: null,
      outputTarget: null,
    },
    two: {
      value: 0,
      rate: 400,
      intervalID: null,
      outputTarget: null,
    },
    three: {
      value: 0,
      rate: 500,
      intervalID: null,
      outputTarget: null
    },
    four: { 
      value: 0,
      rate: 600,
      intervalID: null,
      outputTarget: null
    }
  }  
};

const initModular = modular => {
  initQuadLfo(modular.quadLfo);
  setInterval(() => {
    refreshDisplay(modular)
  }, 100)
}

const refreshDisplay = modular => {
  for (let lfo in modular.quadLfo) {
    const lfoDisplay = document.getElementById(`lfo-display-${lfo}`);
    lfoDisplay.innerHTML = modular.quadLfo[lfo].value;
  }
}

const generateLfo = target => {
  if (target.value === 0) {
    target.value = 1;
  } else {
    target.value = 0;
  }
}

const initQuadLfo = quadLfo => {
  for (let lfo in quadLfo) {
    quadLfo[lfo].intervalID = setInterval(() => {
        generateLfo(quadLfo[lfo])
      },
      quadLfo[lfo].rate
    );
  }
  connectQuadLfoControls(quadLfo);
}

const connectQuadLfoControls = quadLfo => {
  for (let lfo in quadLfo) {
    const lfoControl = document.getElementById(`lfo-control-${lfo}`);
    lfoControl.addEventListener('click', () => {
      updateLfoRate(lfoControl.value, lfo)
    });
  }
}

const updateLfoRate = (newLfoRate, lfo) => {
  clearInterval(modular.quadLfo[lfo].intervalID);
  modular.quadLfo[lfo].rate = newLfoRate;

  modular.quadLfo[lfo].intervalID = setInterval(() => {
      generateLfo(modular.quadLfo[lfo])
    },
    modular.quadLfo[lfo].rate
  );
}

const connectClockDivider = clockDivider => {
  const input = modular.quadLfo.one;

  for (let divider in clockDivider.dividers) {
    divider.output = input / divider.division;
  }
}

initModular(modular);