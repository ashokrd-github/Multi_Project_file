function showForm(formId){
    document.querySelectorAll(".form-box").forEach(form => form.classList.add("active"))
    document.querySelectorAll(formId).classList.add("active")
}