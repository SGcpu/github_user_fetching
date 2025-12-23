async function github() {
    try {
        const response = await fetch("https://api.github.com/users");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const parent = document.querySelector('.container');

        if (!parent) {
            console.error("Error: '.container' element not found in HTML.");
            return;
        }

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

