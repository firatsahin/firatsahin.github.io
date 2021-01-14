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
            printf(" -> Hey! Found the celebrity on index:" + celebCandidate + getTimeDifHtml(t1, t2), logDiv);
        } else {
            l("No celebrities in the party");
            printf(" -> No celebrities in the party right now." + getTimeDifHtml(t1, t2), logDiv);
        }
    }

    findTheCelebrity(); // with no celeb in the party

    // make a random person celebrity in the party
    let celebIndex = h.getRandomInteger(0, arr.length);
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
    t1 = Date.now();
    let groupBy = [];
    for (let i = 0; i < arr.length; i++) {
        let foundIndex = groupBy.findIndex(function (o) { // js Array prototype's findIndex() function usage
            return o.val === arr[i];
        });
        if (foundIndex === -1) {
            groupBy.push({
                val: arr[i],
                howMany: 1
            });
        } else groupBy[foundIndex].howMany++;
    }
    // sort the array (fewer values first)
    groupBy.sort(function (o1, o2) {
        return o1.howMany < o2.howMany ? -1 : (o1.howMany > o2.howMany ? 1 : 0);
    });
    t2 = Date.now();
    l(groupBy);
    printf('<pre>Values (group by val & order by howMany/ascending): <code>' + JSON.stringify(groupBy, null, 4) + '</code></pre>' + getTimeDifHtml(t1, t2), logDiv);

    // swap 2 fields in an array (for testing)
    //groupBy.swap(1, 3);
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");