<?php

if(!isset($_POST['client'])) {
	echo 'bad request';
}
else {
$tasks =  array( "0" => array(
        "start" => '2020-01-24',
        "end" => '2020-07-29',
        "id" => "Task 1",
        "client_name" => 'Saim',
        "client_image" => "image.png",
        "name" => 'Task1',
        'client_id' => 1,
        "custom_class" => 'cc-1'),
      "1" => array (
     	"start"=> '2020-03-24',
        "end"=> '2020-05-29',
        "id"=> "Task 2",
        "client_name"=> 'Saim',
        "client_image"=> "image.png",
        "name"=> 'Task2',
        'client_id' => 2,
        "custom_class"=> 'cc-2'
     ),
      "2" => array(
        "start"=> '2020-05-16',
        "end"=> '2020-06-23',
        "id" => "Task 3",
        "client_name" => 'Shesha',
        "client_image" => "image.png",
        "name"=> 'Task3',
        'client_id' => 3,
        "custom_class"=> 'cc-3'
    ),
      "3" => array(
        "start"=> '2020-05-24',
        "end"=> '2020-06-29',
        "id"=> "Task 4",
        "client_name"=> 'Zubair',
        "client_image"=> "image.png",
        "name"=> 'Task4',
        'client_id' => 4,
        "custom_class"=> 'cc-4'
      ),
      "4" => array(
        "start"=> '2020-05-29',
        "end"=> '2020-06-29',
        "id"=> "Task 5",
        "client_name"=> 'Sher',
        "client_image"=> "image.png",
        "name"=> 'Task5',
        'client_id' => 5,
        "custom_class"=> 'cc-5'
      ),
      "5" => array(
        "start"=> '2020-06-24',
        "end"=> '2020-07-10',
        "id"=> "Task 6",
        "client_name"=> 'Cina',
        "client_image"=> "image.png",
        "name"=> 'Task6',
        'client_id' => 6,
        "custom_class"=> 'cc-6'
      ),
      "6" => array(
        "start"=> '2020-05-09',
        "end"=> '2020-05-30',
        "id"=> "Task 7",
        "client_name"=> 'Saif',
        "client_image"=> "image.png",
        "name"=> 'Task7',
        'client_id' => 7,
        "custom_class"=> 'cc-4'
      ),
      "7" => array(
        "start"=> '2020-05-06',
        "end"=> '2020-05-20',
        "id"=> "Task 8",
        "client_name"=> 'John',
        "client_image"=> "image.png",
        "name"=> 'Task8',
        'client_id' => 8,
        "custom_class"=> 'cc-3'
      )
    );

//filter array based on the client if client is selected from frontend
$filtered_tasks = array();
if($_POST['client'] !== "all") {
  foreach ($tasks as $key => $value) {
  	if($value["client_name"] === $_POST["client"]) {
  		$filtered_tasks[] = $value;
  	}
  }
}

$tasks = count($filtered_tasks) > 0 ? $filtered_tasks : $tasks;

//add dump rows if array length is less than 8 to set a max height for chart you can chnage number 16 to increase or decrease height
if(count($tasks) < 8) {
	for($i = count($tasks); $i < 16 - count($tasks); $i++) {
		$tasks[$i] = array();
	}
}

//return tasks
echo json_encode($tasks);

}

?>