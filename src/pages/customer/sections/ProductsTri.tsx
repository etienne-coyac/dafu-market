import { Select, Option } from "@mui/joy";

function ProductsTri({
    value,
    onChange,
    idMagasin,
}: {
    readonly value: string;
    readonly onChange: (v: string) => void;
    readonly idMagasin?: string | number;
}) {
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
            <Option value="disponibilite" disabled={!idMagasin}>Disponibilité</Option>
        </Select>
    );
}


export default ProductsTri;