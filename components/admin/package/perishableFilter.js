angular.module('admin')

.filter('perishableFilter', function () {
	return function (perishable) {
		var yesOrNo;

		if (perishable)
			yesOrNo = 'Yes';
		else
			yesOrNo = 'No';

		return yesOrNo;
	};
});
