let projectCount = 1;

// Add new project fields dynamically
document.getElementById('add-project').addEventListener('click', function() {
  const projectSection = document.getElementById('project-section');
  const newProject = `
    <label for="project-title-${projectCount}">Project Title:</label>
    <input type="text" id="project-title-${projectCount}" name="project-title-${projectCount}" placeholder="Project title" required>

    <label for="project-desc-${projectCount}">Project Description:</label>
    <textarea id="project-desc-${projectCount}" name="project-desc-${projectCount}" placeholder="Describe your project" required></textarea>
  `;
  projectSection.insertAdjacentHTML('beforeend', newProject);
  projectCount++;
});

// Generate portfolio dynamically
document.getElementById('portfolio-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;  // Capture the email
  const bio = document.getElementById('bio').value;
  
  let portfolioContent = `<h3>${name}</h3><p><strong>Email:</strong> ${email}</p><p>${bio}</p><h4>Projects</h4>`;

  // Loop through all the projects
  for (let i = 0; i < projectCount; i++) {
    const projectTitle = document.getElementById(`project-title-${i}`).value;
    const projectDesc = document.getElementById(`project-desc-${i}`).value;
    portfolioContent += `<h5>${projectTitle}</h5><p>${projectDesc}</p>`;
  }

  document.getElementById('generated-portfolio').innerHTML = portfolioContent;
});

// Save and download portfolio as an HTML file
document.getElementById('download-portfolio').addEventListener('click', function() {
  const content = document.getElementById('generated-portfolio').innerHTML;

  const htmlContent = `
    <html>
      <head>
        <title>My Portfolio</title>
        <style>
          /* Basic Styling */
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          h3, h4, h5 {
            margin-bottom: 10px;
          }
          p {
            margin-bottom: 20px;
          }
          #portfolio {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            animation: fadeIn 1s ease-in;
          }
          
          /* Keyframe Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* Additional Styling Options */
          .default-style {
            background-color: purple;
            color: black;
          }
          .modern-style {
            background-color: #282c34;
            color: white;
          }
          .classic-style {
            background-color: #f4f4f4;
            color: #333;
            border: 2px solid #333;
          }
        </style>
      </head>
      <body>
        <div id="portfolio" class="${document.getElementById('style-choice').value}">
          ${content}
        </div>
      </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'portfolio.html';
  link.click();
});

// Switch between styles dynamically
document.getElementById('style-choice').addEventListener('change', function() {
  const selectedStyle = this.value;
  const portfolioPreview = document.getElementById('generated-portfolio');
  portfolioPreview.className = selectedStyle;
});
