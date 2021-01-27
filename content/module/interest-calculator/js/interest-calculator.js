moduleOn = () => {
    let moduleRoot = rootDiv.find(">div");
    l("module on called");

    // HELPERS - BEGIN
    let normalizeFloatForView = (float, digits) => {
        if (!digits) digits = 2;
        let floatSegments = parseFloat(float).toFixed(digits).split('.');
        let isNegative = false;
        if (floatSegments[0][0] === '-') {
            isNegative = true;
            floatSegments[0] = floatSegments[0].replace('-', '');
        }
        let floatAsStr = ',' + floatSegments[1];
        for (let i = floatSegments[0].length - 1; i >= 0; i--) {
            let dotNeeded = ((floatSegments[0].length - i).mod(3) === 1 && floatSegments[0].length - i !== 1);
            floatAsStr = floatSegments[0][i] + (dotNeeded ? '.' : '') + floatAsStr;
        }
        if (isNegative) floatAsStr = '-' + floatAsStr;
        return floatAsStr;
    };
    // HELPERS - END

    $("[binding='in.baseAmount']").val(100000);
    $("[binding='in.yearlyRate']").val(15.5);
    $("[binding='in.taxDeducted']").val(5);

    $("button[name=btn-calculate-interest]").click(function () {
        let inObj = {};
        $("[binding^='in.']").each(function () {
            let colname = $(this).attr('binding').replace('in.', '');
            inObj[colname] = parseFloat($(this).val());
        });
        l("inObj:", inObj);
        let outObj = {yearlyInterestG: (inObj.baseAmount * inObj.yearlyRate / 100)};
        outObj.realInterestRate = inObj.yearlyRate * (100 - inObj.taxDeducted) / 100;
        outObj.yearlyInterestN = (inObj.baseAmount * outObj.realInterestRate / 100);
        outObj.monthlyAvgInterestG = (outObj.yearlyInterestG / 12);
        outObj.monthlyAvgInterestN = (outObj.yearlyInterestN / 12);
        outObj.dailyInterestG = (outObj.yearlyInterestG / 365);
        outObj.dailyInterestN = (outObj.yearlyInterestN / 365);
        outObj.day30InterestG = (outObj.dailyInterestG * 30);
        outObj.day30InterestN = (outObj.dailyInterestN * 30);
        l("outObj:", outObj);
        $("[binding^='out.']").each(function () {
            let colname = $(this).attr('binding').replace('out.', '');
            $(this).text(normalizeFloatForView(outObj[colname]));
        });
    });
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");