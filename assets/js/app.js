/**
 ** JS for gantt chart view
 **/

var app = {};

//prepare json object for gantt chart
app.tasks = [
        {
        start: '2020-01-24',
        end: '2020-07-29',
        id: "Task 1",
        client_name: 'Saim',
        client_image: "image.png",
        name: 'Task1',
        custom_class: 'cc-1'
    },
        {
        start: '2020-03-24',
        end: '2020-05-29',
        id: "Task 2",
        client_name: 'Saim',
        client_image: "image.png",
        name: 'Task2',
        custom_class: 'cc-2'
    },
    {
        start: '2020-05-16',
        end: '2020-06-23',
        id: "Task 3",
        client_name: 'Shesha',
        client_image: "image.png",
        name: 'Task3',
        custom_class: 'cc-3'
    },
    {
        start: '2020-05-24',
        end: '2020-06-29',
        id: "Task 4",
        client_name: 'Zubair',
        client_image: "image.png",
        name: 'Task4',
        custom_class: 'cc-4'
    },
    {
        start: '2020-05-29',
        end: '2020-06-29',
        id: "Task 5",
        client_name: 'Sher',
        client_image: "image.png",
        name: 'Task5',
        custom_class: 'cc-5'
    },
        {
        start: '2020-06-24',
        end: '2020-07-10',
        id: "Task 6",
        client_name: 'Cina',
        client_image: "image.png",
        name: 'Task6',
        custom_class: 'cc-6'
    },
        {
        start: '2020-05-09',
        end: '2020-05-30',
        id: "Task 7",
        client_name: 'Saif',
        client_image: "image.png",
        name: 'Task7',
        custom_class: 'cc-4'
    },
        {
        start: '2020-05-06',
        end: '2020-05-20',
        id: "Task 8",
        client_name: 'John',
        client_image: "image.png",
        name: 'Task8',
        custom_class: 'cc-3'
    },
];

//prepare clients dropdown
$(document).ready(function () {
    var options = '';
    app.clients = $('.clients select');
    app.view_mode = $('.view-mode select');

    //remove duplicates
    var unique_clients = app.tasks.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.client_name === arr.client_name && t.client_name === arr.client_name)))
    $.each(unique_clients, function(key,value) {
        options += '<option>' + value.client_name + '</option>';
    });

    app.clients.append(options);
});

//redraw gantt chart based on selected client
app.filterClients = function(client) {
    var selected_client = client.children("option:selected"). val();
    var view_mode = app.view_mode.children("option:selected"). val();
    if(selected_client == 'all') {
        app.gantt_chart(app.tasks,view_mode);
    } else {
      var filtered_clients = app.tasks.filter( element => element.client_name == selected_client);
      app.gantt_chart(filtered_clients, view_mode);
    }
};

//redraw chart based on selected view mode
app.changeViewMode = function(mode) {
    var client = app.clients.children("option:selected"). val();
    tasks = client == 'all' ? app.tasks : app.tasks.filter( element => element.client_name == client);
    app.gantt_chart(tasks,mode.children("option:selected"). val());
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
        custom_popup_html: function(task) {
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
};

//initialize gantt chart
app.gantt_chart(app.tasks);