import './AuthInput.css';

const AuthInput = (props) => {
  return (
    <div className="authInput">
      <input type={props.type} id={props.id} className="form_input" autoComplete="off" placeholder=" " onChange={props.onChange} value={props.value}/>
      <label htmlFor={props.htmlFor} className="form_label">{props.text}</label>
    </div>
  );
};

export default AuthInput;
