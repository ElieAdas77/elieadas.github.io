/*find the button by id*/
const btnSale = document.getElementById("btnSale");
const btnRent = document.getElementById("btnRent");

/*select the property section (rent/sale) */
const saleSection = document.getElementById("saleProperties");
const rentSection = document.getElementById("rentProperties");

/*--bass ekbos for sale--- */
btnSale.addEventListener("click", () => {
  btnSale.classList.add("active"); /*so the selected one looks highlighted */
  btnRent.classList.remove("active");

  saleSection.classList.remove("hidden"); /*show sale */
  rentSection.classList.add("hidden"); /*hide rent */
});

/*--bass ekbos rent  */
btnRent.addEventListener("click", () => {
  btnRent.classList.add("active"); /*so the selected one looks highlighted */
  btnSale.classList.remove("active");

  rentSection.classList.remove("hidden"); /*show rent */
  saleSection.classList.add("hidden"); /*hide sale t */
});

// scroll animation for property cards
const cards = document.querySelectorAll(".fade-in"); // select all elements that have fade-in classsss

const observer = new IntersectionObserver( //watches elements as you scoll
  (entries) => {
    entries.forEach((entry) => {
      //loop through each observed entry
      if (entry.isIntersecting) {
        //check if the elemt is visible on screeen
        entry.target.classList.add("show"); //if visible add the show class (.show in css) eno activate animation
      }
    });
  },
  { threshold: 0.3 } //trigger el animation bass ykoun 30% of the elements visible
);

cards.forEach((card) => observer.observe(card)); //to watch each card

//button scrooll smoooth
// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
//------------------------------------------------john*************************************************************************************************************************************************

/*---------- Property Modal Popup ----------*/
/* 
  popup window
  when click "View Details" on any property card
  the popup will display the information from that card
*/

// grab the whole modal container so I can show or hide it
const modal = document.getElementById("propertyModal");

// elements of the modal that we fill with data
// These will be updated depending on which property is clicked
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalIcons = document.getElementById("modalIcons");

// X button used to close the modal
const closeModal = document.querySelector(".close-modal");

//take all the property cards and loop through them one by one
document.querySelectorAll(".property-card").forEach((card) => {
  // every card has two buttons, The first one is "View Details"
  // so take only the first button
  const viewBtn = card.querySelector("button:first-of-type");

  // When View Details is clicked
  viewBtn.addEventListener("click", () => {
    // take the image inside the clicked card and put it inside the modal
    // If the card has no image leave it empty.
    const img = card.querySelector("img");
    modalImg.src = img ? img.src : "";

    // copy the property's name in <h3>
    // if not found leave it empty
    const titleEl = card.querySelector("h3");
    modalTitle.textContent = titleEl ? titleEl.textContent : "";

    // fill the modal with the property's location
    modalLocation.textContent = card.dataset.location;

    // fill the modal with the property's price
    modalPrice.textContent = card.dataset.price;

    // copy the icons (beds, baths, size).
    // instead of recreating them, simply copy the entire html content using innerHTML
    const icons = card.querySelector(".icons");
    modalIcons.innerHTML = icons ? icons.innerHTML : "";

    // fill the modal with the property's size
    modalSize.textContent = card.dataset.size;

    // fill the modal with the number of bedrooms
    modalBedrooms.textContent = card.dataset.bedrooms;

    // show any extras the property has, like pool or garden
    modalExtras.textContent = card.dataset.extras;

    // show the description of the property
    modalDescription.textContent = card.dataset.description;

    // show the modal by removing the "hidden" class
    modal.classList.remove("hidden");
  });
});

/*---------- Closing the modal ----------*/

/* 
   this closes the modal when X is pressed
*/
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

/* 
   if user clicks outside the modal box it should close too
   check if the click happened on the modal background (not the content)
*/
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

/* 
  closing the modal using the esc key
*/
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
  }
});

//-------------------------------------------------------------------------------
/* ====CONTACT AGENT & INQUIRE POPUPS */

document.addEventListener("click", (e) => {
  /* CONTACT AGENT BUTTON (inside modal) */
  if (e.target.id === "contactAgentBtn") {
    alert("✅ Thank you! An agent will respond to you soon.");
    modal.classList.add("hidden");
  }

  /* INQUIRE BUTTONS */
  if (e.target.classList.contains("inquire-btn")) {
    alert("📨 Your inquiry has been sent. We will contact you shortly.");
  }
});

// --- Slideshow Script ---***************************************

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide-image");
  let currentSlide = 0;
  const slideInterval = 5000; // Change image every 5 seconds (5000 milliseconds)

  if (slides.length > 0) {
    // Function to move to the next slide
    function nextSlide() {
      // 1. Hide the current slide
      slides[currentSlide].classList.remove("active-slide");

      // 2. Calculate the index of the next slide (loops back to 0)
      currentSlide = (currentSlide + 1) % slides.length;

      // 3. Show the next slide
      slides[currentSlide].classList.add("active-slide");
    }

    // Initialize the slideshow by setting the first slide as active (already done in HTML, but good practice)
    slides[0].classList.add("active-slide");

    // Start the continuous rotation
    setInterval(nextSlide, slideInterval);
  }
});
