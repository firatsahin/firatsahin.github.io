(function () {
    // module globals here
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let octaveMinMax = [0, 8];

    moduleOn = () => {
        let moduleRoot = rootDiv.find(">div");
        l("module on called");

        let keyboardDiv = moduleRoot.find("#keyboard-root");

        // keyboard drawing
        for (let i = octaveMinMax[0]; i <= octaveMinMax[1]; i++) { // octaves loop
            notes.forEach(function (note) { // notes loop
                let noteDiv = $("<div>").addClass('kb-note').data({octave: i, note: note});
                if (note[1] === '#') noteDiv.addClass('kb-note-black');
                noteDiv.html('<span>' + (note + i) + '</span>').appendTo(keyboardDiv);
            });
        }
        keyboardDiv.css('width', 25 * 7 * (octaveMinMax[1] - octaveMinMax[0] + 1));

        // table creation
        let nfTable = $("#note-freq-table");

        // render table pre-header
        let nfTPreHeader = $("<tr>");
        $("<th>").html('<div style="position: relative;"><span style="position: absolute; transform: rotate(-90deg); margin: -7px 0 0 -23px;">«NOTES</span></div>').attr('rowspan', 2).appendTo(nfTPreHeader);
        $("<th>").text('OCTAVES').attr('colspan', octaveMinMax[1] - octaveMinMax[0] + 1).appendTo(nfTPreHeader);
        nfTPreHeader.appendTo(nfTable);

        // render table header
        let nfTHeader = $("<tr>");
        //$("<th>").text('').appendTo(nfTHeader);
        for (let i = octaveMinMax[0]; i <= octaveMinMax[1]; i++) $("<th>").text(i).appendTo(nfTHeader);
        nfTHeader.appendTo(nfTable);

        // render table rows
        notes.forEach(function (note, k) { // notes loop
            let nfTRow = $("<tr>");
            $("<td>").html('<b>' + note + '</b>').appendTo(nfTRow);
            for (let i = octaveMinMax[0]; i <= octaveMinMax[1]; i++) { // octaves loop
                let a4hz = 440, noteIndex = (k - 9);

                let noteHz = a4hz * Math.pow(Math.pow(2, noteIndex), 1 / 12); // each note's Hz calculation (for 4th octave)
                noteHz *= Math.pow(2, i - 4); // each octave's Hz calculation

                noteHz = parseFloat(noteHz.toFixed(1)); // float value normalization

                $("<td>").addClass('td-frequency').data({octave: i, note: note}).html(noteHz).appendTo(nfTRow);
            }
            nfTRow.appendTo(nfTable);
        });

        keyboardDiv.on('mousedown touchstart', '.kb-note', function (e) {
            keyboardDiv.find('.kb-note.active').removeClass('active');
            $(this).addClass('active');

            let noteData = $(this).data();
            nfTable.find("td.td-frequency").filter(function () {
                let tdData = $(this).data();
                return (tdData.octave === noteData.octave && tdData.note === noteData.note);
            }).addClass('active');
        });

        $(document).on('mouseup.notes-and-freq touchend.notes-and-freq', function () {
            keyboardDiv.find('.kb-note.active').removeClass('active');
            nfTable.find("td.td-frequency.active").removeClass('active');
        });

        if (typeof window.ontouchstart !== 'object') keyboardDiv.find('.kb-note').css('cursor', 'pointer'); // cursor pointer (only for desktop)
    }

    moduleOff = () => {
        l("module off called");

        $(document).off('mouseup.notes-and-freq touchend.notes-and-freq'); // clear global event
    }

    l("module on-off events loaded");

})();