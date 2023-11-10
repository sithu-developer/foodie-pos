import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface Props {
    onFileSelected : (acceptedFiles : File[]) => void;
}

const FileDropZone = ( {onFileSelected} : Props) => {

    const onDrop = (acceptedFiles : File[]) => {
        onFileSelected(acceptedFiles);
    }

    const {getInputProps , getRootProps , isDragActive } = useDropzone({
        onDrop,
    })


    return (
        <Box {...getRootProps()}  sx={{borderRadius : 4, border : "3px dotted gray" , textAlign : "center" , p : 1 , cursor : "pointer"}}>
            <input {...getInputProps()} />
            {isDragActive ? (<p>Drop the files here...</p>) 
            : (<p>Drag drop some files here , or click to select files</p>)}
        </Box>
    )
}
export default FileDropZone;