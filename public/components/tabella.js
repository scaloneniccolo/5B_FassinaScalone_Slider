export function tab(parentElement, data, delete_immagini) {
    console.log("TABELLA!");
    console.log(data);
    let html = `
        <table class="table-ad">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
    `;
    for (let i = 0; i < data.length; i++) {
        let img = data[i];
        console.log(img);
        let name = img.name.split("files/")[1];
        console.log(name);
        html += `
            <tr>
                <td>${img.id}</td>
                <td>${name}</td>
                <td><button id="delBtn${i}" class="del-btn">Delete</button></td>
            </tr>
        `;
    }
    html += `
            </tbody>
        </table>
    `;
    parentElement.innerHTML = html;
    for (let i = 0; i < data.length; i++) {
        let img = data[i]
        document.getElementById(`delBtn${i}`).onclick = () => delete_immagini(img.id);
    }
}