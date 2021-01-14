moduleOn = () => {
    let moduleRoot = rootDiv.find(">div");
    l("module on called");

    let arr = [];
    let arrLength = 1000000;
    let t1 = Date.now();
    for (let i = 0; i < arrLength; i++) arr.push(h.getRandomInteger(0, 10));
    let t2 = Date.now();
    l("array creation:", t2 - t1, "ms");
    l("arr:", arr);
    printf("array created(length:" + arrLength + ") with random values [0~10]: " + JSON.stringify(arr) + getTimeDifHtml(t1, t2), moduleRoot);

    t1 = Date.now();
    let randIndex = h.getRandomInteger(0, arr.length);
    let b = arr[randIndex];
    t2 = Date.now();
    l("access random element:", t2 - t1, "ms");
    l("arr[" + randIndex + "]:", b);
    printf("access random element: " + "arr[" + randIndex + "]:" + b + getTimeDifHtml(t1, t2), moduleRoot);

    t1 = Date.now();
    let arrSum = 0;
    for (let i = 0; i < arr.length; i++) arrSum += arr[i];
    let arrAvg = arrSum / arr.length;
    t2 = Date.now();
    l("average calculation:", t2 - t1, "ms");
    l("arrAvg:", arrAvg);
    printf("average calculation: " + "arrAvg:" + arrAvg + getTimeDifHtml(t1, t2), moduleRoot);

    // calculate how many length:5 sub arrays has total % 10 = 0
    let subArrLength = 25;

    // howMany sub arrays (1st way)
    t1 = Date.now();
    let howMany = 0;
    for (let i = 0; i < arr.length - subArrLength + 1; i++) {
        let innerTotal = 0;
        //if (i < 10 || i > arr.length - subArrLength - 10) l("first index:", i + 0, "last index:", i + subArrLength - 1);
        for (let j = 0; j < subArrLength; j++) innerTotal += arr[i + j];
        if (innerTotal % 10 === 0) howMany++;
    }
    t2 = Date.now();
    l("sub array calculation:", t2 - t1, "ms");
    l("howMany sub arrays (1st way w/inner for loop):", howMany);
    printf("sub array calculation (1st way w/inner for loop): " + "howMany sub arrays(length:" + subArrLength + " AND total%10==0):" + howMany + getTimeDifHtml(t1, t2), moduleRoot);

    // howMany sub arrays (2nd way)
    t1 = Date.now();
    let howMany2 = 0;
    let currentTotal = 0;
    for (let i = 0; i < subArrLength; i++) currentTotal += arr[i]; // prepare current total for i=0 step
    for (let i = 0; i < arr.length - subArrLength + 1; i++) {
        if (i > 0) currentTotal = currentTotal - arr[i - 1] + arr[i + subArrLength - 1];
        if (currentTotal % 10 === 0) howMany2++;
    }
    t2 = Date.now();
    l("sub array calculation:", t2 - t1, "ms");
    l("howMany sub arrays (2nd way w/sliding total) (more efficient):", howMany2);
    printf("sub array calculation (2nd way w/sliding total) (more efficient): " + "howMany sub arrays(length:" + subArrLength + " AND total%10==0):" + howMany + getTimeDifHtml(t1, t2), moduleRoot);

    let integers = [121, -121, 10, -101, 0, 5, 4578921, 2442, 2589852, 258852, 6547896354123654, 33, 74];
    l("integers:", integers);
    printf("integer array created: " + JSON.stringify(integers), moduleRoot);

    function isPalindrome(x) { // palindrome test (without converting to string)
        if (x < 0) return false;
        let digits = [];
        let i = 1;
        while (x > 0) {
            let pow = Math.pow(10, i);
            let left = x % pow;
            digits.push(left / pow * 10);
            x -= left;
            i++;
        }
        //l("digits:",digits);
        if (digits.length > 1) {
            for (let i = 0; i < digits.length / 2; i++) {
                if (digits[i] !== digits[digits.length - 1 - i]) return false;
            }
            return true;
        } else return true;
    }

    function isPalindrome2(x) { // with converting to string (not used)
        x = x.toString();
        for (let i = 0; i < x.length / 2; i++) {
            if (x[i] !== x[x.length - 1 - i]) return false;
        }
        return true;
    }

    t1 = Date.now();
    let isPalindromeResults = [];
    for (let x in integers) isPalindromeResults.push(isPalindrome(integers[x]));
    t2 = Date.now();
    l("isPalindrome:", isPalindromeResults, "in", t2 - t1, "ms");
    printf("check if each integer in array is palindrome or not (without converting number to string): " + JSON.stringify(isPalindromeResults) + getTimeDifHtml(t1, t2), moduleRoot);

    // array[int] reverse (without using a temp variable)
    function reverseArray(arr) {
        for (let i = 0; i < Math.floor(arr.length / 2); i++) {
            // arr[i] | arr[arr.length-1-i]
            arr[arr.length - 1 - i] = arr[i] + arr[arr.length - 1 - i];
            arr[i] = arr[arr.length - 1 - i] - arr[i];
            arr[arr.length - 1 - i] = arr[arr.length - 1 - i] - arr[i];
        }
        return arr;
    }

    t1 = Date.now();
    reverseArray(integers);
    t2 = Date.now();
    l("reverse integer array (without using a temp variable):", integers, "in", t2 - t1, "ms");
    printf("reverse integer array (without using a temp variable): " + JSON.stringify(integers) + getTimeDifHtml(t1, t2), moduleRoot);
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");