let items = [];

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemDescription = document.getElementById('itemDescription').value;

    if (itemName && itemDescription) {
        const item = {
            name: itemName,
            description: itemDescription
        };
        items.push(item);
        document.getElementById('itemName').value = '';
        document.getElementById('itemDescription').value = '';
        displayItems();
        saveItemsToLocalStorage();
    } else {
        alert('Por favor, llena todos los campos.');
    }
}

function removeItem(index) {
    items.splice(index, 1);
    displayItems();
    saveItemsToLocalStorage();
}

function editItem(index) {
    const item = items[index];
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;
    items.splice(index, 1);  // Remover el ítem mientras lo editamos
    saveItemsToLocalStorage();
}

function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        itemList.innerHTML += `
            <li>
                <strong>${item.name}</strong>: ${item.description}
                <button class="edit" onclick="editItem(${index})">Editar</button>
                <button class="delete" onclick="removeItem(${index})">Eliminar</button>
            </li>
        `;
    });
}

function loadItemsFromLocalStorage() {
    const storedItems = localStorage.getItem('crud-items');
    if (storedItems) {
        items = JSON.parse(storedItems);
        displayItems();
    }
}

function saveItemsToLocalStorage() {
    localStorage.setItem('crud-items', JSON.stringify(items));
}

// Llamar a la función al cargar la página
loadItemsFromLocalStorage();
