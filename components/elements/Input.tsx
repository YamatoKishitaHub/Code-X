type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, placeholder, value, error, errorMessage, onChange }: InputProps) => {
  return (
    <div className="">
      <input required type={type} placeholder={placeholder} value={value} onChange={onChange} className={`w-full p-4 rounded-lg text-xl bg-black border ${!error ? "border-gray-600" : "border-red-500"}`} />
      {error && (
        <div className="pl-4 text-left text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;
