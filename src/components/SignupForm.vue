<template>
    <form @submit="submitData">
		<h1>Registration</h1>
		<input type="text" required v-model="mobile" placeholder="Mobile Number">

		<input type="text" required v-model="firstName" placeholder="First Name">
		

		<input type="text" required v-model="lastName" placeholder="Last Name">

		<p>Date of Birth:</p>
		<div>
			<select required v-model="month">
				<option value="" selected hidden>Month</option>
				<option v-for="item in monthSelection" v-bind:key="item.text" v-bind:value="item.value">{{item.text}}</option>
			</select>
			<select required v-model="date">
				<option value="" selected hidden>Date</option>
				<option v-for="item in dateSelection" v-bind:key="item" v-bind:value="item">{{item}}</option>
			</select>
			<select required v-model="year">
				<option value="" selected hidden>Year</option>
				<option v-for="item in yearSelection" v-bind:key="item" v-bind:value="item">{{item}}</option>
			</select>
		</div>

		<div>
			<label for="male" class="male">
				<input type="radio" id="male" value="Male" v-model="gender">
				<p class="gender">Male</p>
			</label>
			<label for="female" class="female">
				<input type="radio" id="female" value="Female" v-model="gender">
				<p class="gender">Female</p>
			</label>
		</div>

		<input required v-model="email" placeholder="Email">

		<div class="submit">
			<button :disabled='!isDisabled'>Register</button>
		</div>

		<vue-bottom-dialog v-model="dialog">
			<div class="submit" @click="login">
				<button>Login</button>
			</div>
		</vue-bottom-dialog>
	</form>

</template>

<script>
const qs = require('qs')
export default {
	name: 'SignupForm',
	data() {
		return {
			mobile: '',
			firstName: '',
			lastName: '',
			month: '',
			date: '',
			year: '',
			gender: '',
			email: '',
			showModal: false,
			dialog: false,
			monthSelection: [{text: 'January', value: '1'}, {text: 'February', value: '2'}, {text: 'March', value: '3'}, {text:'April', value: '4'}, {text: 'May', value:'5'}, {text: 'June', value: '6'}, {text: 'July', value: '7'}, {text: 'August', value: '8'}, {text: 'September', value: '9'}, {text: 'October', value: '10'}, {text: 'November', value: '11'}, {text: 'December', value: '12'}],
			dateSelection: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
			yearSelection: ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
		}
	},
	methods: {
		login() {
			this.$router.push('/login')
		},
		submitData () {
			const vm = this
			const url = 'http://localhost:5000/api/register'
			if (vm.year != '' && vm.month != '' && vm.date != '') {
				const dateString = vm.year + '/' + vm.month + '/' + vm.date
				var date = new Date(dateString);
			}
			const data = qs.stringify({
				'first_name': vm.firstName,
				'last_name': vm.lastName,
				'mobile_no': vm.mobile,
				'email': vm.email,
				'gender': vm.gender,
				'date_of_birth': date
			})
			vm.axios.post(url, data)
			.then(function (response) {
			if (response.status === 201) {
				if (response.data.message === 'Mobile Number is not valid') {
					alert('Please enter valid Indonesian phone number')
				} else if (response.data.message === 'User already exists') {
					alert('User already exists')
				} else {
					vm.dialog = true
				}
				}
			})
		}
	},
	computed: {
		isDisabled: function(){
			return this.firstName && this.lastName && this.mobile && this.email && this.month && this.year && this.date;
		}
	}
}
</script>

<style>
	form {
		max-width: 420px;
		margin: 30px auto;
		background: white;
		text-align: left;
		padding: 40px;
		border-radius: 10px;
	}
	p {
		color: #aaa;
		display: inline-block;
		margin: 0;
		font-size: 0.6em;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-weight: bold;
	}
	input[type="text"] {
		display: block;
		padding: 10px 6px;
		width: 100%;
		box-sizing: border-box;
		border: none;
		border-bottom: 1px solid #ddd;
		color: #555;
		margin: 40px 0;
	}
	select{
		display: relative;
		margin: 20px;
		border: none;
		border-bottom: 1px solid #ddd;
		color: #555;
		background: white;
	}
	button {
		background: #9400D3;
		border: 0;
		padding: 10px 20px;
		margin-top: 20px;
		color: white;
		border-radius: 20px;
	}
	button:disabled {
		background: #DCDCDC;
		cursor: not-allowed;
	}
	.submit {
		text-align: center;
	}
	label {
		display: inline;
		white-space: nowrap;
		margin: 0px;
		vertical-align: middle;
	}
	input[type="radio"] {
		display: inline-block;
		margin: 20px;
	}
	.male {
		margin: 20px;
	}
	.female{
		margin:30px;
	}
	.gender {
		margin: 0 -20px;
		font-size: 1em;
	}
</style>