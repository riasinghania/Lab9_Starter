document.addEventListener("DOMContentLoaded", () => {
    //Step 1: Define a custom error class
    class CalculationError extends Error {
      constructor(message) {
        super(message);
        this.name = "CalculationError";
      }
    }
  
    const sampleData = [
      { name: "Alice", age: 22 },
      { name: "Bob", age: 25 },
    ];
  
    //Step 2: Handle console method demo buttons
    const buttons = document.querySelectorAll("#error-btns button");
  
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const label = e.target.innerText;
  
        switch (label) {
        case "Trigger a Global Error":
            // This will trigger an undefined function error
            undefinedFunctionCall(); // Not defined on purpose
            break;
          case "Console Log":
            console.log("This is a log message.");
            break;
          case "Console Error":
            console.error("This is an error message.");
            break;
          case "Console Count":
            console.count("Count button clicked");
            break;
          case "Console Warn":
            console.warn("This is a warning message.");
            break;
          case "Console Assert":
            console.assert(false, "Assertion failed: the condition is false");
            break;
          case "Console Table":
            console.table(sampleData);
            break;
          case "Console Dir":
            console.dir(document.body);
            break;
          case "Console Dirxml":
            console.dirxml(document.body);
            break;
          case "Console Group":
            console.group("Group Demo");
            console.log("Inside group");
            console.groupEnd();
            break;
          case "Console Time":
            console.time("Timer");
            setTimeout(() => console.timeEnd("Timer"), 1000);
            break;
          case "Console Trace":
            function f1() {
              function f2() {
                console.trace("Trace Example");
              }
              f2();
            }
            f1();
            break;
        }
      });
    });
  
    //Step 3: Calculator logic using try/catch and custom error
    document.querySelector("#calculate").addEventListener("click", (e) => {
      e.preventDefault();
      const output = document.querySelector("output");
      const num1 = document.querySelector("#first-num").value;
      const num2 = document.querySelector("#second-num").value;
      const operator = document.querySelector("#operator").value;
  
      try {
        if (num1.trim() === "" || num2.trim() === "") {
          throw new CalculationError("Both inputs are required.");
        }
  
        if (isNaN(num1) || isNaN(num2)) {
          throw new TypeError("Inputs must be numbers.");
        }
  
        if (operator === "/" && Number(num2) === 0) {
          throw new RangeError("Cannot divide by zero.");
        }
  
        const result = eval(`${num1} ${operator} ${num2}`);
        output.textContent = result;
        console.log("Calculation result:", result);
      } catch (err) {
        if (err instanceof CalculationError) {
          console.error("Custom CalculationError:", err.message);
        } else {
          console.error(`${err.name}: ${err.message}`);
        }
        output.textContent = "Error: " + err.message;
      } finally {
        console.log("Calculation attempt finished.");
      }
    });
  });

  window.onerror = function (message, source, lineno, colno, error) {
    console.log("🌐 Global Error Caught:");
    console.log("Message:", message);
    console.log("Source:", source);
    console.log("Line:", lineno, "Column:", colno);
    console.log("Error Object:", error);
  };
  
  