<?php
	ini_set('display_errors', true);
	require 'includes/header.php';
?>
		<form id="loginForm" action="inventory" method="POST">
		  <h1>Sign In</h1>
		  <div class="form-group">
		    <label for="exampleInputEmail1">Username</label>
		    <input type="text" class="form-control" name="username" placeholder="Username">
		  </div>
		  <div class="form-group">
		    <label for="exampleInputPassword1">Password</label>
		    <input type="password" class="form-control" name="password" placeholder="Password">
		  </div>
		  <button type="submit" class="btn btn-info">Submit</button>
		  
		  <br><br> <a href="signup" rel="signup">Don&rsquo;t have an account? Sign up!</a>
		</form>

<?php require 'includes/footer.php'; ?>