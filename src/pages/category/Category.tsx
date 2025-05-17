import { KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/joy";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router";

const Category = () => {
  const { section, category } = useParams();
  return (
    <Breadcrumbs separator={<KeyboardArrowRight />}>
      <Link component={RouterLink} color="neutral" to="/">
        Accueil
      </Link>
      <Link component={RouterLink} color="neutral" to={`/produits/${section}`}>
        {section}
      </Link>
      {category && (
        <Link component={RouterLink} color="neutral" to="">
          {category}
        </Link>
      )}
    </Breadcrumbs>
  );
};

export default Category;
