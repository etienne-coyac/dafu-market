import { Select, Option } from "@mui/joy";
import useClientData from "../../../context/client.context";

type ProductTriProps = {
  value: string;
  onChange: (v: string) => void;
};

function ProductsTri(props: ProductTriProps) {
  const { value, onChange } = props;
  const {idMagasin} = useClientData();
  return (
    <Select
      value={value}
      size="sm"
      variant="outlined"
      onChange={(_, newValue) => {
        if (newValue) onChange(newValue);
      }}
      sx={{ minWidth: 160 }}
    >
      <Option value="prix-asc">Prix ↑</Option>
      <Option value="prix-desc">Prix ↓</Option>
      <Option value="disponibilite" disabled={!idMagasin}>
        Disponibilité
      </Option>
    </Select>
  );
}

export default ProductsTri;
