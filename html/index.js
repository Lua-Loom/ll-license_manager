window.addEventListener('message', function (event) {
    var item = event.data;
    var ourDiv = document.querySelector('.OurDiv');

    if (item.showUI) {
        ourDiv.style.opacity = '1';
        ourDiv.classList.add('show');
    } else {
        ourDiv.style.opacity = '0';
        ourDiv.classList.remove('show');
    }
});

function closeUI() {
    var ourDiv = document.querySelector('.OurDiv');
    ourDiv.style.opacity = '0';
    ourDiv.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function () {
    function closeUI() {

        var ourDiv = document.querySelector('.OurDiv');
        ourDiv.style.opacity = '0';
        ourDiv.classList.remove('show');


        var data = { closeUI: true };
        SendNUIMessage(data);
    }
});

function selectAction(action) {
    document.getElementById("actionDropdownButton").textContent = action;
    var selectedAction = action;
}

function selectLicense(license) {
    document.getElementById("licenseDropdownButton").textContent = license
    var selectedLicense = license
}

function selectTarget(target) {
    document.getElementById("targetDropdownButton").textContent = target
    var selectedLicense = target

    console.log('Selected Action:', action);
    console.log('Selected Player ID:', playerId);
}

function toggleLicenseDropdown() {
    const licenseDropdown = document.getElementById("licenseDropdown");
    licenseDropdown.classList.toggle("show");
}

function toggleActionDropdown() {
    const actionDropdown = document.getElementById("actionDropdown");
    actionDropdown.classList.toggle("show");
}

function toggleTargetDropdown() {
    const actionDropdown = document.getElementById("targetDropdown");
    actionDropdown.classList.toggle("show");
}

window.addEventListener('message', function (event) {
    let data = event.data;
    if (data.type === 'updatePlayerIds') {
        let playerIds = data.playerIds;
        document.getElementById('targetDropdown').innerHTML = '';
        playerIds.forEach(playerId => {
            let aTag = document.createElement('a');
            aTag.href = '#';
            aTag.onclick = function () {
                selectTarget(playerId);
            };
            let icon = document.createElement('i');
            icon.className = 'fa-solid fa-hashtag';
            icon.style.color = '#ff9900';
            aTag.appendChild(icon);
            aTag.appendChild(document.createTextNode(' ' + playerId));
            let listItem = document.createElement('div');
            listItem.appendChild(aTag);
            document.getElementById('targetDropdown').appendChild(listItem);
        });
    }
});









window.addEventListener('message', function (event) {
    let data = event.data;

    if (data.type === 'updateLicenses') {
        let ll_type = data.ll_license_type;
        let ll_label = data.ll_license_label;
        let combiner = ll_label + ' | ' + ll_type;
        let combinerArray = combiner.split(" | ");
        document.getElementById('licenseDropdown').innerHTML = '';

        let uniqueItems = [];

        for (let i = 0; i < combinerArray.length; i += 2) {
            let display_label = combinerArray[i];
            let metadata = combinerArray[i + 1];
        
            let itemObject = {
                display_label: display_label,
                metadata: metadata
            };
        
            if (!uniqueItems.some(item => item.display_label === itemObject.display_label && item.metadata === itemObject.metadata)) {
                uniqueItems.push(itemObject);
            }
        }
        
        uniqueItems.forEach(item => {
            console.log("Display Label:", item.display_label);
            console.log("Metadata:", item.metadata);
            console.log("-------------------------------------------------------------------");
        
            let aTag = document.createElement('a');
            aTag.href = '#';
        
            // Use let to create a new variable scope for each iteration
            let currentMetadata = item.metadata;
            aTag.onclick = function () {
                selectLicense(currentMetadata);
            };
        
            let icon = document.createElement('i');
            icon.className = 'fa-solid fa-hashtag';
            icon.style.color = '#ff9900';
        
            aTag.appendChild(icon);
            aTag.appendChild(document.createTextNode(' ' + item.display_label));
        
            let listItem = document.createElement('div');
            listItem.appendChild(aTag);
            document.getElementById('licenseDropdown').appendChild(listItem);
        });
    }
});