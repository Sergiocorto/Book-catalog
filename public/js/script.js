//Function for adding author via fetch request
$('#add_author').on('submit', function (e) {
    e.preventDefault()
//Create request
    fetch($(this).attr('action'), {
        method: 'POST',
        body: new FormData(this)
    })
        .then(response => response.json())
        .then((author) => {
//In case of successful recording, we display a success message and add the author's card to the screen
            alertShow($('#successAlert'))
            $('.body').append(createAuthorCard(author))
        })
//In case of an error, we output it to the console and inform the user about the error.
        .catch((e) => {
            console.log(e)
            alertShow($('#errorAlert'))
        })
})

//Function for adding a book through a fetch request
$('#add_book').on('submit', function (e) {
    e.preventDefault()
//Create an array for storing author IDs and put data from the form into it
    let authorsId = createAuthorIdArray($("span[name='author']"))
//Create form data variables
    let data = new FormData(this)
    data.append('authorsId', authorsId)
//Create request
    fetch($(this).attr('action'), {
        method: 'POST',
        body: data
    })
        .then(response => response.json())
        .then((book) => {
//In case of successful recording, we display a success message and add the book card to the screen
            alertShow($('#successAlert'))
            showBookCard(book)
        })
//In case of an error, we output it to the console and inform the user about the error.
        .catch((e) => {
            console.log(e)
            alertShow($('#errorAlert'))
        })
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
$('#edit_author').on('submit',function (e) {
    e.preventDefault()
//Create request
    fetch($(this).attr('action'), {
        method: 'PATCH',
        body: new FormData(this)
    })
        .then(response => response.json())
        .then((author) => {
//In case of a successful entry, we display a success message and edit the author's card
            alertShow($('.alert-success'))
            editAuthorCard(author)
        })
//In case of an error, we output it to the console and inform the user about the error.
        .catch((e) => {
            console.log(e)
            alertShow($('.alert-danger'))
        })
})

//Function for sending a request to delete an author
function deleteAuthor(btn) {

    fetch($(btn).data('link'), {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then((id) => {
//In case of successful recording, we display a message about success and delete the mmmmmm card of the author
            alert('Автор удален')
            $('.author-' + id).remove()
        })
//In case of an error, we output it to the console and inform the user about the error.
        .catch((e) => {
            alert("Произошла ошибкаб попробуйте еще раз")
            console.log(e)
        })
}

//Function of sending a request to delete a book
function deleteBook(btn) {

    fetch($(btn).data('link'), {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then((book) => {
//In case of successful recording, we display a success message and double the book card
            alert('Книга ' + book.title + 'удалена' )
            $(`#book-${book.title}`).remove()
        })
//In case of an error, we output it to the console and inform the user about the error.
        .catch((e) => {
            alert("Произошла ошибкаб попробуйте еще раз")
            console.log(e)
        })
}

//Function for sorting authors by last name
//The function takes the pressed button as a parameter
function sortAuthors(btn){
    let sortValue = $(btn).data('sort')
    let url = '/api/authors/sort/' + sortValue

//Create a request to the server
    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((authors) => {
//In case of success, display a sorted list of authors
            refreshList(authors, 'authors')
        })
//In case of an error, we output it to the console and inform the user about the error.
        .catch((e) => {
            alert("Произошла ошибка попробуйте еще раз")
            console.log(e)
        })
}

//Function sorted books list
function sortBooks(btn){
    let sortValue = $(btn).data('sort')
    let url = '/api/books/sort/' + sortValue

//Create a request to the server
    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((books) => {
//In case of success, display a sorted list of books
            console.log(books)
            refreshList(books, 'books')
        })
 //In case of an error, we output it to the console and inform the user about the error.
        .catch((e) => {
            alert("Произошла ошибка попробуйте еще раз")
            console.log(e)
        })
}

//Search function for authors by last name and first name
function searchAuthors() {
//Create variable request addresses
    let search = $('#search').val()
    let url = '/api/authors/search/' + search
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then((authors) => {
//If successful, display a list of authors
            refreshList(authors)
        })
//In case of an error, we output it to the console and inform the user about the error.
        .catch((e) => {
            alert("Произошла ошибкаб попробуйте еще раз")
            console.log(e)
        })
}

//Book search function by title
function searchBooks() {
//Create variable request addresses
    let search = $('#search').val()
    let url = '/api/books/search/' + search
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then((books) => {
//In case of success, we display a list of books
            refreshList(books)
        })
//In case of an error, we output it to the console and inform the user about the error.
        .catch((e) => {
            alert("Произошла ошибкаб попробуйте еще раз")
            console.log(e)
        })
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
                    "<button type=\"button\" class=\"btn btn-danger\" onClick=\"deleteAuthor(this)\" data-link=\"/api/authors/{{_id}}\">\n" +
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
                            "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteBook(this)\" data-link=\"/api/books/{{_id}}\">\n" +
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