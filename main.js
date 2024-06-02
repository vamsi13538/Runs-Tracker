$(document).one('pageinit', function() {

    // Display runs on page initialization
    showRuns();

    // Add tap/click event on submit button in add page
    $('#submitAdd').on('tap', addRun);

    // edit tap/click event on update button in edit page
    $('#submitEdit').on('tap', editRun);

    // delete tap/click event on delete button in edit page
    $('#stats').on('tap', '#deleteLink', deleteRun);

    // clearRuns tap/click event on clear all activity button in home page
    $('#clearRuns').on('tap', clearRuns);

    // Set current handler
    $('#stats').on('tap', '#editLink', setCurrent);

    // Functionality for displaying runs
    function showRuns() {
        // Get the runs object values from localStorage
        var runs = getRunsObject();

        // Check if the runs object is not empty
        if (runs != null && runs.length > 0) {
            for (let i = 0; i < runs.length; i++) {
                $('#stats').append(
                    `<li id="listitems" class="ui-body-inherit ui-li-static">
                        <strong>Date:</strong> ${runs[i].date}<br>
                        <strong>Distance:</strong> ${runs[i].kms} km
                        <div class="controls">
                            <a id="editLink" href="#edit" data-kms="${runs[i].kms}" data-date="${runs[i].date}">Edit</a> | 
                            <a href="#delete" id="deleteLink" onclick="return confirm('Are You sure to delete ?')" data-kms="${runs[i].kms}" data-date="${runs[i].date}">Delete</a>
                        </div>
                    </li>`
                );
            }

            // Refresh the list view after adding items
            $('#stats').listview('refresh');
        }else{
            $('#stats').html(`<p>You have no logged runs!</p>`);
        }
    }

    // Functionality for adding a run
    function addRun() {
        // Initialize the variables
        var kms = $('#addKms').val();
        var date = $('#addDate').val();

        // Validate the input fields
        if (kms === '' || date === '') {
            alert('Please enter all fields');
            return false;
        }

        // Create a new object for collecting runs and date
        var run = {
            date: date,
            kms: parseFloat(kms)
        };

        var runs = getRunsObject();

        // Add run to runs
        runs.push(run);

        // Save the runs to localStorage in stringified format
        localStorage.setItem('runs', JSON.stringify(runs));

        // Notify the user of the successful addition
        alert('Run added successfully!');

        // Clear the input fields
        $('#addKms').val('');
        $('#addDate').val('');

        // Redirect to home page
        window.location.href = "index.html";

        // Prevent the form from submitting
        return false;
    }

     // Functionality for editing a run
     function editRun(){

        // Get current data
        currentKms = localStorage.getItem('currentKms');
        currentDate = localStorage.getItem('currentDate');

         var runs = getRunsObject();

         // Loop through runs
         for(let i=0; i<runs.length; i++){
            if(runs[i].kms == currentKms && runs[i].date == currentDate){
                runs.splice(i, 1);
            }
            localStorage.setItem('runs', JSON.stringify(runs));
         }

         // Initialize the variables
         var kms = $('#editKms').val();
         var date = $('#editDate').val();

         // Create a new object for collecting runs and date
        var update_run = {
            date: date,
            kms: parseFloat(kms)
        };

        // Add run to runs
        runs.push(update_run);

        // Save the runs to localStorage in stringified format
        localStorage.setItem('runs', JSON.stringify(runs));

        // Notify the user of the successful addition
        alert('Runs Updated successfully!');

        // Redirect to home page
        window.location.href = "index.html";

        // Prevent the form from submitting
        return false;

     }

     // Functionallity for deleting run
     function deleteRun(){

        // Set localstorage items
        localStorage.setItem('currentKms', $(this).data('kms'));
        localStorage.setItem('currentDate', $(this).data('date'))

        // Get current data
        currentKms = localStorage.getItem('currentKms');
        currentDate = localStorage.getItem('currentDate');

         var runs = getRunsObject();

         // Loop through runs
         for(let i=0; i<runs.length; i++){
            if(runs[i].kms == currentKms && runs[i].date == currentDate){
                runs.splice(i, 1);
            }
            localStorage.setItem('runs', JSON.stringify(runs));
         }

        // Notify the user of the successful deletion
        alert('Runs Deleted successfully!');

        // Redirect to home page
        window.location.href = "index.html";

        // Prevent the form from submitting
        return false;

     }

     function clearRuns(){
        localStorage.removeItem('runs');
        $('#stats').html(`<p>You have no logged runs!</p>`);
     }

    // Get runs object from localStorage
    function getRunsObject() {
        // Set runs array
        var runs = [];

        // Get current runs from localStorage
        var currentRuns = localStorage.getItem('runs');

        // Check if runs are present in localStorage
        if (currentRuns != null) {
            // Parse and set runs
            runs = JSON.parse(currentRuns);
        }

        // Return runs in the latest order
        return runs.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    // Set the current clicked kms & date
    function setCurrent(){
        // Set localstorage items
        localStorage.setItem('currentKms', $(this).data('kms'));
        localStorage.setItem('currentDate', $(this).data('date'))

        // Insert form input fields
        $('#editKms').val(localStorage.getItem('currentKms'));
        $('#editDate').val(localStorage.getItem('currentDate'));
    }

});
