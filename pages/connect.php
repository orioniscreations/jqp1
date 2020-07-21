<?php


if(isset($_POST['submit'])){

$name = $_POST['name'];
$email = $_POST['email'];
$discord = $_POST['discord'];
$OrderOptions = $_POST['OrderOptions'];
$additionalCharacters = $_POST['additionalCharacters'];
$comments = $_POST['comments'];

$to='rysrps@gmail.com'
$subject='Commission Order'
$message=
"Name: " .$name."\n"
"Email: ".$email."\n"
"Discord: " .$discord."\n"
"Order: " .$OrderOptions."\n"
"Additional Characters: " .$additionalCharacters."\n\n"
"Comments: " .$comments.
$headers="From: " .$email;

if(mail($to, $subject, $mnessage, $headers)){
    echo "<h1>Order Successful! Thank you, "." " .$name. ". We will be contacting you soon regarding your Commission. </h1>";
} else {
    echo "Something went wrong."
}

}

//redirect back

header("Location:https://www.")
?>