(function () {
    // module globals here
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let octaveMinMax = [0, 8];
    let scales = { // major & minor scale formulas (note indexes which are included to the scale)
        major: [0, 2, 4, 5, 7, 9, 11],
        minor: [0, 2, 3, 5, 7, 8, 10]
    };
    let modes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
    let scaleNotes = [];

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
        let mTable = $("#modes-table");

        // render table header
        let mTHeader = $("<tr>");
        $("<th>").text('Note').appendTo(mTHeader);
        $("<th>").text('Mode').appendTo(mTHeader);
        $("<th>").text('Mode Notes').appendTo(mTHeader);
        $("<th>").html('<label><input type="checkbox" name="kb-showing-method" value="-1" checked="checked"> Paint Whole Scale</label>').css('text-align', 'left').appendTo(mTHeader);
        mTHeader.appendTo(mTable);

        modes.forEach(function (mode, i) { // modes loop
            let mTRow = $("<tr>");
            let td = $("<td>").appendTo(mTRow);
            let notesDdl = $("<select>").addClass('notes-ddl').attr('index-in-scale', scales.major[i]);
            notes.forEach(function (note, j) { // notes loop
                $("<option>").attr('value', j).text(note).appendTo(notesDdl);
            });
            notesDdl.appendTo(td);
            $("<td>").text(mode + (i === 0 ? '(major)' : i === 5 ? '(minor)' : i === 2 ? '(karar)' : '')).appendTo(mTRow);
            $("<td>").addClass('mode-notes-td').appendTo(mTRow);
            $("<td>").html('<label><input type="checkbox" name="kb-showing-method" value="' + i + '"> Paint ' + mode + ' Mode</label>').appendTo(mTRow);
            mTRow.appendTo(mTable);
        });

        // modes dropdowns > change event
        mTable.on("change", "select.notes-ddl", function () {
            let selectedIndex = $(this).val(), indexInScale = parseInt($(this).attr('index-in-scale')),
                rootNoteIndex = (selectedIndex - indexInScale).mod(notes.length);

            // sync all ddls
            mTable.find("select.notes-ddl").each(function () {
                let indexInScale = parseInt($(this).attr('index-in-scale'));
                $(this).prop('selectedIndex', (rootNoteIndex + indexInScale).mod(notes.length));
            });

            // calculate scale notes
            scaleNotes = []; // empty array
            scales.major.forEach(function (m) {
                scaleNotes.push(notes[(rootNoteIndex + m).mod(notes.length)]);
            });

            // write scale notes to the table
            mTable.find("tr td.mode-notes-td").each(function (i) {
                let text = '';
                for (let j = 0; j <= scaleNotes.length; j++) {
                    text += (j > 0 ? ' ' : '') + scaleNotes[(j + i).mod(scaleNotes.length)];
                }
                $(this).text(text);
            });
            paintKeyboardNotes();
        });

        // keyboard showing method checkboxes > check event
        mTable.on("change", "input[name=kb-showing-method]", function (e) {
            let val = $(this).prop('checked');
            if (!val) { // only checking allowed
                $(this).prop('checked', true);
                return;
            }
            mTable.find("input[name=kb-showing-method]").not(this).prop('checked', false); // uncheck others
            paintKeyboardNotes();
        });

        function paintKeyboardNotes() {
            let kbShowMethod = parseInt(mTable.find("input[name=kb-showing-method]").filter(function () {
                return $(this).prop('checked');
            }).attr('value'));
            keyboardDiv.find(".kb-note").removeClass('active'); // reset keyboard painting first
            if (kbShowMethod === -1) { // paint whole keyboard
                keyboardDiv.find(".kb-note").each(function () {
                    if (scaleNotes.indexOf($(this).data('note')) !== -1) $(this).addClass('active');
                });
            } else if (kbShowMethod >= 0) { // paint scale partially
                let startEndKeys = keyboardDiv.find(".kb-note").filter(function () { // painting start-end keys in an octave
                    return $(this).data('note') === scaleNotes[kbShowMethod] && [1, 2].indexOf($(this).data('octave')) !== -1;
                }).addClass('active');

                // painting mid-keys too
                startEndKeys.eq(0).nextUntil(startEndKeys.eq(1)).each(function () {
                    if (scaleNotes.indexOf($(this).data('note')) !== -1) $(this).addClass('active');
                });
            }
        }

        mTable.find("select.notes-ddl").first().trigger('change'); // initial event trigger
    }

    moduleOff = () => {
        l("module off called");
    }

    l("module on-off events loaded");

})();