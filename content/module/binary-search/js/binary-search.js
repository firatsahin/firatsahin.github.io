moduleOn = () => {
    let moduleRoot = rootDiv.find(">div");
    l("module on called");

    let arr = [];
    let arrLength = 1000000;
    let t1 = Date.now();
    for (let i = 0; i < arrLength; i++) {
        arr.push({
            id: i === 0 ? 4 : arr[i - 1].id + h.getRandomInteger(1, 9),
            name: h.getRandomString(h.getRandomInteger(3, 8)),
            surname: h.getRandomString(h.getRandomInteger(3, 8)),
            getFullName: function () {
                return this.name + ' ' + this.surname;
            }
        });
        //arr.push(i === 0 ? 4 : arr[i - 1] + h.getRandomInteger(1, 9)); // array[int] case
    }
    let t2 = Date.now();
    l(arr);
    printf("sorted array created(length:" + arrLength + ") with incremental ids and name/surname values: <br>[" +
        JSON.stringify(arr[0]) + ',' + JSON.stringify(arr[1]) + ',' + JSON.stringify(arr[2]) + ' ... ' + JSON.stringify(arr[arr.length - 3]) + ',' + JSON.stringify(arr[arr.length - 2]) + ',' + JSON.stringify(arr[arr.length - 1]) + ']'
        + getTimeDifHtml(t1, t2), moduleRoot);

    let numOfLoops; // to calculate cost of algorithms

    function linearSearch(val) {
        for (let i = 0; i < arr.length; i++) {
            numOfLoops++;
            if (arr[i].id === val) return i;
        }
        return -1;
    }

    function binarySearch(val) {
        let left = 0, right = arr.length - 1;
        while (left <= right) {
            numOfLoops++;
            let mid = Math.floor((left + right) / 2);
            if (val === arr[mid].id) return mid; // found!
            else if (val < arr[mid].id) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1;
    }

    function binarySearchShifted(val, arr, pointers) {
        if (!pointers) {
            pointers = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id > arr[(i + 1).mod(arr.length)].id) {
                    pointers.push((i + 1).mod(arr.length));
                    pointers.push(i);
                    break;
                }
            }
        }
        while (pointers[0] !== pointers[1]) {
            numOfLoops++;
            let pointersReverse = (pointers[1] < pointers[0]);
            let mid = Math.floor((pointers[0] + pointers[1] + (pointersReverse ? arr.length : 0)) / 2).mod(arr.length);
            if (val === arr[mid].id) return mid; // found!
            else if (val < arr[mid].id) {
                pointers[1] = mid.mod(arr.length);
            } else {
                pointers[0] = mid.mod(arr.length);
            }
        }
        return -1;
    }

    // random index & val search
    let randomIndex = h.getRandomInteger(0, arr.length), randomVal = arr[randomIndex].id;
    l("We're gon' be looking for id:", randomVal, "at arr[" + randomIndex + "]");
    printf("We're gon' be looking for id: " + randomVal + " at arr[" + randomIndex + "]", moduleRoot);

    t1 = Date.now();
    numOfLoops = 0;
    let foundIndex1 = linearSearch(randomVal);
    t2 = Date.now();
    l("foundIndex (w/linear search):", foundIndex1); // find index by val (w/linear search)
    printf("foundIndex (w/linear search): " + colored(foundIndex1) + (foundIndex1 !== -1 ? ' (Full Name: ' + colored(arr[foundIndex1].getFullName()) + ')' : '') + ' [in ' + colored(numOfLoops, 'green') + ' steps]' + getTimeDifHtml(t1, t2), moduleRoot);

    t1 = Date.now();
    numOfLoops = 0;
    let foundIndex2 = binarySearch(randomVal);
    t2 = Date.now();
    l("foundIndex (w/binary search):", foundIndex2); // find index by val (w/binary search)
    printf("foundIndex (w/binary search): " + colored(foundIndex2) + (foundIndex2 !== -1 ? ' (Full Name: ' + colored(arr[foundIndex2].getFullName()) + ')' : '') + ' [in ' + colored(numOfLoops, 'green') + ' steps]' + getTimeDifHtml(t1, t2), moduleRoot);

    // non-existing val case
    let customVal = 3;
    l("We're gon' be looking for val:", customVal, "which is not in the array.");
    printf("We're gon' be looking for id: " + customVal + " which is not in the array.", moduleRoot);

    t1 = Date.now();
    numOfLoops = 0;
    foundIndex1 = linearSearch(customVal);
    t2 = Date.now();
    l("foundIndex (w/linear search):", foundIndex1); // find index by val (w/linear search)
    printf("foundIndex (w/linear search): " + colored(foundIndex1) + (foundIndex1 !== -1 ? ' (Full Name: ' + colored(arr[foundIndex1].getFullName()) + ')' : '') + ' [in ' + colored(numOfLoops, 'green') + ' steps]' + getTimeDifHtml(t1, t2), moduleRoot);

    t1 = Date.now();
    numOfLoops = 0;
    foundIndex2 = binarySearch(customVal);
    t2 = Date.now();
    l("foundIndex (w/binary search):", foundIndex2); // find index by val (w/binary search)
    printf("foundIndex (w/binary search): " + colored(foundIndex2) + (foundIndex2 !== -1 ? ' (Full Name: ' + colored(arr[foundIndex2].getFullName()) + ')' : '') + ' [in ' + colored(numOfLoops, 'green') + ' steps]' + getTimeDifHtml(t1, t2), moduleRoot);

    // Shifted Sorted Array
    $("<h3>").text('Shifted Sorted Array Case').appendTo(moduleRoot);

    t1 = Date.now();
    let randomRightShift = h.getRandomInteger(1, arr.length - 1);
    let shiftedArr = h.shiftArray(arr, 'right', randomRightShift); // shift right random times
    t2 = Date.now();

    printf("Let's right-shift our array " + colored(randomRightShift) + " times and see the shifted state: <br>[" +
        JSON.stringify(shiftedArr[0]) + ',' + JSON.stringify(shiftedArr[1]) + ',' + JSON.stringify(shiftedArr[2]) + ' ... ' + JSON.stringify(shiftedArr[shiftedArr.length - 3]) + ',' + JSON.stringify(shiftedArr[shiftedArr.length - 2]) + ',' + JSON.stringify(shiftedArr[shiftedArr.length - 1]) + ']'
        + getTimeDifHtml(t1, t2), moduleRoot);

    l("We're gon' be looking for id:", randomVal, "at shiftedArr[" + (randomIndex + randomRightShift).mod(shiftedArr.length) + "]");
    printf("We're gon' be looking for id: " + randomVal + " at shiftedArr[" + (randomIndex + randomRightShift).mod(shiftedArr.length) + "]", moduleRoot);

    t1 = Date.now();
    numOfLoops = 0;
    let foundIndexS = binarySearchShifted(randomVal, shiftedArr, [randomRightShift, randomRightShift - 1]);
    t2 = Date.now();
    l("foundIndex (w/binary search shifted):", foundIndexS); // find index by val (w/binary search shifted)
    printf("foundIndex (w/binary search shifted): " + colored(foundIndexS) + (foundIndexS !== -1 ? ' (Full Name: ' + colored(shiftedArr[foundIndexS].getFullName()) + ')' : '') + ' [in ' + colored(numOfLoops, 'green') + ' steps + ' + colored(randomRightShift, 'green') + ' more steps (if we don\'t have the left-right pointers at the beginning)]' + getTimeDifHtml(t1, t2), moduleRoot);
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");