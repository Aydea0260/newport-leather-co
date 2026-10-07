// Newport Leather Co. — storefront logic (real products only)
(function(){
  "use strict";

  function money(s){ return s; }

  function card(p){
    var badge = p.status === "coming_soon" ? '<span class="badge">Coming soon</span>' : "";
    return '<article class="card">' +
      '<div class="ph">' + badge +
      '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy"></div>' +
      '<div class="info"><h3>' + p.name + "</h3>" +
      '<p class="blurb">' + p.blurb + "</p>" +
      '<div class="price">' + money(p.price) + "</div>" +
      '<div class="colors">' + p.colors + "</div>" +
      '<div class="ship">' + p.shipping + "</div></div></article>";
  }

  fetch("products.json").then(function(r){ return r.json(); }).then(function(products){
    var grid = document.getElementById("prodGrid");
    if (grid) grid.innerHTML = products.map(card).join("");
  }).catch(function(){ /* static fallback: grid stays empty */ });

  // mobile nav
  var burger = document.getElementById("burger"), nav = document.getElementById("nav");
  if (burger && nav) burger.addEventListener("click", function(){ nav.classList.toggle("open"); });

  // email capture (demo)
  var form = document.getElementById("emailForm");
  if (form) form.addEventListener("submit", function(e){
    e.preventDefault();
    form.style.display = "none";
    document.getElementById("emailDone").style.display = "block";
  });
})();
