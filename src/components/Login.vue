<template>
    <form>
		<h1>Login</h1>
		<label>Email</label>
		<input type="email" required v-model="email">

		<div class="submit">
			<button>Login</button>
		</div>
	</form>

</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			email: ''
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
	label {
		color: #aaa;
		display: inline-block;
		margin: 25px 0 15px;
		font-size: 0.6em;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-weight: bold;
	}
	input {
		display: block;
		padding: 10px 6px;
		width: 100%;
		box-sizing: border-box;
		border: none;
		border-bottom: 1px solid #ddd;
		color: #555;
	}
</style>