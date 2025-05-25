import { Select, Option } from "@mui/joy";

function ProductsTri({ value, onChange }: { readonly value: string; readonly onChange: (v: string) => void }) {
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
            <Option value="pertinence">Pertinence</Option>
            <Option value="prix-asc">Prix ↑</Option>
            <Option value="prix-desc">Prix ↓</Option>
            <Option value="disponibilite">Disponibilité</Option>
        </Select>
    );
}


export default ProductsTri;