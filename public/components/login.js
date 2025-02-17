let myToken, myKey;
fetch('../conf.json')
    .then(response => {
        if (!response.ok) {
            console.log('ERRORE NEL CARICAMENTO');
        }
        return response.json();
    })
    .then(data => {
        myToken = data.cacheToken;
        myKey = data.myKey;
        console.log(myKey)
        console.log(myToken)
    })
    .catch(error => console.error('Errore:', error));
export const clog = () => {
    const inputName = document.querySelector("#user");
    const inputPassword = document.querySelector("#psw");
    const loginButton = document.getElementById("loginBtn");
    const esitoLog = document.getElementById("esitoLog");
    let isLogged = false;
    const login = (name, password) => {
        return new Promise((resolve, reject) => {
            fetch("https://ws.cipiaceinfo.it/credential/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "key": myToken
                },
                body: JSON.stringify({
                    username: name,
                    password: password
                })
            })
                .then(r => r.json())
                .then(r => {
                    console.log(r)
                    resolve(r.result);
                })
                .catch(reject);
        });
    };
    loginButton.onclick = () => {
        console.log(inputName.value, inputPassword.value);
        if(isLogged){
            loginModal.style.display = "none";
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            window.location.hash = 'admin';
            document.getElementById("admin").style.display = 'block';
            document.getElementById("home").style.display = 'none';
            document.getElementById("user-ad").innerHTML = inputName.value
        }
        login(inputName.value, inputPassword.value).then(result => {
            if (result) {
                isLogged = true;
                console.log(isLogged);
                loginModal.style.display = "none";
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
                window.location.hash = 'admin';
                document.getElementById("admin").style.display = 'block';
                document.getElementById("home").style.display = 'none';
                document.getElementById("user-ad").innerHTML = inputName.value
            } else {
                esitoLog.innerHTML =
                    '<div class="alert alert-danger">Credenziali Errate!</div>';
            }
        }).catch(error => {
            console.error('ERRORE DURANTE IL LOGIN:', error);
            esitoLog.innerHTML =
                '<div class="alert alert-danger"ERRORE!</div>';
        });
    };
    return {
        isLogged: () => isLogged
    };
};