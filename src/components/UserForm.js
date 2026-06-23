import React, { useState,useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";  



function UserForm({ addUser,updateUser,selectedUser,onCancel }) {
  const [formData, setFormData] = useState({
  username: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "", 
  status: "Active",
  role: "User",
});

const [showPassword, setShowPassword] = useState(false);
const [phoneError, setPhoneError] = useState("");
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");
const [passwordStrength, setPasswordStrength] = useState("");

 useEffect(() => {
  if (selectedUser) {
    setFormData({
      id: selectedUser.id,
      username: selectedUser.username || "",
      phone: selectedUser.phone || "",
      email: selectedUser.email || "",
      password: "",
      confirmPassword: "",
      address: selectedUser.address || "",
      status: selectedUser.status || "Active",
      role: selectedUser.role || "User",
    });
  }
}, [selectedUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  

   if (e.target.name === "phone") {
  const phoneRegex = /^[6-9]\d{9}$/;

  if (
    e.target.value.length === 10 &&
    !phoneRegex.test(e.target.value)
  ) {
    setPhoneError(
      "Please enter a valid Indian mobile number"
    );
  } else {
    setPhoneError("");
  }
}

 if (e.target.name === "email") {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    e.target.value.length > 0 &&
    !emailRegex.test(e.target.value)
  ) {
    setEmailError("Please enter a valid email address");
  } else {
    setEmailError("");
  }
}

  if (e.target.name === "password") {
    setPasswordError("");
  }

  if (e.target.name === "password") {
  const password = e.target.value;

  let strength = "Weak";

  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password)
  ) {
    strength = "Medium";
  }

  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[@$!%*?&]/.test(password)
  ) {
    strength = "Strong";
  }

  setPasswordStrength(strength);
}
};

  const handleSubmit = (e) => {
  e.preventDefault();

  const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(formData.phone)) {
  setPhoneError("Please enter a valid  mobile number");
  return;
}

setPhoneError("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {
  setEmailError("Please enter a valid email address");
  return;
}

setEmailError("");

if (!selectedUser) {
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordRegex.test(formData.password)) {
  setPasswordError(
    "Password must contain 8+ chars, uppercase, lowercase, number and special character"
  );
  return;
}
}

setPasswordError("");


  if (!formData.email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  if (formData.phone.length !== 10) {
    alert("Phone number must be 10 digits");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  
   if (selectedUser) {
    updateUser(formData);
  } else {
    addUser(formData);
  
};
  

  setFormData({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    status: "Active",
    role: "User",
  });
  onCancel();
};
  return (
    <form onSubmit={handleSubmit} className="card shadow p-4 mb-4">
      
      <div className="row">

    <div className="col-md-6 mb-3">
     <label className="form-label">
      Username
     </label>

    <input
      type="text"
      name="username"
      className="form-control"
      placeholder="Username"
      value={formData.username}
      onChange={handleChange}
    />
  </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Phone Number
          </label>

          <input
           type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            maxLength="10"
          />

          {phoneError && (
            <small className="text-danger">
              {phoneError}
            </small>
          )}
        </div>
          
         


       <div className="row">
       <div className="col-md-6 mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {emailError && (
          <small className="text-danger">
            {emailError}
          </small>
        )}
      </div>
      
         
 <div className="col-md-6 mb-3">
  <label className="form-label">Role</label>

  <select
    className="form-select"
    name="role"
    value={formData.role}
    onChange={handleChange}
  >
    <option value="Admin">Admin</option>
    <option value="User">User</option>
  </select>
  
</div>
</div>
 </div>     

      
        {!selectedUser &&  (
      <div className="row">
      
      <div className="col-md-6 mb-3">
  <label className="form-label">Password</label>

  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      className="form-control"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
    />

    <span
      className="input-group-text"
      style={{ cursor: "pointer" }}
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  {/* Password Strength BELOW */}
  {passwordStrength && (
    <div className="mt-1">
      <small
        className={
          passwordStrength === "Strong"
            ? "text-success"
            : passwordStrength === "Medium"
            ? "text-warning"
            : "text-danger"
        }
      >
        {passwordStrength === "Strong" && "🟢 Strong Password"}
        {passwordStrength === "Medium" && "🟡 Medium Password"}
        {passwordStrength === "Weak" && "🔴 Weak Password"}
      </small>
    </div>
  )}
  {passwordError && (
    <small className="text-danger">
      {passwordError}
    </small>
  )}

</div> 
 
       
      <div className="col-md-6 mb-3">
        <label className="form-label">Confirm Password</label>
        <div className="input-group">
        <input
         type={showPassword ? "text" : "password"}
         name="confirmPassword"
         className="form-control"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
       />

        <span
          className="input-group-text"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
       </div>
       </div>
       </div>
       )}
      
       <div className="row">
       <div className="col-md-8 mb-3">
        <label className="form-label">Address</label>
        <textarea
           name="address"
           rows="1"
           className="form-control"
           value={formData.address}
           onChange={handleChange}
        />
      </div>
       
      <div className="col-md-4 mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      </div>
      
      
     <div className="d-flex justify-content-end gap-2 mt-3">

  <button
    type="button"
    className="btn btn-secondary"
    onClick={onCancel}
  >
    Cancel
  </button>

  <button
  type="submit"
  className={`btn ${
    selectedUser
      ? "btn-success"
      : "btn-primary"
  }`}
>
  {selectedUser
    ? "Update User"
    : "Add User"}
</button>

</div>

    </form>
  );
}
export default UserForm;