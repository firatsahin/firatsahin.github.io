moduleOn = () => {
    let moduleRoot = rootDiv.find(">div");
    l("module on called");

    const resultMs = moduleRoot.find("span[name='result-ms']"),
        resultBpm = moduleRoot.find("span[name='result-bpm']");
    let taps = [];

    // tap button click
    moduleRoot.find("button[name=btn-tap-n-calculate]").click(function () {
        taps.push(Date.now());
        moduleRoot.find("button[name=btn-reset]").show();
        if (taps.length > 1) {
            const avgMs = (taps[taps.length - 1] - taps[0]) / (taps.length - 1),
                avgBpm = 60000 / avgMs;
            resultMs.text(Math.round(avgMs));
            resultBpm.text(Math.round(avgBpm));
        }
    });

    // reset button click
    moduleRoot.find("button[name=btn-reset]").click(function () {
        resultMs.text("--");
        resultBpm.text("--");
        taps = [];
        $(this).hide();
    });
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");