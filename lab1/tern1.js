let a = Math.floor(Math.random() * 100);
console.log(`Исходное a = ${a}`);
// (a > 10 ? a : a * 2) > 5 ? (2 * a) + 1 : (a < 3 ? 1 : 2 * (a - 2)) > 4 ? 5 : (a % 2 == 0 ? 6 : 7);

//if...else
let result1;

let firstPart;
if (a > 10) {
    firstPart = a;
} else {
    firstPart = a * 2;
}

if (firstPart > 5) {
    result1 = 2 * a + 1;
} else {
    let secondPart;
    if (a < 3) {
        secondPart = 1;
    } else {
        secondPart = 2 * (a - 2);
    }

    if (secondPart > 4) {
        result1 = 5;
    } else {
        if (a % 2 == 0) {
            result1 = 6;
        } else {
            result1 = 7;
        }
    }
}

console.log(`Результат (if...else): ${result1}`);

//switch
let result2;

let step1;
switch(a > 10) {
    case a > 10:
        step1 = a;
        break;
    default:
        step1 = a * 2;
        break;
}

switch(step1 > 5) {
    case step1 > 5:
        result2 = 2 * a + 1;
        break;
    default:
        let step2;
        switch (a < 3) {
            case a < 3:
                step2 = 1;
                break;
            default:
                step2 = 2 * (a - 2);
                break;

        }

        switch (step2 > 4) {
            case true:
                result2 = 5;
                break;
            default:
            switch (a % 2) {
                case 0:
                    result2 = 6;
                    break;
                case 1:
                    result2 = 7;
                    break;
                default:
                    result2 = 7;
                    break;
            }
        }
}

console.log(`Результат (switch): ${result2}`);

