(function () {
    // module globals here
    let moduleRoot = rootDiv.find(">div");
    let ulRoot = moduleRoot.find("#user-list-root");
    let fbaseApp = null; // firebase app object

    moduleOn = () => {
        l("module on called");

        // Initialize Firebase (if not initialized before)
        fbaseApp = fbaseH.startApp(fbaseApp);
        l("started2->", fbaseApp);

        // read data (once: gets once | on: keeps listening)
        firebase.database().ref('users').orderByChild('age').on('value', (snapshot) => {
            const data = snapshot.val();
            l('value event', data);
            ulRoot.empty();
            for (const key in data) {
                let user = data[key];
                $("<div>").addClass('user-div').attr('data-key', key).html('Full Name: <input type="text" binding="user-' + key + '.name" value="' + user.name + '" required>'
                    + '<input type="text" binding="user-' + key + '.surname" value="' + (user.surname ? user.surname : '') + '">'
                    + '\nAge: <input type="number" binding="user-' + key + '.age" value="' + user.age + '" required>' + ' <a href="#" name="btn-delete-user">Delete User</a>'
                    + ' <span style="font-size: 11px; color: gray;">LastModified: ' + new Date(user.lmDatetime) + '</span>').appendTo(ulRoot);
            }
        });

        // child events (advantage: returns only affected child node instead of whole list)
        firebase.database().ref('users').on('child_added', (snapshot) => {
            const key = snapshot.key;
            const data = snapshot.val();
            l('child_added event', key, data);
        });
        firebase.database().ref('users').on('child_changed', (snapshot) => {
            const key = snapshot.key;
            const data = snapshot.val();
            l('child_changed event', key, data);
        });
        firebase.database().ref('users').on('child_removed', (snapshot) => {
            const key = snapshot.key;
            const data = snapshot.val();
            l('child_removed event', key, data);
        });

        // add data (insert)
        $("button[name=btn-add-user]").click(function () {
            let user = {}, valid = true;
            $("[binding^='user.']").each(function () {
                let colname = $(this).attr('binding').replace('user.', '');
                if ($(this).attr('required') && !$(this).val()) valid = false;
                user[colname] = $(this).val() || null;
            });
            if (!valid) return;
            user.age = parseInt(user.age);
            if (isNaN(user.age)) return;
            user.lmDatetime = Date.now();
            l(user);
            let insertedKey = firebase.database().ref('users').push(user).key;
            l("insertedKey:", insertedKey);
            $("[binding^='user.']").val(''); // clear fields after add new
        });

        // update data
        ulRoot.on("blur", "input[binding^='user-']", function () {
            let key = $(this).closest("div.user-div").attr('data-key');
            let colname = $(this).attr('binding').replace('user-' + key + '.', '');
            if ($(this).attr('required') && !$(this).val()) return;
            let val = $(this).val();
            if (colname === 'age') val = parseInt(val);
            let updates = {};
            updates[key + '/' + colname] = val || null;
            updates[key + '/lmDatetime'] = Date.now();
            firebase.database().ref('users').update(updates);
        });

        // delete data
        ulRoot.on("click", "a[name=btn-delete-user]", function () {
            let key = $(this).closest("div.user-div").attr('data-key');
            firebase.database().ref('users/' + key).remove();

            /*// long way to delete below (advantage: supports multiple deletes in 1 query)
            let updates = {};
            updates[key] = null;
            firebase.database().ref('users').update(updates);*/
        });

    }

    moduleOff = () => {
        l("module off called");

        if (fbaseH.isAppStarted()) {
            firebase.database().ref('users').off(); // destroy listener
            fbaseApp = fbaseH.stopApp(fbaseApp); // destroy app too
            l("stopped2->", fbaseApp);
        }
    }

    l("module on-off events loaded");
})();