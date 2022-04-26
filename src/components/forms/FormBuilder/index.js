import { h, render, Component } from "preact";
import "./style.css";
import Text from "../../text";
import Button from "../../button";
import Divider from "../../divider";
import ColorPicker from "../colorpicker";
import Radio from "../radio";
import Input from "../input";

const fieldComponents = {
  Text: function TextWrapper(props) {
    return (
      <div className="formbuilder__margin-bottom">
        <Text {...props} />
      </div>
    );
  },
  Button,
  Divider,
  ColorPicker: function ColorPickerWrapper({ fieldTitle, ...props }) {
    return (
      <label for={props.id} className="formbuilder__sidebyside">
        <div className="formbuilder__margin-right formbuilder__center">
          <Text>{fieldTitle}</Text>
        </div>
        <ColorPicker {...props} />
      </label>
    );
  },
  Radio: function RadioWrapper({ fieldTitle, ...props }) {
    return (
      <fieldset className="formbuilder__reset">
        <legend className="formbuilder__reset formbuilder__margin-bottom formbuilder__center">
          <Text>{fieldTitle}</Text>
        </legend>
        <Radio {...props} />
      </fieldset>
    );
  },
  Input: function InputWrapper({ fieldTitle, ...props }) {
    return (
      <label for={props.id} className="formbuilder__sidebyside">
        <div className="formbuilder__margin-right formbuilder__center">
          <Text>{fieldTitle}</Text>
        </div>
        <div className="formbuilder__margin-right formbuilder__relative">
          <Input {...props} width="100%" />
        </div>
      </label>
    );
  },
};

function FieldComponent({ component, ...props }) {
  const Component = fieldComponents[component];
  return (
    <div key={props.id} className="formbuilder__margin-bottom">
      <Component {...props} />
    </div>
  );
}

function FormBuilder({ form = { fields: [] }, wmProps = {} }) {
  const onClose = wmProps.onClose;
  const { fields, ...formProps } = form;
  return (
    <form {...formProps}>
      {form.fields.map((row) => {
        if (Array.isArray(row)) {
          return (
            <div className="formbuilder__sidebyside">
              {row.map(({ fieldStyle, ...field }) => (
                <div classname="formbuilder__center" style={fieldStyle}>
                  <FieldComponent {...field} />
                </div>
              ))}
            </div>
          );
        } else {
          return <FieldComponent {...row} />;
        }
      })}
    </form>
  );
}

export default FormBuilder;
