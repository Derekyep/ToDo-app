//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivty so the user can manage daily tasks

var taskInput =  document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder =  document.getElementById("incomplete-tasks");
var completedTasksHolder =  document.getElementById("completed-tasks");

//New Task List Item
var createNewTaskElement = function(taskString) {
		//create List Item
		var listItem = document.createElement("li");
		//input checkbox
		var checkBox = document.createElement("input"); // checkbox
		//lable
		var label = document.createElement("label");
    //input text
		var editInput = document.createElement("input"); //text
	
	  //button.edit	
		var editButton = document.createElement("button");
		
		//button.delete
		
		var deleteButton = document.createElement("button");
		
		//Each element needs modifying
	
		checkBox.type = "checkbox";
		editInput.type = "text";
	
		editButton.innerText = "Edit";
		editButton.className = "edit";
		deleteButton.innerText = "Delete";
		deleteButton.className = "delete";
	
	label.innerText = taskString;
		
   //Each element needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	
	return listItem;


}
//Add a new task
var addTask = function() {
	console.log("Add task...");
	//create a new list item with the text from #new-task
var listItem = createNewTaskElement(taskInput.value);
//Append listItem to incompleteTaskHolder
incompleteTasksHolder.appendChild(listItem);
bindTaskEvents(listItem, taskCompleted);
 	
taskInput.value = "";
}

//Edit an existing task
var editTask = function() {
	console.log("Edit task...");
	
	
	var listItem = this.parentNode;
	
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	
	var containsClass = listItem.classList.contains("editMode");
	
	//if the class of the parent is .editMode
	if(containsClass) {
		//switch from .editMode
		//label text become the input's text
		label.innerText = editInput.value;
		} else {
		//switch from .editMode
		//label text become the input's text	
			
		editInput.value = label.innerText;	
		}
		
		//toggle .editMode on the list item 
		listItem.classList.toggle("editMode");
		
		
	




}

var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	
	ul.removeChild(listItem);




}

var taskCompleted = function() {
	console.log("Task complete ...");
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);



}


var taskIncomplete = function() {
	console.log("task incomplete ...");
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
		console.log("Bind list item events");
//select its children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	
		//bind editTask to edit buttion
		editButton.onclick = editTask;
		//bind deleteTask to delete button
		deleteButton.onclick = deleteTask;
		//bind checkBoxEventHandler to checkbox
		checkBox.onchange = checkBoxEventHandler;

}
	
	var ajaxRequest = function() {
		console.log("AJAX request");
		
	}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);



//cycle over incompleteTaskHolder ul list item
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
		//bind events to list items's children (taskCompleted)
bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}	
		



//cycle over completedTaskHolder ul list item
for(var i = 0; i < completedTasksHolder.children.length; i++){

		//bind events to list items's children (taskIncompleted)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
	
		
		


