export function calculateExpression(expression) {
  const tokens = expression.match(/(\d+|\+|\-|\*|\/|\(|\)|\^)/g);
  if (!tokens) {
    return null; // Вернуть null, если строка не содержит токенов
  }

  // Определение приоритета операторов
  const precedence = {
    "^": 3, // Приоритет возведения в степень
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
    "(": 0, // Нулевой приоритет для открывающей скобки
  };

  function applyOperator(operators, values) {
    const operator = operators.pop();
    if (operator === "(") {
      return;
    }
    const right = values.pop();
    const left = values.pop();
    switch (operator) {
      case "+":
        values.push(left + right);
        break;
      case "-":
        values.push(left - right);
        break;
      case "*":
        values.push(left * right);
        break;
      case "/":
        values.push(left / right);
        break;
      case "^":
        values.push(Math.pow(left, right));
        break;
    }
  }

  const operators = [];
  const values = [];

  for (const token of tokens) {
    if (/\d+/.test(token)) {
      values.push(parseFloat(token));
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length > 0 && operators[operators.length - 1] !== "(") {
        applyOperator(operators, values);
      }
      operators.pop(); // Удалить '('
    } else {
      while (
        operators.length > 0 &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        applyOperator(operators, values);
      }
      operators.push(token);
    }
  }

  while (operators.length > 0) {
    applyOperator(operators, values);
  }

  if (values.length === 1 && operators.length === 0) {
    return values[0];
  } else {
    return null;
  }
}
