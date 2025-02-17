import { caro } from './components/carosello.js';
import { clog } from './components/login.js';
import { table } from './components/tabella.js';
import { createMiddleware } from "./middleware.js";
const middleware = createMiddleware();

const navigator = createNavigator(document.querySelector("#container"));
const homeBtn = document.getElementById("home-btn-ad");
const tableAd = document.getElementById("ad-table");
homeBtn.onclick = () => {
    document.getElementById("admin").style.display = 'none';
    document.getElementById("home").style.display = 'block';
}
clog();


(async () => {
    const inputFile = document.querySelector('#file');
    const button = document.querySelector("#button");
    const link = document.querySelector("#link");

    const find = async () => {
        try {
            const res = await fetch("http://localhost:5600/im");
            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
            const data = await res.json();
            console.log(data);
            if (data == []){
                console.log("trunc")
                truncate();
            }
            
            caro(data); 
            table(tableAd, data, delete_i);
        } catch (e) {
            console.log(e);
        }
    }
    
    const truncate = async () => {
        try {
            const res = await fetch("http://localhost:5600/truncate", {
                method: "DELETE" 
            });
            if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
            const data = await res.json();
            console.log(data);
            caro(data);
            table(tableAd, data, delete_i);
        } catch (e) {
            console.log(e);
        }
    }

    const delete_i = async (id) => {
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
            table(tableAd, data, delete_i);
        } catch (e) {
            console.log(e);
        }
    }

    const sub = async (event) => {
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
    find();
    button.onclick = sub;
})();