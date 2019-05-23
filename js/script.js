/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


/***************
    VARIABLES  
*****************/

// Global variables for grabbing the student list and restricting how many students per page
const studentList = document.getElementsByClassName('student-item cf');
const numberRestriction = 10;

// Extra variables for grabbing the page div and pagination elements 
const page = document.querySelector('div.page');
const paginationDiv = document.createElement('div');
const paginationUl = document.createElement('ul');
paginationUl.className = 'pagination';

// Global variables for the number of pages and j for iteration 
let j = 0;
let numberOfPages = 0;

/***************
    FUNCTIONS
*****************/

// Function for generating n number of pages correlating to the amount of students on the list divided by number restriction
function appendPageLinks() {
   if((studentList.length/numberRestriction) < Math.round(studentList.length/numberRestriction)) {
      numberOfPages = Math.round(studentList.length/numberRestriction);
   } else {
      numberOfPages = Math.round(studentList.length/numberRestriction) + 1;
   }
   for (let i = 1; i <= numberOfPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute("href", "#" + i);
      a.textContent=i;
      li.appendChild(a);
      paginationUl.appendChild(li);
      j = j + numberRestriction;
      let k = j - numberRestriction;
      while (k < j && k < studentList.length) {
         studentList[k].id = "#" + i;
         k++; 
      }
   }
   paginationDiv.appendChild(paginationUl);
   page.appendChild(paginationDiv);
}

// Function for algorithm that will associate allocated lists per page
function showPage(list, page) {
   for (let k = 0; k < studentList.length; k++) {
      if (list[k].id === "#" + page) {
          list[k].style.display = 'block';
      } else {
         list[k].style.display = 'none';
      }
   }
}

/***************
    PROGRAM
*****************/

if (studentList.length === 0) {
   document.body.innerHTML = '<p style="text-align: center;">No results have been found.</p>';
} else {
   // Call appendPageLinks first 
   appendPageLinks();

   // Sets up initial page displaying only the first ten students on the list
   const a = paginationUl.getElementsByTagName('A');
   for (let i = 0; i < studentList.length; i++) {
      if (i > numberRestriction-1) {
         studentList[i].style.display = 'none';
      } else {
         studentList[i].style.display = 'block';
      }   
      a[0].style.backgroundColor = '#4ba6c3';
      a[0].style.color = '#fff';
   }

   // Event listener for when page links are pressed 
   paginationUl.addEventListener('click', (e) => {
      for (let i = 0; i < a.length; i++) {
         a[i].style.backgroundColor = '#fff';
         a[i].style.color = '#4ba6c3';
      }
      for (let i = 0; i <= numberOfPages; i++) {
         if (e.target.textContent === String(i)) {
            showPage(studentList, i);
         }
      }
      e.target.style.backgroundColor = '#4ba6c3';
      e.target.style.color = '#fff';
   });
}