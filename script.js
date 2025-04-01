function showPaintings(category) {
    // Check if the paintings section already exists
    let paintingsSection = document.getElementById("paintings");
  
    // If it doesn't exist, create it
    if (!paintingsSection) {
      paintingsSection = document.createElement("section");
      paintingsSection.id = "paintings";
      paintingsSection.innerHTML = `
        <h2 class="text-center mb-4">Paintings</h2>
        <div id="painting-list" class="row row-cols-1 row-cols-md-3 g-4"></div>
      `;
  
      // Insert the paintings section after the categories section
      const categoriesSection = document.getElementById("categories");
      categoriesSection.insertAdjacentElement("afterend", paintingsSection);
    }
  
    // Get the painting list container
    const paintingList = document.getElementById("painting-list");
  
    // Clear any existing paintings
    paintingList.innerHTML = "";
  
    // Add paintings for the selected category
    paintingList.innerHTML = paintingsData[category].map(painting => `
      <div class="col">
        <div class="card h-100 painting-card">
          <img src="${painting.image}" class="card-img-top" alt="${painting.name}">
          <div class="card-body">
            <h5 class="card-title">${painting.name}</h5>
            <p class="card-text">Painted by ${painting.artist}</p>
            <a href="painting-detail.html?category=${category}&name=${encodeURIComponent(painting.name)}" class="btn btn-primary">Learn more</a>
            <button class="btn btn-success mt-2" onclick="ratePainting('${category}', '${painting.name}')">👍 ${painting.rating}</button>
          </div>
        </div>
      </div>
    `).join('');
  
    // Scroll to the paintings section
    paintingsSection.scrollIntoView({ behavior: "smooth" });
  }
  
  // Function to increase rating when the like button is clicked
  function ratePainting(category, name) {
    const painting = paintingsData[category].find(p => p.name === name);
    if (painting) {
      painting.rating += 1; // Increment the rating
      showPaintings(category); // Refresh the list to display the updated rating
    }
  }