let submitButton = document.getElementById("submit");
let questionDiv = document.getElementById("questions");
let responseDiv = document.getElementById("response");
responseDiv.style.display = "none";

let home = document.getElementById("home");
let questionArray = [];

let oldQuestions = localStorage.getItem("oldQuestions");
let current;
let response_container = document.getElementById("response_container");
let submit_response = document.getElementById("submit_response");

let new_form = document.getElementById("new");


let search = document.getElementById("search");

let resolve = document.getElementById("resolve");
if (oldQuestions)
    questionArray = JSON.parse(oldQuestions);



questionArray.forEach(function (data, index) {
    createDiv(data, index);
})
submitButton.addEventListener("click", appendQuestion);

function createDiv(data, index) {

    let div = document.createElement("div");
    let heading = document.createElement("h3");
    let para = document.createElement("p");

    heading.innerText = data.title;
    para.innerText = data.question;
    heading.setAttribute("id", "itemsHeading")
    para.setAttribute("id", "itemsPara")
    // div.setAttribute("id","itemsDiv")
    div.setAttribute("id", index);
    div.appendChild(heading);
    div.appendChild(para);

    questionDiv.appendChild(div);

    div.addEventListener("click", function () {
        response_container.innerHTML = "";
        current = index;
        home.style.display = "none";
        responseDiv.style.display = "block";

        document.getElementById("ques").innerText = data.title;
        document.getElementById("desc").innerText = data.question;

        data.comments.forEach(function (c) {
            createResponse(c);
        })
    })

}

function createResponse(c) {
    var div = document.createElement("div");
    var name = document.createElement("h3");
    var comment = document.createElement("p");

    name.innerText = c.name;
    comment.innerText = c.comment;

    div.appendChild(name);
    div.appendChild(comment);

    div.classList.add("ques")

    response_container.appendChild(div);

}

function appendQuestion() {
    let title = document.getElementById("subject").value;
    let description = document.getElementById("description").value;

    document.getElementById("subject").value = "";
    document.getElementById("description").value = "";

    let question = {
        title: title,
        question: description,
        comments: []
    }
    createDiv(question, questionArray.length)
    questionArray.push(question);

    localStorage.setItem("oldQuestions", JSON.stringify(questionArray))

    document.getElementById("subject").value = "";
    document.getElementById("description").value = "";

}


submit_response.addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let comment = document.getElementById("comment").value;

    let data = {
        name,
        comment  // array destructing //
    }
    createResponse(data);
    questionArray[current].comments.push(data);
    localStorage.setItem("oldQuestions", JSON.stringify(questionArray))

    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";

})

resolve.addEventListener("click", function () {
    document.getElementById("home").style.display = "block";
    document.getElementById("response").style.display = "none";





    let div = document.getElementById(`${current}`);


    document.getElementById("questions").removeChild(div);

    questionArray.splice(current, 1);
    localStorage.setItem("oldQuestions", JSON.stringify(questionArray))


})

new_form.addEventListener("click", function () {
    document.getElementById("home").style.display = "block";
    document.getElementById("response").style.display = "none";
})



search.addEventListener("input", function (event) {
    let term = event.target.value.toLowerCase();
    document.getElementById("questions").innerHTML = "";

    let filter = questionArray.filter(function (item) {
        return (
            item.title.toLowerCase().includes(term) || item.question.toLowerCase().includes(term)
        );

    })

    if (filter.length > 0) {
        filter.forEach(function (q, index) {
            createDiv(q, index);
        })

    }
    else {
        document.getElementById("questions").innerHTML = "<h3>Not Found</h3>";
    }

})