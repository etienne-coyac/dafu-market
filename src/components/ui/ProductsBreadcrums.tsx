import { KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/joy";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router";

const ProductsBreadcrumbs = () => {
  const { section, category } = useParams();
  return (
    <Breadcrumbs separator={<KeyboardArrowRight />}>
      <Link component={RouterLink} level="body-xs" color="neutral" to="/">
        Accueil
      </Link>
      <Link
        component={RouterLink}
        level="body-xs"
        color="neutral"
        to={`/produits/${section}`}
      >
        {section}
      </Link>
      {category && (
        <Link component={RouterLink} level="body-xs" color="neutral" to="">
          {category}
        </Link>
      )}
    </Breadcrumbs>
  );
};

export default ProductsBreadcrumbs;
