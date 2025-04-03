export const CLASSNAME = {
    CONTAINER :"textField",
    LABEL: "textField_label",
    INPUT: "textField_input",
    ERROR: "textField_error",
    INPUT_ERROR: "textField_inputError",

}
export interface TextFieldProps {
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    htmlFor: string;
    label?: string;
    value?: string|number|boolean;
    type?: string;
    err?:string|object|boolean|undefined;
    tch?:boolean;
  }