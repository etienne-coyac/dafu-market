import { useRef, useState } from "react";
import { Typography, Button, Stack, Input, Box } from "@mui/joy";

const ImportPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Tu peux ici lire le fichier si besoin
            // Exemple : const reader = new FileReader();
            // reader.onload = () => { console.log(reader.result); };
            // reader.readAsText(file);
        }
    };

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

            {selectedFile && (
                <Typography level="body-md" color="success">
                    Fichier sélectionné : {selectedFile.name}
                </Typography>
            )}

            <Button
                disabled={!selectedFile}
                onClick={() => {
                    // ⚠️ Tu peux envoyer le fichier ici à ton backend via FormData par exemple
                    alert(`Fichier "${selectedFile?.name}" prêt à être envoyé.`);
                }}
            >
                Envoyer le fichier
            </Button>
        </Stack>
    );
};

export default ImportPage;
