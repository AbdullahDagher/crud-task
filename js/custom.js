$(document).ready(function () {
   'use strict';

    function getAllData() {
        $.ajax({
            url: 'getAllData.php',
            dataType: 'text',
            success: function (data) {
                $('tbody').html(data);
            },
            error: function (xhr, status, error) {
                console.log(error);
                console.log(JSON.parse(xhr.responseText));
                console.log(xhr);
            }
        });
    }
    getAllData();

    $('#search-button').on('click', function () {
        var bookName = $('#search-input').val();
        if(bookName !=''){
            $.ajax({
               url: 'search.php',
                method: 'POST',
                data: {
                   bookName: bookName
                },
                dataType: 'text',
                success: function (data) {
                    $('tbody').html(data);
                }
            });
        }
    });


    $(document).on('click', '.delete', function () {
        var id = $(this).data('id'),
            popup = $('#delete-popup');
        popup.find('#confirm-delete').attr('data-delete-id', id);
        popup.fadeIn();
        popup.find('.popup-content').addClass('popup-animate');
    });

    $(document).on('click', '.cancel', function () {
        var popup = $('.popup');
        popup.fadeOut();
        popup.find('.popup-content').removeClass('popup-animate');
    });

    $(document).on('click', '.edit', function () {
        var id = $(this).data('id'),
            popup = $('#update-popup');
        $.ajax({
            url: 'getDataForUpdate.php',
            method: 'POST',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (data) {
                popup.find('#book-name').val(data.bookName);
                popup.find('#author-name').val(data.authorName);
            },
            error: function (xhr, status, error) {
                console.log(error);
                console.log(JSON.parse(xhr.responseText));
                console.log(xhr);
            }
        });
        popup.find('#update').attr('data-update-id', id);
        popup.fadeIn();
        popup.find('.popup-content').addClass('popup-animate');
    });

    $('#update').on('click', function () {
        var id = $(this).attr('data-update-id'),
            popup = $('#update-popup'),
            bookName = popup.find('#book-name').val(),
            authorName = popup.find('#author-name').val();
        if(bookName != '' && authorName != ''){
            $('#update-message').html('');
            $.ajax({
                url: 'updateBook.php',
                method: 'POST',
                dataType: 'text',
                data: {
                    id: id,
                    bookName: bookName,
                    authorName: authorName,
                },
                success: function (data) {
                    if(data = 'Done'){
                        popup.fadeOut();
                        getAllData();
                        $('#message').html('<div class="alert alert-success">Book updated successfully</div>');
                    }
                }
            });
        }else{
            $('#update-message').html('<div class="alert alert-danger">Both fields are required</div>');
        }
    });

    $(document).on('click', '#confirm-delete',function () {
        var id = $(this).attr('data-delete-id');
        $.ajax({
            url: 'deleteBook.php',
            method: 'POST',
            dataType: 'text',
            data: {
                id: id
            },
            success: function (data) {
                if(data == 'Done'){
                    $('#delete-popup').fadeOut();
                    getAllData();
                    $('#message').html('<div class="alert alert-success">Book deleted successfully</div>');
                }
            },
            error: function (xhr, status, error) {
                console.log(error);
                console.log(JSON.parse(xhr.responseText));
                console.log(xhr);
            }
        })
    });


   $(document).on('click', '#add', function () {
        var bookName = $('#book-name').val(),
            authorName = $('#author-name').val();
        if(bookName != '' && authorName != ''){
            $('#message').html('');
            $.ajax({
                url: 'addData.php',
                method: 'POST',
                dataType: 'text',
                data: {
                    bookName: bookName,
                    authorName: authorName,
                },
                success: function (data) {
                    if(data = 'Done'){
                        getAllData();
                        $('#message').html('<div class="alert alert-success">Book inserted successfully</div>');
                    }
                }
            });
        }else{
            $('#message').html('<div class="alert alert-danger">Both fields are required</div>');
        }
   });
});