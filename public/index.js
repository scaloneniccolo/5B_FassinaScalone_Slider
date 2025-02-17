import { caro } from '../carosello.js';
import { login } from '../login.js';
import { tab } from '../table.js';

const homeBtn = document.getElementById("home-btn-ad");
const tableAd = document.getElementById("ad-table");
homeBtn.onclick = () => {
    document.getElementById("admin").style.display = 'none';
    document.getElementById("home").style.display = 'block';
}
login();


(async () => {
    const inputFile = document.querySelector('#file');
    const button = document.querySelector("#button");
    const link = document.querySelector("#link");

    const cerca_immagini = async () => {
        try {
            const res = await fetch("http://localhost:5600/images");
            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
            const data = await res.json();
            console.log(data);
            if (data == []){
                console.log("trunc")
                trunc();
            }
            
            caro(data); 
            tab(tableAd, data, delete_immagini);
        } catch (e) {
            console.log(e);
        }
    }
    
    const trunc = async () => {
        try {
            const res = await fetch("http://localhost:5600/truncate", {
                method: "DELETE" 
            });
            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
            const data = await res.json();
            console.log(data);
            caro(data);
            tab(tableAd, data, delete_immagini);
        } catch (e) {
            console.log(e);
        }
    }

    const delete_immagini = async (id) => {
        try {
            const res = await fetch(`http://localhost:5600/delete/${id}`, {
                method: "DELETE" 
            });
            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
            const res1 = await fetch("http://localhost:5600/images");
            if (!res1.ok) throw new Error(`Errore HTTP: ${res1.status}`);
            const data = await res1.json();
            console.log(data);
            caro(data); 
            tab(tableAd, data, delete_immagini);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", inputFile.files[0]);
        const body = formData;
        const fetchOptions = {
            method: 'post',
            body: body
        };
        try {
            const res = await fetch("http://localhost:5600/upload", fetchOptions);
            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
            const data = await res.json();
            console.log(data);
            link.setAttribute("href", data.url);
            link.innerText = data.url;
            caro(data.url); 
        } catch (e) {
            console.log(e);
        }
    }
    cerca_immagini();
    button.onclick = handleSubmit;
})();