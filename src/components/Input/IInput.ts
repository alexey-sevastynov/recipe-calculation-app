import { UseFormRegisterReturn } from "react-hook-form";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  iconName?: string;
  textError?: string;
  isEmptyField: boolean;
  clearInput: () => void;
  error: any;
  registerResult: UseFormRegisterReturn;
}
