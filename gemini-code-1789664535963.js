// Target Google Drive Folder: 1rm1A9FTHCQuWC7d2sMc6O8USQbPPFWWm
const mockDriveVideos = [
  {
    id: "1CExWSrPSYQZ_lvmM6px7OjDyjXo3XXTi",
    title: "Gloves On My Hands",
    uploader: "Family Drive",
    rating: "younger",
    icon: "🥊"
  },
  {
    id: "sample_id_2",
    title: "Summer Vacation Clips",
    uploader: "Older Sibling",
    rating: "older",
    icon: "☀️"
  },
  {
    id: "sample_id_3",
    title: "Lego Stop Motion Project",
    uploader: "Younger Sibling",
    rating: "younger",
    icon: "🧱"
  }
];

const videoGrid = document.getElementById("videoGrid");
const videoModal = document.getElementById("videoModal");
const drivePlayer = document.getElementById("drivePlayer");
const modalVideoTitle = document.getElementById("modalVideoTitle");
const closeModal = document.getElementById("closeModal");

function renderVideos(profileFilter = "younger") {
  videoGrid.innerHTML = "";
  
  const filtered = mockDriveVideos.filter(
    v => profileFilter === "older" || v.rating === "younger"
  );

  filtered.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <div class="thumbnail">${video.icon}</div>
      <div class="card-info">
        <h4>${video.title}</h4>
        <span class="card-tag">${video.uploader}</span>
      </div>
    `;
    card.onclick = () => openPlayer(video);
    videoGrid.appendChild(card);
  });
}

function openPlayer(video) {
  // Drive preview stream URL format
  drivePlayer.src = `https://drive.google.com/file/d/${video.id}/preview`;
  modalVideoTitle.innerText = video.title;
  videoModal.style.display = "flex";
}

closeModal.onclick = () => {
  videoModal.style.display = "none";
  drivePlayer.src = "";
};

document.querySelectorAll(".profile-btn:not(.parent-btn)").forEach(btn => {
  btn.onclick = (e) => {
    document.querySelectorAll(".profile-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    renderVideos(e.target.dataset.age);
  };
});

document.getElementById("parentLockBtn").onclick = () => {
  const pin = prompt("Enter 4-Digit Parent PIN:");
  if (pin === "1234") {
    alert("Parent Access Granted: You can now manage Drive upload permissions.");
  } else if (pin !== null) {
    alert("Incorrect PIN.");
  }
};

// Initial Render
renderVideos("younger");