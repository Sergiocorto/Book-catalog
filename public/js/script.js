//Function for adding author via fetch request
$('#add_author').on('submit', async function (e) {
    e.preventDefault()

    const res = await requestToBackend($(this).attr('action'), 'POST', new FormData(this))

    if (!checkIsError(res)) {
        alertShow($('#successAlert'))
        $('.body').append(createAuthorCard(res.data))
    }
})

//Function for adding a book through a fetch request
$('#add_book').on('submit', async function (e) {
    e.preventDefault()
//Create an array for storing author IDs and put data from the form into it
    let authorsId = createAuthorIdArray($("span[name='author']"))
//Create form data variables
    let data = new FormData(this)
    data.append('authorsId', authorsId)

    console.log(data.image)
    const res = await requestToBackend($(this).attr('action'), 'POST', data)

    if(!checkIsError(res)) {
        alertShow($('#successAlert'))
        showBookCard(res.data)
    }
})

//Function to open the author edit window
$("[name='authorForm']").on('submit', function (e) {
    e.preventDefault()

    let authorNameBox = $(this).children(".authorName")

    $("input[name='authorId']").val(authorNameBox.children("input[name='id']").val())
    $("input[name='lastname']").val(authorNameBox.children("p[name='lastname']").text())
    $("input[name='name']").val(authorNameBox.children("p[name='name']").text())
    $("input[name='patronymic']").val(authorNameBox.children("p[name='patronymic']").text())
})

//Function for sending a request to edit an author
$('#edit_author').on('submit',async function (e) {
    e.preventDefault()

    const res = await requestToBackend($(this).attr('action'), 'PATCH', new FormData(this))

    if (!checkIsError(res)) {
        alertShow($('.alert-success'))
        editAuthorCard(res.data)
    }
})

//Function for sending a request to delete an author
async function deleteAuthor(btn) {

    const res = await requestToBackend($(btn).data('link'), 'DELETE')

    if(!checkIsError(res)) {
        alert('Автор удален')
        $('.author-' + res.data).remove()
    }
}

//Function of sending a request to delete a book
async function deleteBook(btn) {

    const res = await requestToBackend($(btn).data('link'), 'DELETE')
    const book = res.data

    if(!checkIsError(res)) {
        alert('Книга ' + book.title + 'удалена' )
        $(`#book-${book.title}`).remove()
    }
}

//Function for sorting authors/books
//The function takes the pressed button as a parameter
async function sort(btn) {

    const res = await requestToBackend($(btn).data('url'), 'GET')

    if (!checkIsError(res)) {
        refreshList(res.data, $(btn).data('flag'))
    }
}

//Search function for authors/books
async function search(btn) {
//Create variable request addresses
    let url = $(btn).data('url') + $('#search').val()

    const res = await requestToBackend(url, 'GET')

    if (!checkIsError(res)) {
        refreshList(res.data, $(btn).data('flag'))
    }
}

//Function on / off the search button depending on the presence of text in the search input field
$('#search').on('input', function () {
    if($(this).val()){
        $('#searchBtn').removeAttr('disabled')
    }else{
        $('#searchBtn').attr('disabled', 'disabled')
    }
})

//The function of adding an author to the list of authors when creating a new book
function addToList(select){

    let authorName = select.options[select.selectedIndex].text

    $('#authorsList').append($('<span>', {
        class: 'badge badge-light',
        text: authorName,
        value: select.value,
        name: 'author'
    }))
}

//Author card creation function
function createAuthorCard(author) {
    return $("<div class=\"card w-100 author-" + author._id + "\">\n" +
        "<div class=\"card-body\">\n" +
            "<form name=\"authorForm\">\n" +
                "<div class=\"authorCard authorName author-" + author._id + "\">\n" +
                    "<p class=\"name\" id=\"lastname\" onformdata=\"lastname\">" + author.lastname + "</p>\n" +
                    "<p class=\"name\" id=\"name\">" + author.name + "</p>\n" +
                    "<p class=\"name\" id=\"patronymic\">" + author.patronymic +"</p>\n" +
                    "<input class=\"name\" name=\"id\" readOnly type=\"hidden\" value=\"" + author._id + "\">\n" +
                "</div>\n" +
                "<div class=\"btn-group btn-card authorCard\">\n" +
                    "<button type=\"submit\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#editModalWindow\">\n" +
                        "Edit\n" +
                    "</button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger\" onClick=\"deleteAuthor(this)\" data-link=\"/api/authors/"+ author._id +"\">\n" +
                        "Delete\n" +
                    "</button>\n" +
                "</div>\n" +
            "</form>\n" +
        "</div>\n" +
    "</div>")
}

//Book card creation function
function createBookCard(book) {

    return $(
        "<div id=\"book-"+ book.title +"\" class=\"card mb-8\" style=\"max-width: 740px;\">\n" +
            "<div class=\"row g-0\">\n" +
                "<div class=\"col-md-2\">\n" +
                    "<img class=\"book-img\" src=\"/uploads/" + book.image + "\">\n" +
                "</div>\n" +
                "<div class=\"col-md-8\">\n" +
                    "<div class=\"card-body " + book.title + "\">\n" +
                        "<h5 class=\"card-title\">" + book.title + "</h5>\n" +
                        "<p class=\"card-text\">" + book.description + "</p>\n" +
                        "<label>Авторы</label>\n" +
                    "</div>\n" +
                "</div>\n" +
                "<div class=\"col-md-2\">\n" +
                    "<div class=\"card-body\">\n" +
                        "<div class=\"btn-group btn-card\">\n" +
                            "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteBook(this)\" data-link=\"/api/books/"+ book._id +"\">\n" +
                                "Delete\n" +
                            "</button>\n" +
                        "</div>\n" +
                    "</div>\n" +
                "</div>\n" +
            "</div>\n" +
        "</div>\n")
}
//The function of displaying authors in the book card when adding a new book
function showAuthor(authors, title) {
     return authors.forEach( (author) => {
        let authorName = '' + author.name + ' ' + author.lastname + ' ' + author.patronymic
        $(`.${title}`).append($('<span>', {
            class: 'badge badge-light',
            text: authorName
        }))
    })
}

//Author card editing function
function editAuthorCard(author) {
    $(`.author-${author._id}`).children("p[name='lastname']").text(author.lastname)
    $(`.author-${author._id}`).children("p[name='name']").text(author.name)
    $(`.author-${author._id}`).children("p[name='patronymic']").text(author.patronymic)
}

//function of updating the list of authors / books
function refreshList(array, flag) {
    
    switch (flag) {
        case 'authors' :
            $('.card').remove()
            array.forEach((author) => {
                $('.body').append(createAuthorCard(author))
            })
            break
        case 'books' :
            $('.card').remove()
            array.forEach((book) => {
                $('.body').append(createBookCard(book))
                $('.authors').append(showAuthor(book.authors, book.title))
            })
            break
    }
}

//Info message display function
function alertShow(alert) {
        alert.css('display', 'block')
        setTimeout(function(){
            alert.css('display', 'none')
        }, 3000)
}

//Function to create an array of author IDs
function createAuthorIdArray(span) {
    const authorsId = []
    span.each(function (index){
        authorsId.push($(this).attr('value'))
    })
    return authorsId
}
//The function of creating a book card
//when a response from the server about the successful addition of a book to the database
function showBookCard(book) {
    $('.body').append(createBookCard(book))
    $('.authors').append(showAuthor(book.authors, book.title))
}

//Function for request to backend
async function requestToBackend(url, method, body = null) {

    const res = {}
    await fetch(url, {
        method: method,
        body: body
    })
        .then(response => response.json())
        .then(data => res.data = data)
        .catch(e => res.e = e)
    return res
}

//Function checking for an error in response
function checkIsError(res) {
    if (res.e) {
        console.log(e)
        alertShow($('#errorAlert'))
        return true
    }
}