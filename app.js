let form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    output.innerHTML = "";
    errorbox.innerHTML = "";
    errorbox.classList.remove("show");
    errorbox.style.display = "none";
    output.style.display = "none"
    loader.style.display = 'block'    
    username = document.querySelector("input").value;
    let data = await fetchapi(username);
    if (data) {
        loader.style.display = 'none'    
        output.style.display = "block";
        const firstrow = document.createElement("div");
        firstrow.setAttribute("id", "firstrow");
        output.appendChild(firstrow);
        firstrow.insertAdjacentHTML("afterbegin", `<img src="${data["avatar_url"]}" alt="Profile pic" >`);

        const row1 = ["followers", "following"];
        row1.forEach(row1 => {
            const div = document.createElement("div");
            div.innerText = `${row1}: ${data[row1]}`;
            div.setAttribute("id", row1);
            firstrow.appendChild(div);
        });

        const fields = ["name", "bio", "public_repos"];
        fields.forEach(field => {
            const p = document.createElement("p");
            let key = (data[field] === null) ? "None" : data[field] 
            p.innerText = `${field}: ${key}`;
            p.setAttribute("id", field);
            output.appendChild(p);
        });
    }
});
async function fetchapi(username) {
    try {
        let result = await fetch(`https://api.github.com/users/${username}`);
        if (!result.ok) throw new Error("user not found");
        let data = await result.json();
        console.log(data);
        errorbox.innerText = "";
        errorbox.style.display = "none";
        errorbox.classList.remove("show");
        output.style.display = "block";
        return data;
    } catch (err) {
        output.style.display = "none";
        loader.style.display = 'none'    
        errorbox.style.display="block"
        errorbox.innerText = "❌ GitHub user not found.";
        errorbox.classList.add("show");
        return null;
    }
}

