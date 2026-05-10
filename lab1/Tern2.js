function manyChecks() {
    let a = Math.floor(Math.random() * 20) + 1;
    console.log(`a = ${a}`);

    // (a > 10 ? 'a is bigger than 10' : 'a is less than or equal to 10 ' + (a === 5 ? 'an example of a special case' : '')) +
    // (a === 15 ? 'but a is not 15' : '') +
    // (a > 5 ? 'and a is greater than 5' : 'and a is less than or equal to 5 ') +
    // (a % 2 ? ' and a is odd' : ' and a is even ');

    // if...else
    let resultIf = '';

    // Первая часть
    if (a > 10) {
        resultIf += 'a is bigger than 10';
    } else {
        let specialCase = '';
        if (a === 5) {
            specialCase = 'an example of a special case';
        }
        resultIf += 'a is less than or equal to 10 ' + specialCase;
    }

    // Вторая часть (a === 15)
    if (a === 15) {
        resultIf += 'but a is not 15';
    }

    // Третья часть (a > 5)
    if (a > 5) {
        resultIf += 'and a is greater than 5';
    } else {
        resultIf += 'and a is less than or equal to 5 ';
    }

    // Четвёртая часть (проверка на чётность)
    if (a % 2) {
        resultIf += ' and a is odd';
    } else {
        resultIf += ' and a is even';
    }

    console.log(`Результат (if...else): ${resultIf}`);

    // ========== ВАРИАНТ С switch ==========
    let resultSwitch = '';

    // Первая часть с switch (используем fall-through для составных условий)
    // Для switch нужно сначала определить, какой случай обрабатывать
    switch (true) {
        case (a > 10):
            resultSwitch += 'a is bigger than 10';
            break;
        default: // a <= 10
            switch (a) {
                case 5:
                    resultSwitch += 'a is less than or equal to 10 an example of a special case';
                    break;
                default:
                    resultSwitch += 'a is less than or equal to 10 ';
                    break;
            }
    }

    // Вторая часть
    switch (a) {
        case 15:
            resultSwitch += 'but a is not 15';
            break;
        default:
            // ничего не добавляем
            break;
    }

    // Третья часть
    switch (true) {
        case (a > 5):
            resultSwitch += 'and a is greater than 5';
            break;
        default:
            resultSwitch += 'and a is less than or equal to 5 ';
            break;
    }

    // Четвёртая часть
    switch (a % 2) {
        case 1:
            resultSwitch += ' and a is odd';
            break;
        case 0:
            resultSwitch += ' and a is even';
            break;
    }

    console.log(`Результат (switch): ${resultSwitch}`);

}

manyChecks();
