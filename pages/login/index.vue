<template>
<div>

  <div class="login-box">
    <img src="@/assets/moqaLogos/1.png" class="avatar">
      <h1>모두의 Q&A</h1>
      <h1>MOQA</h1>
      <form @submit.prevent="$router.push('/')">
        <p>ID</p>
        <input type="text" name="username" placeholder="Enter ID">
        <p>Password</p>
        <input type="password" name="password" placeholder="Enter Password">
        <input type="submit" name="submit" value="로그인" >
        <a href="#">Forgot Password</a>    
      </form>
  </div>  
</div>
</template>

<script>
export default {
  name: "Login",
  layout: "login"
};
</script>

<style>
.login-box {
  width: 320px;
  height: 440px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 70px 30px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: -50px;
  left: calc(50% - 50px);
}
h1 {
  margin: 0;
  padding: 0 0 20px;
  text-align: center;
  font-size: 22px;
}
.login-box p {
  margin: 0;
  padding: 0;
  font-weight: bold;
}
.login-box input {
  width: 100%;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 5px;
}
.login-box input[type="text"],
input[type="password"] {
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  height: 40px;
  color: #fff;
  font-size: 16px;
}
.login-box input[type="submit"] {
  border: none;
  outline: none;
  height: 40px;
  background: #1976d2;
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
  transition: all 0.5s;
}
.login-box input[type="submit"]:hover {
  cursor: pointer;
  background: #39dc79;
  color: white;
}

.login-box a {
  text-decoration: none;
  font-size: 14px;
  color: white;
}
.login-box a:hover {
  color: #39dc79;
}
</style>


