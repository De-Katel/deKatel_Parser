import css from './Input.module.css';


const Input = (props) => {
   const { title, id, type, name, value, minLength, required, placeholder, onChange, disabled } = props;
   return (
      <div className={css.wrapper}>
         <label className={css.label} htmlFor={id}>{title}</label>
         <input className={css.input}
            id={id}
            type={type}
            name={name}
            value={value}
            minLength = {minLength}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
         >{value.name}</input>
      </div>
   )
}
export default Input;