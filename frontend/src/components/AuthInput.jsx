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
             value={props.value ?? ""}
             required
             maxLength={props.maxlength}
      />
      <label htmlFor={props.htmlFor} className="form_label">{props.text}</label>
    </div>
  );
};

export default AuthInput;
