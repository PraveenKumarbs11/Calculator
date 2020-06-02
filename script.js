function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place.

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments.
const KEYPADS = {
  clear: "AC",
  divide: "/",
  multiply: "*",
  subtract: "-",
  add: "+",
  decimal: ".",
  equals: "=",
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9" };


const operators = {};

const Button = props => {
  return (
    React.createElement("div", { id: props.entry[0], className: "button", onClick: props.onClick },
    props.entry[1]));


};

const Display = props => {
  const display = props.memory[0] ? props.memory.filter(element => element.length).slice(-1)[0] : "0";
  return (
    React.createElement("div", { className: "container-display" },
    React.createElement("h3", { id: "memory" }, props.memory),
    React.createElement("h1", { id: "display" }, display)));


};

const Container = props => {
  return React.createElement("div", { id: "container-keypad" }, props.children);
};

class Calculator extends React.Component {
  constructor() {
    super();_defineProperty(this, "handleClick",





    event => {
      const key = event.target.id;
      let currentIndex = this.state.currentIndex;
      const current = this.state.memory[currentIndex];
      const memory = this.state.memory.slice(0, currentIndex);
      switch (key) {
        case "clear":
          this.setState({
            memory: [""],
            currentIndex: 0 });

          break;

        case "equals":
          let total = "";
          if (current.length) {
            total = memory.concat(current);
          } else
          {
            total = memory.slice(0, memory.length - 1);
          }
          this.setState({
            memory: total.concat("=", eval(total.join("")).toString()),
            currentIndex: total.length + 1 });


          break;
        case "divide":
        case "multiply":
        case "subtract":
        case "add":
          // check for empty string
          if (current.length) {
            // check for equal in memory
            if (/=/.test(memory.concat(current))) {
              this.setState({
                memory: [current, KEYPADS[key], ""],
                currentIndex: 2 });

            } else
            {
              this.setState({
                // insert the current number, operator, new string and advance current index to the new string
                memory: memory.concat(current, KEYPADS[key], ""),
                currentIndex: currentIndex + 2 });

            }

          }
          // check for empty memory
          else if (memory.length > 1) {
              // replace the previous operator with the new operator
              this.setState({
                memory: memory.slice(0, memory.length - 1).concat(KEYPADS[key], "") });

            }
          break;
        default:
          // check for leading zeros
          if (!current.length && key == "zero") {
            break;
          }
          // check for multiple decimals
          if (/\./.test(current) && key == "decimal") {
            break;
          }
          if (current.length && /=/.test(memory)) {
            this.setState({
              memory: [KEYPADS[key]],
              currentIndex: 0 });

            break;
          }
          this.setState({
            memory: memory.concat(current.concat(KEYPADS[key])) });}


    });this.state = { memory: [""], currentIndex: 0 };}
  render() {
    const buttons = Object.entries(KEYPADS).map((entry) =>
    React.createElement(Button, { entry: entry, key: entry[0], onClick: this.handleClick }));

    return (
      React.createElement("div", { id: "calculator" },
      React.createElement(Display, { memory: this.state.memory }),
      React.createElement(Container, null, buttons)));


  }}


ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));