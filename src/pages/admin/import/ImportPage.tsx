import { useRef, useState } from "react";
import { Typography, Button, Stack, Input, Box, Snackbar, Select, Option } from "@mui/joy";
import { importCsv } from "../../../api/admin/import.api";
import { useQuery } from "@tanstack/react-query";
import { getMagasins } from "../../../api/magasins.api";

const ImportPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [importLoading, setImportLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<false | "danger" | "success">(false);
    const [magasinId, setMagasinId] = useState<number | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const { data: magasins } = useQuery({
        queryKey: ["magasins"],
        queryFn: getMagasins
    })

    const magasinsOptions = magasins?.map((magasin) => ({
        label: magasin.nom,
        value: magasin.idMagasin,
    }));
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSendFile = async () => {
        if (selectedFile && magasinId) {
            {
                try {
                    setImportLoading(true);
                    await importCsv(selectedFile, magasinId)
                    setOpen("success");
                } catch (error) {
                    setOpen("danger");
                }
                finally {
                    setImportLoading(false);
                }
            }
        }
    }

    return (
        <Stack spacing={2}>
            <Typography level="h2">Importer un fichier CSV</Typography>

            <Box sx={{
                position: "relative", cursor: "pointer",
            }}>
                <Button fullWidth>
                    Importer un fichier CSV
                </Button>
                <Input
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        zIndex: 1,
                        p: 0,
                        "& .MuiInput-input": {

                            cursor: "pointer",
                        }
                    }}
                    ref={inputFileRef}
                    onChange={handleFileChange}
                    type="file"
                />
            </Box>
            <Select
                placeholder="Sélectionner un magasin"
                defaultValue={null}
                value={magasinId}
                onChange={(_e, newValue) => {
                    setMagasinId(newValue);
                }}
            >
                {magasinsOptions?.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label} - {option.value}
                    </Option>
                ))}
            </Select>
            {selectedFile && (
                <Typography level="body-md" color="success">
                    Fichier sélectionné : {selectedFile.name}
                </Typography>
            )}

            <Button
                disabled={!selectedFile || !magasinId}
                onClick={handleSendFile}
                loading={importLoading}
            >
                Envoyer le fichier
            </Button>
            <Snackbar
                autoHideDuration={4000}
                open={open !== false}
                variant={"soft"}
                color={open === "danger" ? "danger" : "success"}
                onClose={() =>
                    setOpen(false)
                }
            >
                {open === "danger" ? "Erreur lors de l'import" : "Import effectué avec succès"}
            </Snackbar>
        </Stack >
    );
};

export default ImportPage;
