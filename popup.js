//________________________________________________________________________________loading_popup___________________________________________________________________________________\\

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.closePopup) {
		const Loading = document.getElementById("Loading");
		Loading.style.display = "block";
		// const menuItems = document.querySelectorAll('.menu');
		// menuItems.forEach(item => { item.style.display = 'block'; });
		setTimeout(() => {
			window.close();
		}, 300);
	}
});
//chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//	if (request.closePopup) {
//		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//			// Check if the active tab is the sender tab
//			if (tabs[0].id === sender.tab.id) {
//				const Loading = document.getElementById("Loading");
//				Loading.style.display = "block";
//				// const menuItems = document.querySelectorAll('.menu');
//				// menuItems.forEach(item => { item.style.display = 'block'; });
//				setTimeout(() => {
//					window.close();
//				}, 50);
//			}
//		});
//	}
//});

//________________________________________________________________________________variables___________________________________________________________________________________\\

let fillColor_attack = "#fc0303";
let fillColor_mining = "#03e8fc";
let fillColor_recruting = "#fc9003";
let fillColor_deffence = "#2030df";
let fillColor_speedIsland = "#42b336";
let fillColor_speed = "#83ff75";
let fillColor_luck = "#8d36ff";
let arti_visible = false;
let arti_active = false;
let pfp_visible = false;
let pfp_active = false;
let hide_txt_visible = false;
let hide_txt_active = false;
let Search_user_visible = false;
let Search_user_active = false;
let Summon_all_visible = false;
let Summon_all_active = false;
let reroll_visible = false;
let reroll_active = false;
let vurnability_visible = false;
let vurnability_active = false;
let flash_visible = false;
let flash_active = false;
let book_visible = false;
let rank_visible = false;
//________________________________________________________________________________Artifact___________________________________________________________________________________\\

// Add event listeners to color input fields
document.getElementById("fillColor_attack").addEventListener("input", () => {
	fillColor_attack = document.getElementById("fillColor_attack").value;
	triggerChanges();
});

document.getElementById("fillColor_mining").addEventListener("input", () => {
	fillColor_mining = document.getElementById("fillColor_mining").value;
	triggerChanges();
});

document.getElementById("fillColor_recruting").addEventListener("input", () => {
	fillColor_recruting = document.getElementById("fillColor_recruting").value;
	triggerChanges();
});

document.getElementById("fillColor_deffence").addEventListener("input", () => {
	fillColor_deffence = document.getElementById("fillColor_deffence").value;
	triggerChanges();
});

document
	.getElementById("fillColor_speedIsland")
	.addEventListener("input", () => {
		fillColor_speedIsland = document.getElementById(
			"fillColor_speedIsland"
		).value;
		triggerChanges();
	});

document.getElementById("fillColor_speed").addEventListener("input", () => {
	fillColor_speed = document.getElementById("fillColor_speed").value;
	triggerChanges();
});

document.getElementById("fillColor_luck").addEventListener("input", () => {
	fillColor_luck = document.getElementById("fillColor_luck").value;
	triggerChanges();
});
// Get the checkbox element
const artifactActive = document.getElementById("arti_active");
// Listen for changes on the checkbox
artifactActive.addEventListener("change", () => {
	if (artifactActive.checked) {
		arti_active = true;
		// Add any additional actions you want to trigger when the switch is on
	} else {
		arti_active = false;
		// Add any additional actions you want to trigger when the switch is off
	}
});

function triggerChanges() {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			function: applyChanges,
			args: [
				fillColor_attack,
				fillColor_mining,
				fillColor_recruting,
				fillColor_deffence,
				fillColor_speedIsland,
				fillColor_speed,
				fillColor_luck,
			],
		});
	});
}

function applyChanges(
	fillColor_attack,
	fillColor_mining,
	fillColor_recruting,
	fillColor_deffence,
	fillColor_speedIsland,
	fillColor_speed,
	fillColor_luck
) {
	const svgPaths = [
		{
			selector: 'path[data-v-546e1c28][fill="#b31919"]',
			color: fillColor_attack,
		},
		{
			selector: 'path[data-v-546e1c28][fill="#1d8fc9"]',
			color: fillColor_mining,
		},
		{
			selector: 'path[data-v-546e1c28][fill="#cfbf17"]',
			color: fillColor_recruting,
		},
		{
			selector: 'path[data-v-546e1c28][fill="#2030df"]',
			color: fillColor_deffence,
		},
		{
			selector: 'path[data-v-546e1c28][fill="#19b366"]',
			color: fillColor_speedIsland,
		},
		{
			selector: 'path[data-v-546e1c28][fill="#4cb319"]',
			color: fillColor_speed,
		},
		{
			selector: 'path[data-v-546e1c28][fill="#bb6f18"]',
			color: fillColor_luck,
		},
	];
	if (arti_active) {
		svgPaths.forEach(({ selector, color }) => {
			const svgPath = document.querySelector(selector);
			if (svgPath) {
				svgPath.setAttribute("fill", color);
			} else {
				//console.log(`SVG path with selector ${selector} not found.`);
			}
		});
	}
}

// Load stored color settings and apply them to input fields
function loadSettings() {
	chrome.storage.sync.get(
		[
			"fillColor_attack",
			"fillColor_mining",
			"fillColor_recruting",
			"fillColor_deffence",
			"fillColor_speedIsland",
			"fillColor_speed",
			"fillColor_luck",
		],
		(data) => {
			document.getElementById("fillColor_attack").value =
				data.fillColor_attack || "#fc0303";
			document.getElementById("fillColor_mining").value =
				data.fillColor_mining || "#03e8fc";
			document.getElementById("fillColor_recruting").value =
				data.fillColor_recruting || "#fc9003";
			document.getElementById("fillColor_deffence").value =
				data.fillColor_deffence || "#2030df";
			document.getElementById("fillColor_speedIsland").value =
				data.fillColor_speedIsland || "#42b336";
			document.getElementById("fillColor_speed").value =
				data.fillColor_speed || "#83ff75";
			document.getElementById("fillColor_luck").value =
				data.fillColor_luck || "#8d36ff";
		}
	);
}

// Save the selected colors to chrome.storage
function saveSettings() {
	const settings = {
		fillColor_attack: document.getElementById("fillColor_attack").value,
		fillColor_mining: document.getElementById("fillColor_mining").value,
		fillColor_recruting: document.getElementById("fillColor_recruting")
			.value,
		fillColor_deffence: document.getElementById("fillColor_deffence").value,
		fillColor_speedIsland: document.getElementById("fillColor_speedIsland")
			.value,
		fillColor_speed: document.getElementById("fillColor_speed").value,
		fillColor_luck: document.getElementById("fillColor_luck").value,
	};

	chrome.storage.sync.set(settings, () => {
		console.log("Settings saved", settings);
		triggerChanges();
	});
}

// Add event listeners to color input fields
document
	.getElementById("fillColor_attack")
	.addEventListener("input", saveSettings);
document
	.getElementById("fillColor_mining")
	.addEventListener("input", saveSettings);
document
	.getElementById("fillColor_recruting")
	.addEventListener("input", saveSettings);
document
	.getElementById("fillColor_deffence")
	.addEventListener("input", saveSettings);
document
	.getElementById("fillColor_speedIsland")
	.addEventListener("input", saveSettings);
document
	.getElementById("fillColor_speed")
	.addEventListener("input", saveSettings);
document
	.getElementById("fillColor_luck")
	.addEventListener("input", saveSettings);

// Load the stored settings when the popup is opened
document.addEventListener("DOMContentLoaded", loadSettings);

document.getElementById("arti_drop").addEventListener("click", () => {
	if (arti_visible) {
		arti_visible = false;
		document.getElementById("Artifact_color").style.display = "none";
	} else {
		arti_visible = true;
		document.getElementById("Artifact_color").style.display = "block";
	}
});

const artiActive = document.getElementById("arti_active");

// Load the saved state from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
	const savedState = localStorage.getItem("arti_active_state");
	if (savedState === "true") {
		artiActive.checked = true;
	} else {
		artiActive.checked = false;
	}
	console.log(savedState);
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { artiActive: savedState });
	});
});

// Save the state to localStorage whenever the switch is toggled
artiActive.addEventListener("change", () => {
	const isChecked = artiActive.checked;
	localStorage.setItem("arti_active_state", isChecked);
});

document.addEventListener("DOMContentLoaded", function () {
	const checkbox = document.getElementById("arti_active");

	// Load saved state
	chrome.storage.sync.get("artiActive", function (data) {
		checkbox.checked = data.artiActive || false;
	});

	checkbox.addEventListener("change", function () {
		const isActive = checkbox.checked;

		// Save state
		chrome.storage.sync.set({ artiActive: isActive });

		// Send message to content script
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { artiActive: isActive });
			}
		);
	});
});

//________________________________________________________________________________custom_pfp___________________________________________________________________________________\\

let val = console.log(localStorage.getItem("selectedImageValue"));

document.getElementById("pfp_drop").addEventListener("click", () => {
	if (pfp_visible) {
		pfp_visible = false;
		document.getElementById("custom_pfp").style.display = "none";
	} else {
		pfp_visible = true;
		document.getElementById("custom_pfp").style.display = "block";
	}
});

const pfp_Active = document.getElementById("pfp_active");

// Load the saved state from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
	const savedState = localStorage.getItem("pfp_active_state");
	if (savedState === "true") {
		pfp_Active.checked = true;
	} else {
		pfp_Active.checked = false;
	}
});

// Save the state to localStorage whenever the switch is toggled
pfp_Active.addEventListener("change", () => {
	const isChecked = pfp_Active.checked;
	localStorage.setItem("pfp_active_state", isChecked);
});

const images = document.querySelectorAll("#image-container img");
const selectedClass = "selected-image-border";

// Function to load the saved image value from localStorage
function loadSelectedImage() {
	const savedValue = localStorage.getItem("selectedImageValue");
	console.log(localStorage.getItem("selectedImageValue"));
	if (savedValue) {
		images.forEach((image) => {
			if (image.getAttribute("data-value") === savedValue) {
				image.classList.add(selectedClass);
				updateDOMElementClass(savedValue);
			}
		});
	}
}

// Function to update the class of the DOM element on the website
function updateDOMElementClass(value) {
	const mainDiv = document.querySelector("div[data-v-06630c0a]");
	if (mainDiv) {
		const profileIconDiv = mainDiv.querySelector(".profile-icon");
		const generalInfoSectionDiv = mainDiv.querySelector(
			".general-info-section"
		);
		if (profileIconDiv && generalInfoSectionDiv) {
			const messageButtonDiv =
				generalInfoSectionDiv.querySelector(".message-button");
			let i = 0;
			if (!messageButtonDiv) {
				while (i < 25) {
					profileIconDiv.classList.remove("p-icon-" + i);
					i++;
				}
				profileIconDiv.classList.add(value);
			}
		}
	}
	const targetElement = document.querySelector(
		"[data-v-62f8e528][data-v-e22ea070]"
	);
	if (targetElement) {
		//targetElement.className = '';
		let i = 0;
		while (i < 25) {
			targetElement.classList.remove("p-icon-" + i);
			i++;
		}
		targetElement.classList.add(value);
	}
	const menu_div = document.querySelector(".menuu");
	if (menu_div) {
		const profileIconMenu = menu_div.querySelector(".profile-icon");
		let i = 0;
		if (profileIconMenu) {
			while (i < 25) {
				profileIconMenu.classList.remove("p-icon-" + i);
				i++;
			}
			profileIconMenu.classList.add(value);
		}
	}
	const chat_div = document.querySelector(".self");
	if (chat_div) {
		const profileIconChat = chat_div.querySelector(".message-icon");
		let i = 0;
		if (profileIconChat) {
			while (i < 25) {
				profileIconChat.classList.remove("p-icon-" + i);
				i++;
			}
			profileIconChat.classList.add(value);
		}
	}
	//const targetElement3 =document.querySelector('.message-icon');
	//if (targetElement3 != null) {
	//	targetElement3.classList.remove("p-icon-" + i);
	//}
	//if (targetElement != null) {
	//	targetElement3.classList.add(pfp);
	//}
}

// Add click event listeners to images
images.forEach((image) => {
	image.addEventListener("click", function () {
		// Remove the border from any previously selected image
		images.forEach((img) => img.classList.remove(selectedClass));

		// Add a red border to the clicked image
		this.classList.add(selectedClass);

		// Save the selected image's value to localStorage
		const selectedValue = this.getAttribute("data-value");
		localStorage.setItem("selectedImageValue", selectedValue);

		// Update the class of the target DOM element
		updateDOMElementClass(selectedValue);
	});
});

// Load the saved image on popup open
loadSelectedImage();

// Assuming this is part of the popup.js script
document.addEventListener("DOMContentLoaded", function () {
	// Function to send a message to the content script
	function updateDOMElementClass(value) {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					action: "updateClass",
					value: value,
				});
			}
		);
	}

	// Rest of your code to handle image selection...
	const images = document.querySelectorAll("#image-container img");
	images.forEach((image) => {
		image.addEventListener("click", function () {
			// ...existing code...
			let selectedValue = this.getAttribute("data-value");
			updateDOMElementClass(selectedValue);
		});
	});
	updateDOMElementClass(localStorage.getItem("selectedImageValue"));
	// Load the selected image on popup open...
});

const pfpActive = document.getElementById("pfp_active");

// Load the saved state from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
	const savedState = localStorage.getItem("pfp_active_state");
	if (savedState === "true") {
		pfpActive.checked = true;
	} else {
		pfpActive.checked = false;
	}
	console.log(savedState);
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { pfpActive: savedState });
	});
});

// Save the state to localStorage whenever the switch is toggled
pfpActive.addEventListener("change", () => {
	const isChecked = pfpActive.checked;
	localStorage.setItem("pfp_active_state", isChecked);
});

document.addEventListener("DOMContentLoaded", function () {
	const checkbox = document.getElementById("pfp_active");

	// Load saved state
	chrome.storage.sync.get("pfpActive", function (data) {
		checkbox.checked = data.pfpActive || false;
	});

	checkbox.addEventListener("change", function () {
		const isActive = checkbox.checked;

		// Save state
		chrome.storage.sync.set({ pfpActive: isActive });

		// Send message to content script
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { pfpActive: isActive });
			}
		);
	});
});

//________________________________________________________________________________hide_txt___________________________________________________________________________________\\

const hide_txt_ = document.getElementById("text_hide_active");
// Listen for changes on the checkbox
hide_txt_.addEventListener("change", () => {
	if (hide_txt_.checked) {
		hide_txt_active = true;
		// Add any additional actions you want to trigger when the switch is on
	} else {
		hide_txt_active = false;
		// Add any additional actions you want to trigger when the switch is off
	}
});

document.getElementById("hide_txt_drop").addEventListener("click", () => {
	if (hide_txt_visible) {
		hide_txt_visible = false;
		document.getElementById("hide_txt").style.display = "none";
	} else {
		hide_txt_visible = true;
		document.getElementById("hide_txt").style.display = "block";
	}
});

document.addEventListener("DOMContentLoaded", () => {
	// Load the saved state from localStorage when the page loads
	const savedState_txt = localStorage.getItem("hide_txt_active_state");
	if (savedState_txt === "true") {
		hide_txt_.checked = true;
	} else {
		hide_txt_.checked = false;
	}

	// Save the state to localStorage whenever the switch is toggled
	hide_txt_.addEventListener("change", () => {
		const isChecked_txt = hide_txt_.checked;
		localStorage.setItem("hide_txt_active_state", isChecked_txt);

		// Communicate the state to the content script
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { hideTxt: isChecked_txt });
		});
	});
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { hideTxt: hide_txt_.checked });
	});
});
//________________________________________________________________________________Search_user___________________________________________________________________________________\\

document.getElementById("Search_user_drop").addEventListener("click", () => {
	if (Search_user_visible) {
		Search_user_visible = false;
		document.getElementById("Search_user").style.display = "none";
	} else {
		Search_user_visible = true;
		document.getElementById("Search_user").style.display = "block";
	}
});
const Search_ = document.getElementById("Search_active");
// Listen for changes on the checkbox
Search_.addEventListener("change", () => {
	if (Search_.checked) {
		Search_user_active = true;
		// Add any additional actions you want to trigger when the switch is on
	} else {
		Search_user_active = false;
		// Add any additional actions you want to trigger when the switch is off
	}
});

document.addEventListener("DOMContentLoaded", () => {
	// Load the saved state from localStorage when the page loads
	if (localStorage.getItem("Search_state") === "true") {
		Search_.checked = true;
	} else {
		Search_.checked = false;
	}

	// Save the state to localStorage whenever the switch is toggled
	Search_.addEventListener("change", () => {
		const isChecked_Search = Search_.checked;
		localStorage.setItem("Search_state", isChecked_Search);

		// Communicate the state to the content script
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				SearchUser: isChecked_Search,
			});
		});
	});
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { SearchUser: Search_.checked });
	});
});
//________________________________________________________________________________Summon_all___________________________________________________________________________________\\

document.getElementById("Summon_all_drop").addEventListener("click", () => {
	if (Summon_all_visible) {
		Summon_all_visible = false;
		document.getElementById("Summon_all").style.display = "none";
	} else {
		Summon_all_visible = true;
		document.getElementById("Summon_all").style.display = "block";
	}
});
const Summon_ = document.getElementById("Summon_active");
// Listen for changes on the checkbox
Summon_.addEventListener("change", () => {
	if (Summon_.checked) {
		Summon_all_active = true;
		// Add any additional actions you want to trigger when the switch is on
	} else {
		Summon_all_active = false;
		// Add any additional actions you want to trigger when the switch is off
	}
});

document.addEventListener("DOMContentLoaded", () => {
	// Load the saved state from localStorage when the page loads
	if (localStorage.getItem("Summon_state") === "true") {
		Summon_.checked = true;
	} else {
		Summon_.checked = false;
	}

	// Save the state to localStorage whenever the switch is toggled
	Summon_.addEventListener("change", () => {
		const isChecked_Summon = Summon_.checked;
		localStorage.setItem("Summon_state", isChecked_Summon);

		// Communicate the state to the content script
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				SummonAll: isChecked_Summon,
			});
		});
	});
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { SummonAll: Summon_.checked });
	});
});

//________________________________________________________________________________auto_reroll___________________________________________________________________________________\\

document.getElementById("Reroll_drop").addEventListener("click", () => {
	if (reroll_visible) {
		reroll_visible = false;
		document.getElementById("Auto_reroll").style.display = "none";
	} else {
		reroll_visible = true;
		document.getElementById("Auto_reroll").style.display = "block";
	}
});
const Reroll_ = document.getElementById("reroll_active");
// Listen for changes on the checkbox
Reroll_.addEventListener("change", () => {
	if (Reroll_.checked) {
		reroll_active = true;
		// Add any additional actions you want to trigger when the switch is on
	} else {
		reroll_active = false;
		// Add any additional actions you want to trigger when the switch is off
	}
});

document.addEventListener("DOMContentLoaded", () => {
	// Load the saved state from localStorage when the page loads
	if (localStorage.getItem("Reroll_state") === "true") {
		Reroll_.checked = true;
	} else {
		Reroll_.checked = false;
	}

	// Save the state to localStorage whenever the switch is toggled
	Reroll_.addEventListener("change", () => {
		const isChecked_Reroll = Reroll_.checked;
		localStorage.setItem("Reroll_state", isChecked_Reroll);

		// Communicate the state to the content script
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				RerollAll: isChecked_Reroll,
			});
		});
	});
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { RerollAll: Reroll_.checked });
	});
});

// Function to save the class state of images to localStorage
function saveClassState() {
	const imgElements = document.querySelectorAll("img.img_unit");
	const classState = Array.from(imgElements).map((img) => ({
		dataValue: img.getAttribute("data-value"),
		isChecked: img.classList.contains("checked"),
	}));
	localStorage.setItem("imgClassState", JSON.stringify(classState));
}

// Function to restore the class state of images from localStorage
function restoreClassState() {
	const classState = JSON.parse(
		localStorage.getItem("imgClassState") || "[]"
	);
	classState.forEach((state) => {
		const imgElement = document.querySelector(
			`img.img_unit[data-value="${state.dataValue}"]`
		);
		if (imgElement) {
			if (state.isChecked) {
				imgElement.classList.add("checked");
			} else {
				imgElement.classList.remove("checked");
			}
		}
	});
}

// Event listener to restore class state on popup load and save on each click
document.addEventListener("DOMContentLoaded", () => {
	restoreClassState(); // Restore class state when popup opens

	document.querySelectorAll("img.img_unit").forEach((img) => {
		img.addEventListener("click", () => {
			img.classList.toggle("checked"); // Toggle checked class
			saveClassState(); // Save the new state
			sendDataValuesToContentScript();
		});
	});
});

// document.querySelectorAll(".img_unit").forEach((image) => {
// 	image.addEventListener("click", function () {
// 		this.classList.toggle("checked");
// 		sendDataValuesToContentScript();
// 	});
// });

// Function to gather data from images with class "img_unit checked"
function sendDataValuesToContentScript() {
	// Select all img elements with the class "img_unit checked"
	const imgElements = document.querySelectorAll(".checked");
	console.log(imgElements);

	// Extract the data-value attribute from each img element
	const dataValues = Array.from(imgElements).map((img) =>
		img.getAttribute("data-value")
	);

	// Send the data to the content script in the active tab
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]?.id) {
			chrome.tabs.sendMessage(tabs[0].id, {
				type: "IMG_DATA_VALUES",
				dataValues: dataValues,
			});
		}
	});
}

// Function to save selected values to localStorage and send to contentScript.js
function saveAndSendDropdownValues() {
	const miningSelect = document.querySelector("#miningSelect");
	const recruitingSelect = document.querySelector("#recruitingSelect");

	const selectedValues = {
		minimumMiningAllowed: miningSelect.value,
		minimumRecruitingAllowed: recruitingSelect.value,
	};

	// Save to localStorage
	localStorage.setItem("dropdownValues", JSON.stringify(selectedValues));

	// Send the data to contentScript.js in the active tab
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]?.id) {
			chrome.tabs.sendMessage(tabs[0].id, {
				type: "DROPDOWN_VALUES",
				values: selectedValues,
			});
		}
	});
}

// Restore saved values from localStorage on popup load
document.addEventListener("DOMContentLoaded", () => {
	const miningSelect = document.querySelector("#miningSelect");
	const recruitingSelect = document.querySelector("#recruitingSelect");

	const savedValues = JSON.parse(
		localStorage.getItem("dropdownValues") || "{}"
	);

	// Set saved values if available
	if (savedValues.minimumMiningAllowed) {
		miningSelect.value = savedValues.minimumMiningAllowed;
	}
	if (savedValues.minimumRecruitingAllowed) {
		recruitingSelect.value = savedValues.minimumRecruitingAllowed;
	}

	// Add event listeners for changes in the dropdowns
	miningSelect.addEventListener("change", saveAndSendDropdownValues);
	recruitingSelect.addEventListener("change", saveAndSendDropdownValues);
	saveAndSendDropdownValues();
});

// Save selected values to localStorage
function saveDropdownValues() {
	const miningSelect = document.querySelector("#miningSelect");
	const recruitingSelect = document.querySelector("#recruitingSelect");

	localStorage.setItem("minimumMiningAllowed", miningSelect.value);
	localStorage.setItem("minimumRecruitingAllowed", recruitingSelect.value);
}

// Restore saved values from localStorage
function restoreDropdownValues() {
	const miningSelect = document.querySelector("#miningSelect");
	const recruitingSelect = document.querySelector("#recruitingSelect");

	const savedMiningValue = localStorage.getItem("minimumMiningAllowed");
	const savedRecruitingValue = localStorage.getItem(
		"minimumRecruitingAllowed"
	);

	// Set the saved values if they exist
	if (savedMiningValue) {
		miningSelect.value = savedMiningValue;
	}
	if (savedRecruitingValue) {
		recruitingSelect.value = savedRecruitingValue;
	}
}

// Event listener for saving and restoring values
document.addEventListener("DOMContentLoaded", () => {
	// Restore values when the popup opens
	restoreDropdownValues();

	// Save values when the dropdown selection changes
	document
		.querySelector("#miningSelect")
		.addEventListener("change", saveDropdownValues);
	document
		.querySelector("#recruitingSelect")
		.addEventListener("change", saveDropdownValues);
});
document.addEventListener("DOMContentLoaded", () => {
	sendDataValuesToContentScript();
});
//________________________________________________________________________________Flash___________________________________________________________________________________\\


document.getElementById("flash_drop").addEventListener("click", () => {
	if (flash_visible) {
		flash_visible = false;
		document.getElementById("flash").style.display = "none";
	} else {
		flash_visible = true;
		document.getElementById("flash").style.display = "block";
	}
});
const flash_ = document.getElementById("flash_active");
// Listen for changes on the checkbox
flash_.addEventListener("change", () => {
	if (flash_.checked) {
		flash_active = true;
		// Add any additional actions you want to trigger when the switch is on
	} else {
		flash_active = false;
		// Add any additional actions you want to trigger when the switch is off
	}
});

document.addEventListener("DOMContentLoaded", () => {
	// Load the saved state from localStorage when the page loads
	if (localStorage.getItem("flash_state") === "true") {
		flash_.checked = true;
	} else {
		flash_.checked = false;
	}

	// Save the state to localStorage whenever the switch is toggled
	flash_.addEventListener("change", () => {
		const isChecked_flash = flash_.checked;
		localStorage.setItem("flash_state", isChecked_flash);

		// Communicate the state to the content script
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				flash: isChecked_flash,
			});
		});
	});
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { flash: flash_.checked });
	});
});
//________________________________________________________________________________vurnability___________________________________________________________________________________\\


document.getElementById("vurnability_drop").addEventListener("click", () => {
	if (reroll_visible) {
		reroll_visible = false;
		document.getElementById("vurnability").style.display = "none";
	} else {
		reroll_visible = true;
		document.getElementById("vurnability").style.display = "block";
	}
});
const vurnability_ = document.getElementById("vurnability_active");
// Listen for changes on the checkbox
vurnability_.addEventListener("change", () => {
	if (vurnability_.checked) {
		vurnability_active = true;
		// Add any additional actions you want to trigger when the switch is on
	} else {
		vurnability_active = false;
		// Add any additional actions you want to trigger when the switch is off
	}
});

document.addEventListener("DOMContentLoaded", () => {
	// Load the saved state from localStorage when the page loads
	if (localStorage.getItem("vurnability_state") === "true") {
		vurnability_.checked = true;
	} else {
		vurnability_.checked = false;
	}

	// Save the state to localStorage whenever the switch is toggled
	vurnability_.addEventListener("change", () => {
		const isChecked_vurnability = vurnability_.checked;
		localStorage.setItem("vurnability_state", isChecked_vurnability);

		// Communicate the state to the content script
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				Vurnability: isChecked_vurnability,
			});
		});
	});
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { Vurnability: vurnability_.checked });
	});
});

//________________________________________________________________________________book___________________________________________________________________________________\\

document.getElementById("book_drop").addEventListener("click", () => {
	if (book_visible) {
		book_visible = false;
		document.getElementById("book").style.display = "none";
	} else {
		book_visible = true;
		document.getElementById("book").style.display = "block";
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const book_ = document.getElementById("book_active");

	if (localStorage.getItem("book_state") === "true") {
		book_.checked = true;
	}

	book_.addEventListener("change", () => {
		const isChecked = book_.checked;
		localStorage.setItem("book_state", isChecked);
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				book: isChecked,
			});
		});
	});
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { book: book_.checked });
	});
});

//________________________________________________________________________________rank___________________________________________________________________________________\\

document.getElementById("rank_drop").addEventListener("click", () => {
	if (rank_visible) {
		rank_visible = false;
		document.getElementById("rank").style.display = "none";
	} else {
		rank_visible = true;
		document.getElementById("rank").style.display = "block";
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const rank_ = document.getElementById("rank_active");

	if (localStorage.getItem("rank_state") === "true") {
		rank_.checked = true;
	}

	rank_.addEventListener("change", () => {
		const isChecked = rank_.checked;
		localStorage.setItem("rank_state", isChecked);
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				rank: isChecked,
			});
		});
	});
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { rank: rank_.checked });
	});
});

//________________________________________________________________________________skill_tree___________________________________________________________________________________\\

document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.skill-btn');

	// Restore previously‑active skills
	chrome.storage.local.get({ activeSkills: [] }, ({ activeSkills }) => {
		buttons.forEach(btn => {
			const id = Number(btn.dataset.skillId);
			if (activeSkills.includes(id)) {
				btn.classList.add('active');
			}
		});
	});

	//  Wire up click handlers
	buttons.forEach(btn => {
		chrome.storage.local.get(null, (res) => {
			console.log('Current storage:', res);
		});

		btn.addEventListener('click', () => {
			const id = Number(btn.dataset.skillId);
			btn.classList.toggle('active');

			// Read, update, then write the list of active IDs
			chrome.storage.local.get({ activeSkills: [] }, ({ activeSkills }) => {
				let next = [...activeSkills];

				if (btn.classList.contains('active')) {
					if (!next.includes(id)) next.push(id);   // add
				} else {
					next = next.filter(x => x !== id);       // remove
				}

				chrome.storage.local.set({ activeSkills: next });
			});
		});
	});
});