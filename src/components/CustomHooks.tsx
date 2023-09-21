import { useState, FC, Fragment, useRef } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    },
    () => setValue(initialValue),
  ];
};

const CustomHooks = () => {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // alert(`${titleProps.value} ${colorProps}`);
  };
  return (
    <Fragment>
      <div>Custom Hooks</div>
      <div>
        <form onSubmit={submit}>
          <input type="text" {...titleProps} placeholder="color title" />
          <input {...colorProps} type="color" />
          <button>Add</button>
        </form>
      </div>
    </Fragment>
  );
};

export default CustomHooks;
