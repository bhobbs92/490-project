<?php require './header.php' ?>
<div class="inventory"></div>
<script src="js/inventoryList.js"></script>

<script type="text/javascript">
	$.ajax({
		beforeSend: function (req) {
			req.setRequestHeader('JWT', localStorage.token);
		},
		url: 'inventory.php',
		success: function (res) {
			res = JSON.parse(res);
			console.log(res);

			if (res.success) {
				makeList(res.items, $('#inventory'));
			}
		}
	});
</script>

<?php require '../includes/footer.php' ?>