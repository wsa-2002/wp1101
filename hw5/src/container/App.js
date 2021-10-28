/* eslint no-eval: 0 */
import "./App.css";
import React, { useState } from "react";
let equal = false;
function App() {
  const [formula, setFormula] = useState("");
  const clr = () => {
    setFormula("");
    setMemory([]);
  };
  const [memory, setMemory] = useState([]);
  const memory_plus = () => {
    let answer;
    try {
      answer = eval(formula);
    } catch (e) {
      answer = e;
      // console.error(e);
      let error = String(answer).split(":")[0];
      setFormula(error);
      return;
    }
    setMemory((memory) => [...memory, answer]);
    setFormula("");
  };
  const memory_recall = () => {
    let sum = 0;
    for (let i = 0; i < memory.length; i++) {
      sum += parseInt(memory[i]);
    }
    setFormula(String(sum));
  };
  const memory_clear = () => {
    setMemory([]);
  };
  const press = (button) => {
    switch (formula.substr(formula.length - 1)) {
      case "":
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        if (
          button === "+" ||
          button === "-" ||
          button === "*" ||
          button === "/" ||
          button === "%" ||
          button === ")" ||
          button === "e"
        ) {
          return;
        }
        break;
      default:
        break;
    }
    if (equal === false) {
      if (button === "+/-") {
        if (formula[0] !== "-") {
          setFormula("-" + formula);
          return;
        } else {
          setFormula(formula.slice(1, formula.length));
          return;
        }
      } else {
        if (button === "+/-") {
          if (formula[0] !== "-") {
            setFormula("-" + formula);
            return;
          } else {
            setFormula(formula.slice(1, formula.length));
            return;
          }
        }
        setFormula(formula + String(button));
        return;
      }
    }
    equal = false;
    setFormula(String(button));
  };
  const undo = () => {
    setFormula(formula.slice(0, -1));
  };
  const press_equal = () => {
    let answer;
    try {
      answer = eval(formula);
    } catch (e) {
      answer = e;
      // console.error(e);
      let error = String(answer).split(":")[0];
      setFormula(error);
      return;
    }
    if (String(answer) === "Infinity") answer = "Undefined";
    if (String(answer).length > 10) answer = answer.toExponential();
    setFormula(String(answer));
    equal = true;
  };
  return (
    <div className="calculator" align="center">
      <div>Calculator</div>
      <div>
        <table>
          <tbody>
            <tr>
              <td colSpan="4">
                <input
                  type="text"
                  id="result"
                  disabled
                  defaultValue={formula}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </td>
              <td>
                <input type="button" value="AC" onClick={clr} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="button" value="+/-" onClick={() => press("+/-")} />
              </td>
              <td>
                <input type="button" value="(" onClick={() => press("(")} />
              </td>
              <td>
                <input type="button" value=")" onClick={() => press(")")} />
              </td>
              <td>
                <input type="button" value="%" onClick={() => press("%")} />
              </td>
              <td>
                <input type="button" value="C" onClick={() => undo()} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="button" value="e" onClick={() => press("e")} />
              </td>
              <td>
                <input type="button" value="1" onClick={() => press(1)} />
              </td>
              <td>
                <input type="button" value="2" onClick={() => press(2)} />
              </td>
              <td>
                <input type="button" value="3" onClick={() => press(3)} />
              </td>
              <td>
                <input type="button" value="/" onClick={() => press("/")} />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="button"
                  value="MC"
                  onClick={() => memory_clear()}
                />
              </td>
              <td>
                <input type="button" value="4" onClick={() => press(4)} />
              </td>
              <td>
                <input type="button" value="5" onClick={() => press(5)} />
              </td>
              <td>
                <input type="button" value="6" onClick={() => press(6)} />
              </td>
              <td>
                <input type="button" value="-" onClick={() => press("-")} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="button" value="M+" onClick={() => memory_plus()} />
              </td>
              <td>
                <input type="button" value="7" onClick={() => press(7)} />
              </td>
              <td>
                <input type="button" value="8" onClick={() => press(8)} />
              </td>
              <td>
                <input type="button" value="9" onClick={() => press(9)} />
              </td>
              <td>
                <input type="button" value="+" onClick={() => press("+")} />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="button"
                  value="MR"
                  onClick={() => memory_recall()}
                />
              </td>
              <td>
                <input type="button" value="." onClick={() => press(".")} />
              </td>
              <td>
                <input type="button" value="0" onClick={() => press(0)} />
              </td>
              <td>
                <input type="button" value="=" onClick={() => press_equal()} />
              </td>
              <td>
                <input type="button" value="*" onClick={() => press("*")} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
