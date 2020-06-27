import defaultModular from "default_modular";

const modular = defaultModular;

const initModular = modular => {
  initQuadLfo(modular.quadLfo);

}

const generateLfo = target => {
  if (target.value === 0) {
    target.value = 1;
  } else {
    target.value = 0;
  }
}

const initQuadLfo = quadLfo => {
  for (lfo in quadLfo) {
    lfo.intervalID = setInterval(
      generateLfo(lfo), 
      lfo.rate
    );
  }
}

const connectClockDivider = clockDivider => {
  const input = modular.quadLfo.one;

  for (divider in clockDivider.dividers) {
    divider.output = input / divider.division;
  }
}

initModular();