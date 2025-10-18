import './AuthInput.css';

const AuthInput = (props) => {
  return (
    <div className="authInput">
      <input name={props.name} 
             type={props.type} 
             id={props.id} 
             className="form_input" 
             autoComplete="off" 
             placeholder=" " 
             onChange={props.onChange} 
             value={props.value ?? ""} // makes it so where prop value is never undefined
      />
      <label htmlFor={props.htmlFor} className="form_label">{props.text}</label>
    </div>
  );
};

export default AuthInput;
