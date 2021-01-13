moduleOn = () => {
    let moduleRoot = rootDiv.find(">div");
    l("module on called");

    let arr = [];
    let arrLength = 1000000;
    let t1 = Date.now();
    for (let i = 0; i < arrLength; i++) arr.push(getRandomInteger(0, 10));
    let t2 = Date.now();
    l("array creation:", t2 - t1, "ms");
    l("arr:", arr);
    printf("array created(length:" + arrLength + ") with random values [0~10]: " + JSON.stringify(arr) + "<br/>in " + (t2 - t1) + "ms", moduleRoot);

    function knows(a, b) { // returns if a knows b
        return arr[a] <= arr[b];
    }

    function findTheCelebrity() {
        let logDiv = printf("Trying to find the celebrity...", moduleRoot);
        t1 = Date.now();
        let celebCandidate = 0;
        for (let i = celebCandidate + 1; i < arr.length; i++) {
            if (knows(celebCandidate, i)) { // this means; this person is not celebrity
                celebCandidate = i;
            }
        }
        let isReallyCeleb = true;
        for (let i = 0; i < celebCandidate; i++) {
            if (knows(celebCandidate, i)) {
                isReallyCeleb = false;
                break;
            }
        }
        t2 = Date.now();
        if (isReallyCeleb) {
            l("Found celebrity on index:", celebCandidate, "in", t2 - t1, "ms");
            printf(" -> Hey! Found the celebrity on index:" + celebCandidate + "<br/>in " + (t2 - t1) + "ms", logDiv);
        } else {
            l("No celebrities in the party");
            printf(" -> No celebrities in the party right now." + "<br/>in " + (t2 - t1) + "ms", logDiv);
        }
    }

    findTheCelebrity(); // with no celeb in the party

    // make a random person celebrity in the party
    let celebIndex = getRandomInteger(0, arr.length);
    arr[celebIndex] = 11;
    l("we made arr[" + celebIndex + "] celebrity");
    printf("we made arr[" + celebIndex + "] celebrity", moduleRoot);

    findTheCelebrity(); // with a celeb in the party

    // make one more person celebrity
    let celeb2Index = celebIndex === 0 ? celebIndex + 1 : celebIndex - 1;
    arr[celeb2Index] = 11;
    l("we made arr[" + celeb2Index + "] celebrity too (2 celebrities now)");
    printf("we made arr[" + celeb2Index + "] celebrity too (2 celebrities now)", moduleRoot);

    findTheCelebrity(); // with a celeb in the party

    // group by
    let logDiv = printf("", moduleRoot);

    function searchByVal(val) {
        for (let i = 0; i < groupBy.length; i++) {
            if (groupBy[i].val === val) return i;
        }
        return -1;
    }

    t1 = Date.now();
    let groupBy = [];
    for (let i = 0; i < arr.length; i++) {
        let foundIndex = searchByVal(arr[i]);
        if (foundIndex === -1) {
            groupBy.push({
                val: arr[i],
                howMany: 1
            });
        } else groupBy[foundIndex].howMany++;
    }
    t2 = Date.now();
    l(groupBy);
    printf('<pre>Values (grouped by): <code>' + JSON.stringify(groupBy, null, 4) + '</code></pre>' + "<br/>in " + (t2 - t1) + "ms", logDiv);
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");