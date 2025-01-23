import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import "../Estilos/EstiloRadioButton.css";
import { useContext } from "react";
import { VentasContext } from "../Context/VentasContext";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme }) => ({
  variants: [
    {
      props: { checked: true },
      style: {
        ".MuiFormControlLabel-label": {
          color: theme.palette.primary.main,
        },
      },
    },
  ],
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default function RadioButton() {
  const { setEstadoVenta } = useContext(VentasContext);
  const handleChange = (event) => {
    setEstadoVenta(event.target.value);
  };
  return (
    <RadioGroup
      name="use-radio-group"
      defaultValue="seniado"
      onChange={handleChange}
      sx={{ display: "flow" }}
    >
      <MyFormControlLabel
        value="seniado"
        label="Pago seña(30%)"
        control={<Radio />}
      />
      <MyFormControlLabel
        value="completado"
        label="Pago completo"
        control={<Radio />}
      />
    </RadioGroup>
  );
}
