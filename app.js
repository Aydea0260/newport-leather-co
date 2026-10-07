// Newport Leather Co. — storefront logic
(function(){
  "use strict";

  var IMG = {
    "harbor-crossbody": "assets/harbor-crossbody.jpg",
    "marina-mini-crossbody": "assets/marina-mini.jpg",
    "coastline-slim-backpack": "assets/coastline-backpack.jpg",
    "ridgeline-backpack": "assets/ridgeline-backpack.jpg",
    "voyager-weekender": "assets/voyager-weekender.jpg",
    "summit-duffle": "assets/summit-duffel.jpg",
    "market-carry-tote": "assets/market-tote.jpg",
    "boardwalk-tote": "assets/boardwalk-tote.jpg"
  };

  function money(n){ return "$" + n; }

  function card(p){
    var badge = p.badge ? '<span class="badge' + (p.badge === "New" ? " new" : "") + '">' + p.badge + "</span>" : "";
    return '<article class="card">' +
      '<div class="ph">' + badge +
      '<img src="' + (IMG[p.id] || "assets/logo.png") + '" alt="' + p.name + '" loading="lazy"></div>' +
      '<div class="info"><h3>' + p.name + "</h3>" +
      '<div class="price">' + money(p.price) + "</div>" +
      '<div class="colors">' + p.colors.join(" · ") + "</div></div></article>";
  }

  fetch("products.json").then(function(r){ return r.json(); }).then(function(products){
    var grid = document.getElementById("prodGrid");
    if (grid) grid.innerHTML = products.map(card).join("");

    // category tiles filter the grid
    document.querySelectorAll(".cat").forEach(function(tile){
      tile.addEventListener("click", function(){
        var cat = tile.getAttribute("data-cat");
        var list = products.filter(function(p){ return p.category === cat; });
        if (grid && list.length) {
          grid.innerHTML = list.map(card).join("");
          document.getElementById("shop").scrollIntoView({behavior:"smooth"});
        }
      });
    });
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
