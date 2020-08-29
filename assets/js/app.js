/**
 ** JS for gantt chart view
 **/

var app = {
    gantt: ''
};

//ajax call to get data from backend
app.getData = function(client = "all", view_mode = "Month") {
   app.gantt_target.toggleClass("disable-chart-area");
    $.ajax({
        url: "app.php", 
        type: "post",
        data: {client: client}, 
        success: function(tasks) { 
        app.gantt_target.toggleClass("disable-chart-area");    
        app.tasks = JSON.parse(tasks);
        if(app.gantt == '') {
        //initialize gantt chart
        app.gantt_chart(app.tasks);
        app.createClientsDropdown();
        }
        else {
            app.redrawChart(app.tasks, view_mode)
        }
    }}); 
};

//create clients dropdown
app.createClientsDropdown = function () {
    var options = '';

    //remove duplicates
    var unique_clients = app.tasks.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.client_name === arr.client_name && t.client_name === arr.client_name)))
    $.each(unique_clients, function (key, value) {
        if(value.client_name){
        options += '<option>' + value.client_name + '</option>';
    }
    });

    app.clients.append(options);
};


//prepare clients dropdown
$(document).ready(function () {
    //initialize selectors
    app.clients = $('.clients select');
    app.view_mode = $('.view-mode select');
    app.gantt_target = $(".gantt-target");
    //draw initial chart
    app.getData();
});

//re-draw gantt chart based on selected filters
app.redrawChart = function (tasks, mode) {
    //refresh the gantt chart with new tasks and view mode
    app.gantt.options.view_mode = mode;
    app.gantt.refresh(tasks);
    //set height
    var new_height = app.gantt.$svg.getAttribute('height') - 100;
    app.gantt.$svg.setAttribute('height', new_height);
};

//redraw gantt chart based on selected client
app.filterClients = function (client) {
    var selected_client = client.children("option:selected").val();
    var view_mode = app.view_mode.children("option:selected").val();
    app.getData(selected_client, view_mode);
};

//redraw chart based on selected view mode
app.changeViewMode = function (mode) {
    var client = app.clients.children("option:selected").val();
    tasks = client == 'all' ? app.tasks : app.tasks.filter(element => element.client_name == client);
    if (client == 'all') {
        tasks = app.tasks;
    } else {
        var tasks = [];
        $.each(app.tasks, function (key, value) {
            if (value.client_name !== client) {
                tasks.push({});
            } else {
                tasks.push(value);
            }
        });
    }

    app.redrawChart(tasks, mode.children("option:selected").val());
};

//create gantt chart
app.gantt_chart = function (tasks, mode = 'Month') {
    console.log(tasks);
    var gantt = new Gantt(".gantt-target", tasks, {
        on_click: function (task) {
            //console.log(task);
        },
        on_date_change: function (task, start, end) {
            //console.log(task, start, end);
        },
        on_progress_change: function (task, progress) {
            //console.log(task, progress);
        },
        on_view_change: function (mode) {
            //console.log(mode);
        },
        custom_popup_html: function (task) {
            var start = task.start;
            var end = task.end;
            return `
            <div class="details-container">
              <h5>${task.name}</h5>
              <p>${start} - ${end}</p>
            </div>
          `;
        },
        view_mode: mode,
        language: 'en'
    });

    //customizations for scroll height
    var new_height = gantt.$svg.getAttribute('height') - 100;
    gantt.$svg.setAttribute('height', new_height);

    app.gantt = gantt;
};