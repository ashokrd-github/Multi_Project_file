document.querySelector("#push").onclick = function(){
    if (document.querySelector("#newtask input").value.length == 0) {
        alert("Please Enter a Task...")
    }else{
        document.querySelector("#tasks").innerHTML += `
        <div class="tasks">
            <span id="taskName"> ${document.querySelector("#newtask input").value}</span>

            <button class="delete"> <i class="far fa-trash-alt"></i> </button>
        </div>
        `;
        const current_tasks = document.querySelectorAll(".delete");
        for (let i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function() {
                this.parentNode.remove();
            };
        }
        var tasks = document.querySelectorAll(".tasks");
        for(var i = 0; i < tasks.length; i++){
            tasks[i].onclick = function(){
                this.classList.toggle("completed")
            }
        }
        document.querySelector("#newtask input").value = ""
    }
}
