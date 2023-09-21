import React, { useRef, Fragment } from "react";

// we are using ref to get the value of the input field and to clear the input field after submit is clicked (line 68 and 69)

const Color = () => {
  const txtTitle = useRef<HTMLInputElement>(null);
  const hexColor = useRef<HTMLInputElement>(null);

  console.log(txtTitle);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = txtTitle.current?.value;
    const color = hexColor.current?.value;
    alert(`${title} ${color}`);
    if (txtTitle.current) txtTitle.current.value = "";
    if (hexColor.current) hexColor.current.value = "";
  };
  return (
    <Fragment>
      <div>
        <h1>Color</h1>
      </div>
      <div>
        <form onSubmit={submit}>
          <input ref={txtTitle} type="text" placeholder="color title" />
          <input ref={hexColor} type="color" />
          <button>Add</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Color;
