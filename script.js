const form  = document.querySelector('form')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const userelement = document.getElementById('username');
    const user = userelement.value;

    github(user)
})

async function github(user='') {
    try {
        const response = await fetch("https://api.github.com/users");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        if(user!=''){
            const personal = await fetch(`https://api.github.com/users/${user}`)
            
            if (!personal.ok) {
                alert("User not found!");
                return; 
            }
            const user_data = await personal.json();
            data = [user_data, ...data,]
        }
        const parent = document.querySelector('.container');

        if (!parent) {
            console.error("Error: '.container' element not found in HTML.");
            return;
        }
        parent.innerHTML = "";
        for (let user of data) {
            const user_box = document.createElement("div");

            user_box.classList.add("user_box"); 
            user_box.id = user.id.toString();

            const avatar = document.createElement('img');
            avatar.src = user.avatar_url;
            avatar.alt = `${user.login}'s avatar`; 

            const username = document.createElement('h2');
            username.textContent = user.login;

            const url = document.createElement('a');
            url.href = user.html_url;
            url.textContent = "Visit Profile";
            url.target = "_blank"; 

            user_box.append(avatar, username, url);
            parent.append(user_box);
        }

    } catch (error) {
        console.error("Failed to fetch GitHub users:", error);
    }
}

