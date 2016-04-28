$(document).ready(function() {
    var notesArray = [],
        count = 0;
    $('#add').on('click', function() {
        var title = $('#title').val(),
            content = $('#content').val(),
            date = new Date();

        if (title === "") {
            alert("Please enter a title for the note");
        } else {
            notesArray.push({
                id: count,
                title: title,
                content: content,
                date: date
            })
        }

        count++;

        $('#content').val('');
        $('#title').val('');

        listRefresh();
    })


    function listRefresh() {
        $('#list').empty();

        for (var i = 0; i < notesArray.length; i++) {
            var title = notesArray[i].title,
                date = notesArray[i].date,
                dateString,
                month,
                element;

            month = date.getMonth() + 1;
            dateString = date.getDate() + "/" + month + "/" + date.getFullYear();

            element = $('<li data-id="' + notesArray[i].id + '" data-title="' + notesArray[i].title + '">');

            element.append($('<div class="div-title">').text(title));
            element.append($('<div class="div-date">').text(dateString));

            $('#list').append(element);
        }
    }

    $('#list').on('click', 'li', function() {
        var id = $(this).data('id'),
            content = '',
            title = $(this).data('title');
        debugger;


        console.log("title: ", title)
        $('#list li.selected').removeClass('selected');
        $(this).addClass('selected');

        for (var i = 0; i < notesArray.length; i++) {
            if (notesArray[i].id === id) {
                content = notesArray[i].content;
            }
        }

        $('#edit-title').val(title);
        $('#edit-content').val(content);
        $('#div-edit').removeClass('hide');
    })



    
    $('#save').on('click', function() {
        var id = $('#list li.selected').data('id'),
            title = $('#edit-title').val(),
            content = $('#edit-content').val();

        for (var i = 0; i < notesArray.length; i++) {
            if (notesArray[i].id === id) {
                notesArray[i].title = title;
                notesArray[i].content = content;
                break;
            }
        }

        listRefresh();

        $('#list li[data-id="' + id + '"]').addClass('selected');

    })

    $('#cancel').on('click', function() {
        $('#div-edit').addClass('hide');
        $('#list li.selected').removeClass('selected');
    })

    $('#remove').on('click', function() {
        var id = $('#list li.selected').data('id');

        var r = confirm('Are you sure you want to remove this note?');
        if (r) {
            for (var i = 0; i < notesArray.length; i++) {
                if (notesArray[i].id === id) {
                    notesArray.splice(i, 1);
                    break;
                }
            }

            listRefresh();

            $('#div-edit').addClass('hide');
        }

    })

});