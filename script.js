//date
var d = new Date();
document.getElementById("date").innerText = d.toDateString();

// api call
const Http = new XMLHttpRequest();
const url =
    "https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init";
Http.open("GET", url);
Http.send();
Http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let list = data.list;

        function loadResults(array) {
            array.map(list => {
                let listUrl = list["thumbnail"][0]["url"];
                let listName = list["name"];
                let listBranding = list["branding"];
                let listLink = list["url"];
                let target = document.getElementById("widget-container");
                let div = document.createElement("div");

                div.innerHTML = `
                    <a href="${listLink}" target="_blank">
                        <div id ="image">
                        <img src="${listUrl}"/>
                        </div>
                        <h4>${listName}</h4>
                        <p>${listBranding} </p>
                    </a>`;
                target.append(div);

                if (list["categories"]) {
                    let category = list["categories"];
                    div.innerHTML += `
                    <p class="category">${category}</p>
                    `;
                }
            });
        }

        loadResults(list);
    }
};
