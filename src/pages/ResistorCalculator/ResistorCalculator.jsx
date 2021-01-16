import React, { useRef, useReducer, useEffect, useState } from "react";
import styles from "./ResistorCalculator.less";
import { ResistorIcon, InfoIcon } from "../../assets/icons";
import SegmentedControl from "./components/SegmentedControl/SegmentedControl";

const table_data = [
  {
    color: "black",
    first: "0",
    second: "0",
    third: "0",
    multi: "1Ω",
    toler: "-",
    tcr: "-",
  },
  {
    color: "brown",
    first: "1",
    second: "1",
    third: "1",
    multi: "10Ω",
    toler: "1%",
    tcr: "100",
  },
  {
    color: "red",
    first: "2",
    second: "2",
    third: "2",
    multi: "100Ω",
    toler: "2%",
    tcr: "50",
  },
  {
    color: "orange",
    first: "3",
    second: "3",
    third: "3",
    multi: "1KΩ",
    toler: "-",
    tcr: "15",
  },
  {
    color: "yellow",
    first: "4",
    second: "4",
    third: "4",
    multi: "10KΩ",
    toler: "-",
    tcr: "25",
  },
  {
    color: "green",
    first: "5",
    second: "5",
    third: "5",
    multi: "100KΩ",
    toler: "0.5%",
    tcr: "-",
  },
  {
    color: "blue",
    first: "6",
    second: "6",
    third: "6",
    multi: "1MΩ",
    toler: "0.25%",
    tcr: "10",
  },
  {
    color: "violet",
    first: "7",
    second: "7",
    third: "7",
    multi: "10MΩ",
    toler: "0.1%",
    tcr: "5",
  },
  {
    color: "grey",
    first: "8",
    second: "8",
    third: "8",
    multi: "100MΩ",
    toler: "0.05%",
    tcr: "-",
  },
  {
    color: "white",
    first: "9",
    second: "9",
    third: "9",
    multi: "1GΩ",
    toler: "-",
    tcr: "-",
  },
  {
    color: "silver",
    first: "-",
    second: "-",
    third: "-",
    multi: "0.01Ω",
    toler: "5%",
    tcr: "-",
  },
  {
    color: "gold",
    first: "-",
    second: "-",
    third: "-",
    multi: "0.1Ω",
    toler: "10%",
    tcr: "-",
  },
];

const initialState = {
  firstBand: "brown",
  secondBand: "black",
  thirdBand: "black",
  multiplier: "yellow",
  tolerance: "red",
};

function camelCase2Normal(text) {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (match) => match.toUpperCase());
}

function reducer(state, action) {
  if (Object.prototype.hasOwnProperty.call(state, action.type)) {
    return { ...state, [action.type]: action.payload };
  }
  return new Error();
}

export default function ResistorCalculator() {
  const [resistanceValue, setResistanceValue] = useState();
  const [bandType, setBandType] = useState("6-band");
  const lines = [
    "firstBand",
    "secondBand",
    "thirdBand",
    "multiplier",
    "tolerance",
  ];
  const baseColors = [
    "brown",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "grey",
  ];
  const colors = ["black", ...baseColors, "white"];
  const tolerances = [1, 2, 0.05, 0.02, 0.5, 0.25, 0.1, 0.01, 5, 10];
  const multiplierColors = ["silver", "gold", ...baseColors];
  const toleranceColors = [...baseColors, "gold", "silver"];
  const [state, dispatch] = useReducer(reducer, initialState);

  const containerRef = useRef();
  function handleSelect({ currentTarget: { id, value } }) {
    dispatch({ type: id, payload: value });
    const child = lines.indexOf(id) + 3;
    const path = containerRef.current.querySelector(
      `svg path:nth-child(${child})`
    );
    if (path) path.style.fill = value;
  }

  function handleRadioClick(event) {
    setBandType(event.target.value);
  }

  useEffect(() => {
    Object.keys(initialState).map((state) => {
      handleSelect({
        currentTarget: { id: state, value: initialState[state] },
      });
    });
  }, []);

  useEffect(() => {
    const { firstBand, secondBand, thirdBand, multiplier } = state;
    const first = colors.indexOf(firstBand);
    const second = colors.indexOf(secondBand);
    const third = colors.indexOf(thirdBand);
    const multi = multiplierColors.indexOf(multiplier);
    if (first > -1 && second > -1 && multi > -1) {
      const base =
        third > -1 ? first * 100 + second * 10 + third : first * 10 + second;
      const value = Math.round(base * Math.pow(10, multi - 2) * 100) / 100;
      if (value % 100000000 === 0 && value > 100000000)
        setResistanceValue(value / 1000000000 + "G");
      else if (value % 100000 === 0 && value > 100000)
        setResistanceValue(value / 1000000 + "M");
      else if (value % 100 === 0 && value > 100)
        setResistanceValue(value / 1000 + "K");
      else setResistanceValue(value);
    }
  }, [state.firstBand, state.secondBand, state.thirdBand, state.multiplier]);
  return (
    <div ref={containerRef} className={styles.container}>
      <h1>Resistor colors decoder</h1>
      <div className={styles.svgContainer}>
        <ResistorIcon className={styles.svg} />
      </div>
      <div className={styles.controllers}>
        {lines.map((line) => (
          <fieldset key={line} className={styles.fieldset}>
            <legend>{camelCase2Normal(line)}</legend>
            <div className={styles.selectorContainer}>
              <select
                name={line}
                id={line}
                onChange={handleSelect}
                value={state[line]}
              >
                <option disabled={line !== "thirdBand"} value="transparent">
                  {" "}
                  -- None --{" "}
                </option>
                {(line === "multiplier"
                  ? multiplierColors
                  : line === "tolerance"
                  ? toleranceColors
                  : colors
                ).map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
              <div
                className={styles.sample}
                style={{ backgroundColor: state[line] }}
              ></div>
            </div>
          </fieldset>
        ))}
      </div>
      <div className={styles.valueContainer}>
        <span>Value:</span>
        <span className={styles.value}>
          {resistanceValue}Ω{" "}
          {state.tolerance &&
            `± ${tolerances[toleranceColors.indexOf(state.tolerance)]}%`}
        </span>
      </div>
      <div>
        <div className={styles.infoBox}>
          <span className={styles.iconContainer}>
            <InfoIcon className={styles.infoIcon} />
          </span>
          <p className={styles.paragraph}>
            Hint: The current calculator can calculate the resistance of value
            of a <i>4-band resistors</i> and <i>5-band resistors</i>. To
            retrieve the value of a <i>4-band resistor</i> select{" "}
            <strong>"None"</strong> in the <strong>"Third Band"</strong> option.
          </p>
        </div>
      </div>
      <div>
        <h2>About color codes</h2>
        <p className={styles.paragraph}>
          The color code represents the value of the resistance, tolerance and
          reliability of the resistor. There are 3 possible combination of color
          bands: 4-bands, 5-bands and 6 bands. Luckily the decoding is very
          similar in each cases. 4-band resistors has two bands representing the
          base resistance value, one band shows the multiplier and one band is
          for the tolerance. 5-band is very similar to the 4-band resistor but
          it has three bands representing the base resistance value. 6-band is
          just like the 5-band but with an additional band showing the
          temperature coefficent. The temperature coefficent is the ratio which
          shows how does the resistance reacts to a change in temperature.
        </p>
      </div>
      <div className={styles.tableContainer}>
        <h2>Interactive color table</h2>
        <div>
          <SegmentedControl
            items={[
              { value: "4-band", id: "4-band" },
              { value: "5-band", id: "5-band" },
              { value: "6-band", id: "6-band", defaultChecked: true },
            ]}
            onClick={handleRadioClick}
          />
        </div>
        <div
          className={`${styles.table} ${
            bandType === "4-band"
              ? styles.fourBand
              : bandType === "5-band"
              ? styles.fiveBand
              : ""
          }`}
        >
          <div>Color</div>
          <div>#1 Band</div>
          <div>#2 Band</div>
          <div>#3 Band</div>
          <div>Multiplier</div>
          <div>Tolerance</div>
          <div>TCR</div>
          {table_data.map((row) => {
            const dark = ["black", "brown", "red", "green", "blue", "grey"];
            const additionalStyle =
              dark.indexOf(row.color) > -1 ? { color: "white" } : {};
            return (
              <React.Fragment key={row.color}>
                <div style={{ backgroundColor: row.color, ...additionalStyle }}>
                  {row.color}
                </div>
                <div style={{ backgroundColor: row.color, ...additionalStyle }}>
                  {row.first}
                </div>
                <div style={{ backgroundColor: row.color, ...additionalStyle }}>
                  {row.second}
                </div>
                <div style={{ backgroundColor: row.color, ...additionalStyle }}>
                  {row.third}
                </div>
                <div style={{ backgroundColor: row.color, ...additionalStyle }}>
                  {row.multi}
                </div>
                <div style={{ backgroundColor: row.color, ...additionalStyle }}>
                  {row.toler}
                </div>
                <div style={{ backgroundColor: row.color, ...additionalStyle }}>
                  {row.tcr}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <p>
          To use the table it might be the best to go through an example to
          demonstrate it. Let&apos;s take a <i>5-band</i> resistor with the
          following color bands in order:{" "}
          <strong>yellow, violet, black, brown, brown</strong>. By searching the
          table we get the following result: <strong>4, 7, 0, 10Ω, 1%</strong>.
          We just take the <i>base resistance</i> values and write down net to
          eachother, so we got <strong>470</strong> in this case. The next step
          is to multiply it with the result from the <i>multiplier</i> column.{" "}
          <strong>470 * 10Ω = 4700Ω = 4.7KΩ</strong>. And finally the last
          number indicates the tolerance so in the result we found out that the
          resistance we were looking for is <strong>4.7kΩ±1%</strong>.
        </p>
        <p>
          That&apos;s it! At first sight it might look a bit strange and hard to
          learn but actually it&apos;s much easier when you actually find a
          proper way to learn it. I hope this widget could help as many
          desperated tinkerers as possible to decode the colors from the
          resistance!
        </p>
      </div>
    </div>
  );
}
