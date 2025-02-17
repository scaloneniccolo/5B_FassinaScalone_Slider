export function table(parentElement, data, delete_i) {
    let html = `
        <table class="table-ad">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
    `;
    for (let i = 0; i < data.length; i++) {
        let img = data[i];
        let name = img.name.split("files/")[1];
        html += `
            <tr>
                <td>${img.id}</td>
                <td>${name}</td>
                <td><button id="delBtn${i}" class="del-btn">DELETE</button></td>
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
        document.getElementById(`delBtn${i}`).onclick = () => delete_i(img.id);
    }
}