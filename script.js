let myLibrary = [];

function Book (title, author, pages) {
  let read;
  this.title = title
  this.author = author
  this.pages = pages
  this.read = false;
}

Book.prototype.info = function() {
  let string = this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ';

  if(this.read){
    string += 'has been read'
  }
  else {
    string += 'not read yet'
  }

  return string;
}

function addBookToLibrary(){
  let title = prompt('title');
  let author = prompt('author');
  let pages = prompt('pages');
  let newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
}

  let libraryDiv = document.querySelector('.library');
  let newBookButton = document.querySelector('#new-book-button');

  newBookButton.addEventListener('click', function(){
  myLibrary = myLibrary.filter(function(str) { //clear empty array indexes
      return /\S/.test(str);
  });
  addBookToLibrary();
  libraryDiv.innerHTML = '';
  for(let i = 0; i < myLibrary.length; i++){

    let bookDiv = document.createElement('div');
    if(myLibrary[i] == undefined){
      continue; //if array index is blank, dont display book
    }
    bookDiv.textContent = myLibrary[i].info();
    bookDiv.classList.add('book')
    bookDiv.setAttribute('id', i);

    let removeBookButton = document.createElement('div');
    removeBookButton.classList.add('button')
    removeBookButton.textContent = 'Remove Book';
    removeBookButton.addEventListener('click', function(){
      delete myLibrary[i]; //not .slice() because we need to retain array position
      document.getElementById(i).remove();
    });

    let readButton = document.createElement('div');
    readButton.textContent = 'Read?'
    readButton.classList.add('button');

    if(myLibrary[i].read){
      bookDiv.classList.add('read');
    }

    readButton.addEventListener('click', function(){
      if(myLibrary[i].read){
        myLibrary[i].read = false;
        bookDiv.classList.remove('read');
      }
      else{
        myLibrary[i].read = true;
        bookDiv.classList.add('read');
      }
    });



    bookDiv.append(removeBookButton);
    bookDiv.append(readButton);
    libraryDiv.append(bookDiv);
  }
});
