import { h, render, Component } from "preact";
import Window from "../../components/Window";
import FormBuilder from "../../components/Forms/FormBuilder";

function FormBuilderWindow({
  title = "FormBuilderWindow",
  form,
  wmProps = {},
}) {
  const onClose = wmProps.onClose;
  return (
    <Window
      title={title}
      width={280}
      minWidth={230}
      height="auto"
      isResizeable={true}
      className="form-builder-window"
      {...wmProps}
    >
      <div style={{ padding: "0 7px" }}>
        <FormBuilder form={form} />
      </div>
    </Window>
  );
}

export default FormBuilderWindow;
