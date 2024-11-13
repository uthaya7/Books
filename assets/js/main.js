/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

/* Search show */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', () =>{
   search.classList.remove('show-search')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})

// Open and close login form
document.getElementById('login-close').addEventListener('click', () => {
    document.getElementById('login').classList.remove('show-login');
});

document.getElementById('open-signup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login').classList.remove('show-login');
    document.getElementById('signup').classList.add('show-signup');
});

// Open and close sign-up form
document.getElementById('signup-close').addEventListener('click', () => {
    document.getElementById('signup').classList.remove('show-signup');
});

document.getElementById('open-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup').classList.remove('show-signup');
    document.getElementById('login').classList.add('show-login');
});



// image slider
let slideIndex = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');

        if (index >= slides.length) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex = index;
        }

        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${-slideIndex * 100}%)`;
            indicators[i].classList.remove('active');
        });
        indicators[slideIndex].classList.add('active');
    }

    function moveSlide(n) {
        showSlide(slideIndex + n);
    }

    function currentSlide(n) {
        showSlide(n);
    }

    // Optional: Automatic slideshow
    setInterval(() => {
        moveSlide(1);
    }, 5000); // Change slide every 5 seconds




// Container-1

// Sample data: books issued on specific dates
const issuedBooks = {
   "2024-09-12": ["The Great Gatsby", "1984"],
   "2024-09-15": ["To Kill a Mockingbird", "Moby Dick"],
   "2024-09-20": ["Pride and Prejudice"],
   "2024-09-25": ["The Catcher in the Rye", "War and Peace", "Ulysses"],
   "2024-08-05": ["Les Misérables"],
   "2023-12-23": ["Dracula", "Frankenstein"],
   "2023-10-12": ["The Hobbit"],
};

let currentDate = new Date();

// Helper function to update the calendar header
function updateMonthYearHeader() {
   const monthNames = [
       "January", "February", "March", "April", "May", "June", 
       "July", "August", "September", "October", "November", "December"
   ];
   const monthYearElement = document.getElementById('current-month-year');
   const month = monthNames[currentDate.getMonth()];
   const year = currentDate.getFullYear();
   monthYearElement.textContent = `${month} ${year}`;
}

// Helper function to generate the calendar days with weekdays
function generateCalendar() {
   const calendar = document.getElementById('calendar');
   calendar.innerHTML = ''; // Clear previous calendar

   // Weekday names
   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   weekdays.forEach(day => {
       const weekdayElement = document.createElement('div');
       weekdayElement.textContent = day;
       weekdayElement.classList.add('weekdays');
       calendar.appendChild(weekdayElement);
   });

   const year = currentDate.getFullYear();
   const month = currentDate.getMonth();

   const daysInMonth = new Date(year, month + 1, 0).getDate();
   const firstDayOfMonth = new Date(year, month, 1).getDay();

   for (let i = 0; i < firstDayOfMonth; i++) {
       const blankDay = document.createElement('div');
       blankDay.classList.add('day', 'blank');
       calendar.appendChild(blankDay);
   }

   for (let day = 1; day <= daysInMonth; day++) {
       const dayElement = document.createElement('div');
       const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
       dayElement.classList.add('day');
       dayElement.textContent = day;

       if (issuedBooks[date]) {
           dayElement.classList.add('highlight');
       }

       dayElement.addEventListener('click', () => showIssuedBooks(date));

       calendar.appendChild(dayElement);
   }

   updateMonthYearHeader();
}

function showIssuedBooks(date) {
   const bookList = document.getElementById('book-list');
   const issuedBooksSection = document.getElementById('issued-books');
   bookList.innerHTML = '';

   if (issuedBooks[date]) {
       issuedBooks[date].forEach(book => {
           const bookItem = document.createElement('li');
           bookItem.textContent = book;
           bookList.appendChild(bookItem);
       });
       issuedBooksSection.style.display = 'block';
   } else {
       issuedBooksSection.style.display = 'none';
   }
}

function showIssuedBooks(date) {
    const bookList = document.getElementById('book-list');
    const issuedBooksSection = document.getElementById('issued-books');
    bookList.innerHTML = ''; // Clear the previous book list
 
    if (issuedBooks[date]) {
        issuedBooks[date].forEach(book => {
            const bookItem = document.createElement('li');
            const bookLink = document.createElement('a');
            bookLink.textContent = book;
            bookLink.href = `#`; // Change this to the actual book link if available
            bookLink.classList.add('book-link'); // Optional: Add a class for styling
 
            bookItem.appendChild(bookLink);
            bookList.appendChild(bookItem);
        });
        issuedBooksSection.style.display = 'block';
    } else {
        issuedBooksSection.style.display = 'none';
    }
 }
 

//  Count Animation
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count');
    const speed = 200; // Speed of the count animation

    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    const options = {
        root: null,           // Use the viewport as the container
        threshold: 0.3        // Trigger when 30% of the card is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.count');
                countUp(counter);       // Start counting when visible
                observer.unobserve(entry.target); // Stop observing once animation starts
            }
        });
    }, options);

    document.querySelectorAll('.card-1').forEach(card => {
        observer.observe(card); // Observe each card for scrolling
    });
});

// Modal handling for jumping to a specific month and year
const modal = document.getElementById('date-picker-modal');
const openModalBtn = document.getElementById('open-picker');
const closeModalBtn = document.getElementById('close-picker');
const applySelectionBtn = document.getElementById('apply-selection');

openModalBtn.onclick = () => {
   modal.style.display = 'block';
};

closeModalBtn.onclick = () => {
   modal.style.display = 'none';
};

// Close modal if clicked outside
window.onclick = (event) => {
   if (event.target === modal) {
       modal.style.display = 'none';
   }
};

// Populate the month and year dropdowns dynamically
function populateMonthYearDropdowns() {
   const monthSelect = document.getElementById('month-select');
   const yearSelect = document.getElementById('year-select');

   const monthNames = [
       "January", "February", "March", "April", "May", "June", 
       "July", "August", "September", "October", "November", "December"
   ];

   monthNames.forEach((month, index) => {
       const option = document.createElement('option');
       option.value = index;
       option.text = month;
       if (index === currentDate.getMonth()) {
           option.selected = true;
       }
       monthSelect.appendChild(option);
   });

   const currentYear = new Date().getFullYear();
   for (let i = currentYear - 100; i <= currentYear + 20; i++) {
       const option = document.createElement('option');
       option.value = i;
       option.text = i;
       if (i === currentDate.getFullYear()) {
           option.selected = true;
       }
       yearSelect.appendChild(option);
   }
}

// Apply selected month and year
applySelectionBtn.onclick = () => {
   const selectedMonth = document.getElementById('month-select').value;
   const selectedYear = document.getElementById('year-select').value;

   currentDate.setMonth(selectedMonth);
   currentDate.setFullYear(selectedYear);
   generateCalendar();
   modal.style.display = 'none';
};

// Event listeners for month navigation
document.getElementById('prev-month').addEventListener('click', () => {
   currentDate.setMonth(currentDate.getMonth() - 1);
   generateCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
   currentDate.setMonth(currentDate.getMonth() + 1);
   generateCalendar();
});

// Generate the initial calendar for the current month
window.onload = () => {
   generateCalendar();
   populateMonthYearDropdowns();
};

