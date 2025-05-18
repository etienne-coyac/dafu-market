import { Typography } from "@mui/joy";
import { useParams } from "react-router";

const ProductDetail = () => {
  const { productId } = useParams();
  return <Typography>{productId}</Typography>;
};

export default ProductDetail;
