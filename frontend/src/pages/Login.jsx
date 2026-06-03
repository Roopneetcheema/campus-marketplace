function Login() {
  const handleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  return (
    <div>
      <h1>Campus Marketplace</h1>

      <button onClick={handleLogin}>
        Login With Thapar Google Account
      </button>
    </div>
  );
}

export default Login;